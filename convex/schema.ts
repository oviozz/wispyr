
import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

const PublicKeySchema = v.object({
    e: v.string(),
    n: v.string()
});

const PrivateKeySchema = v.object({
    d: v.string(),
    n: v.string()
});
export default defineSchema({
    users: defineTable({
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
        password: v.string(),
        avatar: v.optional(v.string()),
        isOnline: v.optional(v.boolean()),
    })
        .index("by_email", ["email"])
        .index("by_email_and_password", ["email", "password"]),

    chat_rooms: defineTable({
        room_name: v.string(),
        admin_id: v.id("users"),
        max_participants: v.optional(v.number()),
        lastMessageId: v.optional(v.id("messages")),
        retention: v.optional(v.boolean()),
        private_key: PrivateKeySchema,
        public_key: PublicKeySchema,
    }),

    participants: defineTable({
        chat_room_id: v.id("chat_rooms"),
        user_id: v.id("users"),
        role: v.union(v.literal("admin"), v.literal("member"))
    })
        .index("by_chatroom", ["chat_room_id"])
        .index("by_user", ["user_id"]),

    friends: defineTable({
        user_id: v.id("users"),
        friend_id: v.id("users"),
    })
        .index("by_user", ["user_id"]),

    friend_invites: defineTable({
        from_user_id: v.id("users"),
        to_user_id: v.id("users"),
        status: v.union(v.literal("pending"), v.literal("accepted"), v.literal("rejected"))
    })
        .index("by_users", ["from_user_id"]),

    messages: defineTable({
        sender_id: v.id("users"),
        chat_room_id: v.id("chat_rooms"),
        content: v.string(),
        reply_to_id: v.optional(v.id("messages")),
        reactions: v.optional(v.array(v.string())),
    })
        .index("by_chat_room", ["chat_room_id"]),

    notifications: defineTable({

    }),

})
