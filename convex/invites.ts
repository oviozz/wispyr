
import {mutation, query} from "./_generated/server";
import {v} from "convex/values";
import {getUserById} from "./users";

export const requestFriend = mutation({
    args: {
        userId: v.optional(v.id("users")),
        toUserId: v.id("users")
    },
    handler: async (ctx, args) => {

        if (!args.userId){
            return {
                success: false,
                message: "Failed to add Friend"
            }
        }
        try {
            await ctx.db.insert("friend_invites", {
                from_user_id: args.userId,
                to_user_id: args.toUserId,
                status: "pending"
            })
            return {
                success: true,
                message: "Friend request sent"
            }
        } catch (error) {
            console.log(error, "Error has been made when adding friend")
            return {
                success: false,
                message: "Friend request failed"
            }
        }
    }
})
export const getAllInvites = query({
    args: {
        userId: v.optional(v.id("users"))
    },
    handler: async (ctx, args) => {

        if (!args.userId) return;

        const invites = await ctx.db
            .query("friend_invites")
            .withIndex("by_users")
            .filter((q) => q.eq(q.field("from_user_id"), args.userId))
            .collect();

        return invites.map((invite) => {
            return {
                invite_id: invite._id,
                invite_user: invite.to_user_id
            }
        }) || [];
    }
})

export const getAllNotifications = query({
    args: {
        userId: v.optional(v.id("users"))
    },
    handler: async (ctx, args) => {

        if (!args.userId) return null;

        const notification_invites = await ctx.db
            .query("friend_invites")
            .withIndex("by_users")
            .filter((q) => q.eq(q.field("to_user_id"), args.userId))
            .order("desc")
            .collect()

        if (!notification_invites) return null;

        return await Promise.all(
            notification_invites?.map(async (notification) => {
                const fromUser = await getUserById(ctx, { id: notification.from_user_id });
                if (!fromUser) return null;

                return {
                    invite_id: notification._id,
                    from_user: fromUser
                };
            })
        );
    }
})



export const removeFriendRequest = mutation({
    args: {
        friendInviteId: v.optional(v.id("friend_invites"))
    },
    handler: async (ctx, args) => {
        const { friendInviteId } = args;

        if (!friendInviteId){
            return {
                success: false,
                message: "Friend is not valid"
            }
        }

        try {
            await ctx.db.delete(friendInviteId);

            return {
                success: true,
                message: "Friend request deleted"
            }
        } catch (error) {
            console.log(error, "Remove friend request error")
            return {
                success: false,
                message: "Something went wrong"
            }
        }
    }
})

export const acceptFriendRequest = mutation({
    args: { inviteId: v.optional(v.id("friend_invites")) },
    handler: async (ctx, args) => {
        try {

            if (!args.inviteId){
                return {
                    success: false,
                    message: "Couldn't find friend request"
                }
            }

            const friend_invite = await ctx.db.get(args.inviteId);

            if (!friend_invite) {
                return {
                    success: false,
                    message: "Couldn't find friend request"
                };
            }

            // Create both friendship records
            await Promise.all([
                ctx.db.insert("friends", {
                    user_id: friend_invite.from_user_id,
                    friend_id: friend_invite.to_user_id
                }),
                ctx.db.insert("friends", {
                    user_id: friend_invite.to_user_id,
                    friend_id: friend_invite.from_user_id
                })
            ]);

            await removeFriendRequest(ctx, {
                friendInviteId: args.inviteId
            });

            return {
                success: true,
                message: "Friend request accepted successfully"
            };
        } catch (error) {
            console.log(error, "Couldn't accept friend")
            return {
                success: false,
                message: "Failed to accept friend request"
            };
        }
    }
});