
import {mutation, query} from "./_generated/server";
import {v} from "convex/values";
import {getUserById} from "./users";

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
            const messageId = await ctx.db.insert("messages", {
                sender_id: sender_id,
                chat_room_id: chat_room_id,
                content: content,
                reply_to_id: reply_to_id
            })

            await ctx.db.patch(chat_room_id, {
                lastMessageId: messageId
            })
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
        const messages = await ctx.db
            .query("messages")
            .withIndex("by_chat_room", q =>
                q.eq("chat_room_id", args.chat_room_id)
            )
            .order("asc")
            .take(args.paginationOpts?.limit ?? 50)

        const enrichedMessages = await Promise.all(
            messages.map(async (message) => {
                const sender = await getUserById(ctx, {
                    id: message.sender_id
                });
                return {
                    ...message,
                    sender,
                    replyTo: message.reply_to_id
                        ? await ctx.db.get(message.reply_to_id)
                        : null,
                };
            })
        );

        return enrichedMessages;

    }
})