
import {internalMutation, mutation, query} from "./_generated/server";
import {v} from "convex/values";
import {getUserById} from "./users";
import {decrypt_message, encrypt_message} from "../src/rsa/rsa-encryption";
import {PrivateKey, PublicKey} from "../src/lib/types/messages";
import {internal} from "./_generated/api";

export const sendMessages = mutation({
    args: {
        sender_id: v.id("users"),
        chat_room_id: v.id("chat_rooms"),
        content: v.string(),
        reply_to_id: v.optional(v.id("messages")),
    },
    handler: async (ctx, args) => {
        try {
            const { sender_id, chat_room_id, content, reply_to_id } = args;

            const chatRoomDetail  = await ctx.db.get(args.chat_room_id)

            if (!chatRoomDetail) {
                return {
                    success: false,
                    message: "Invalid Chat Room, Missing Keys"
                }
            }

            const chatroom_publicKey = chatRoomDetail?.public_key;

            const publicKeyFromConvex: PublicKey = {
                e: BigInt(chatroom_publicKey.e),
                n: BigInt(chatroom_publicKey.n)
            };

            const encryptedMessage = encrypt_message(content, publicKeyFromConvex);

            const messageId = await ctx.db.insert("messages", {
                sender_id: sender_id,
                chat_room_id: chat_room_id,
                content: encryptedMessage,
                reply_to_id: reply_to_id
            })

            await ctx.db.patch(chat_room_id, {
                lastMessageId: messageId
            })

            if (chatRoomDetail.retention){
                await ctx.scheduler.runAfter(60000, internal.messages.retentionMessage, {
                    messageId: messageId,
                });
            }

            return {
                success: true,
                message: "Message sent successfully"
            }
        } catch (error) {
            console.log(error, "Message sent failed");
            return {
                success: false,
                message: "Message sent failed"
            }
        }
    }
})


export const getAllMessagesById = query({
    args: {
        chat_room_id: v.id("chat_rooms"),
        paginationOpts: v.optional(
            v.object({
                limit: v.number(),
                cursor: v.optional(v.string()),
            })
        ),
    },
    handler: async (ctx, args) => {

        const chatRoomDetail= await ctx.db.get(args.chat_room_id)

        if (!chatRoomDetail) {
            return null
        }

        const messages = await ctx.db
            .query("messages")
            .withIndex("by_chat_room", q =>
                q.eq("chat_room_id", args.chat_room_id)
            )
            .order("asc")
            .take(args.paginationOpts?.limit ?? 50)

        const chatroom_privateKey = chatRoomDetail?.private_key;

        const privateKeyFromConvex: PrivateKey = {
            d: BigInt(chatroom_privateKey.d),
            n: BigInt(chatroom_privateKey.n)
        };

        const enrichedMessages = await Promise.all(
            messages.map(async (message) => {
                const sender = await getUserById(ctx, {
                    id: message.sender_id
                });
                return {
                    ...message,
                    sender,
                    content: decrypt_message(message.content, privateKeyFromConvex),
                    replyTo: message.reply_to_id
                        ? await ctx.db.get(message.reply_to_id)
                        : null,
                };
            })
        );

        return enrichedMessages;

    }
})

export const retentionMessage = internalMutation({
    args: {
        messageId: v.id("messages"),
    },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.messageId);
    },
});