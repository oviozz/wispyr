import {mutation, query} from "./_generated/server";
import {v} from "convex/values";
import {getUserById} from "./users";
import {decrypt_message, generateTwoKeyPair} from "../src/rsa/rsa-encryption";
import {PrivateKey} from "../src/lib/types/messages";

export const getUserChatRooms = query({
    args: {
        userId: v.optional(v.id("users"))
    },
    handler: async (ctx, args) => {
        if (!args.userId) return null;

        const rooms = await ctx.db
            .query("participants")
            .withIndex("by_user")
            .filter((q) =>
                q.eq(q.field("user_id"), args.userId)
            )
            .order("desc")
            .collect();

        if (!rooms) return null;

        return await Promise.all(
            rooms.map(async (room) => {
                const chat_room = await ctx.db.get(room.chat_room_id);
                if (!chat_room) return null;

                if (chat_room.lastMessageId) {
                    const lastMessage = await ctx.db.get(chat_room.lastMessageId);
                    const chatroom_privateKey = chat_room?.private_key;

                    const privateKeyFromConvex: PrivateKey = {
                        d: BigInt(chatroom_privateKey.d),
                        n: BigInt(chatroom_privateKey.n)
                    };

                    return {
                        ...chat_room,
                        lastMessage: {
                            content: decrypt_message(lastMessage?.content  || "", privateKeyFromConvex),
                            senderId: lastMessage?.sender_id,
                            timestamp: lastMessage?._creationTime,
                        }                    };
                }

                return {
                    ...chat_room,
                    lastMessage: null
                };
            })
        );
    }
})

export const getChatRoomById = query({
    args: {
        chatRoomId: v.string()
    },
    handler: async (ctx, args) => {
        try {

            const checkRoomValidID = ctx.db.normalizeId("chat_rooms", args.chatRoomId);

            if (!checkRoomValidID) {
                return {
                    success: false,
                    code: "ROOM_NOT_FOUND",
                    message: "Invalid Chat Room"
                }
            }

            const chatRoomDetail  = await ctx.db.get(checkRoomValidID)

            if (!chatRoomDetail) {
                return {
                    success: false,
                    code: "ROOM_NOT_FOUND",
                    message: 'Chat room not found'
                };
            }

            const participants = await ctx.db
                .query("participants")
                .withIndex("by_chatroom")
                .filter((q) =>
                    q.eq(q.field("chat_room_id"), checkRoomValidID)
                )
                .order("desc")
                .collect()

            if (!participants || participants.length === 0) {
                return {
                    success: true,
                    room_details: {
                        details: chatRoomDetail,
                        participants: []
                    }
                };
            }

            const roomUsers = await Promise.all(
                participants.map(async (participant) => {
                    try {

                        const user = await getUserById(ctx, { id: participant.user_id })

                        return {
                            user: user,
                            role: participant.role
                        };
                    } catch (error) {
                        console.error(`Error fetching user ${participant.user_id}:`, error);
                        return {
                            user: null,
                            role: participant.role
                        };
                    }
                })
            );

            return {
                success: true,
                room_details: {
                    details: chatRoomDetail,
                    participants: roomUsers
                }
            }
        } catch (error) {
            console.log(error, "Error getting the chat room data");
            return {
                success: false,
                message: "Something went wrong"
            }
        }
    }
})

export const createChatRoom = mutation({
    args: {
        room_name: v.string(),
        admin_id: v.id("users"),
        participants: v.array(v.id("users")),
        max_participants: v.optional(v.number()),
        retention: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const { room_name, admin_id, participants, max_participants, retention } = args;

        if (!participants || !admin_id){
            return {
                success: false,
                message: 'Please have at least one friend in chat room'
            }
        }

        try {
            const { publicKey, privateKey } = generateTwoKeyPair();

            const privateKeyForConvex = {
                d: privateKey.d.toString(),
                n: privateKey.n.toString()
            };
            const publicKeyForConvex = {
                e: publicKey.e.toString(),
                n: publicKey.n.toString()
            };

            const chatroomId = await ctx.db.insert("chat_rooms", {
                room_name,
                admin_id,
                max_participants,
                retention,
                private_key: privateKeyForConvex,
                public_key: publicKeyForConvex
            })

            await ctx.db.insert("participants", {
                chat_room_id: chatroomId,
                user_id: admin_id,
                role: "admin"
            });

            await Promise.all(
                participants.map(async (friendId) => {
                    await ctx.db.insert("participants", {
                        chat_room_id: chatroomId,
                        user_id: friendId,
                        role: "member"
                    })
                })
            )

            return {
                success: true,
                message: "Chat room created successfully",
            };
        } catch (error) {
            console.error("Error creating chat room:", error);
            return {
                success: false,
                message: "Failed to create chat room. Please try again.",
            };
        }
    }
})
