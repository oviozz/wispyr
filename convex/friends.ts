
import {mutation, query} from "./_generated/server";
import {v} from "convex/values";
import {getUserById} from "./users";

export const getAllFriends = query({
    args: {
        userId: v.optional(v.id("users"))
    },
    handler: async (ctx, args) => {
        if (!args.userId) return null;

        const friends = await ctx.db
            .query("friends")
            .withIndex("by_user")
            .filter((q) => q.eq(q.field("user_id"), args.userId))
            .order("desc")
            .collect()

        return await Promise.all(
            friends?.map(async (friend) => {
                return {
                    friendId: friend._id,
                    friend: await getUserById(ctx, { id: friend.friend_id })
                }
            })
        );
    }

})


export const removeFriend = mutation({
    args: {
        friendId: v.id("friends")
    },
    handler: async (ctx, args) => {
        try {
            // First get the friendship record we're deleting to get both user IDs
            const friendshipRecord = await ctx.db.get(args.friendId);

            if (!friendshipRecord) {
                return {
                    success: false,
                    message: "Friendship record not found"
                };
            }

            // Find and delete the reciprocal friendship record
            const reciprocalFriendship = await ctx.db
                .query("friends")
                .filter(q =>
                    q.and(
                        q.eq(q.field("user_id"), friendshipRecord.friend_id),
                        q.eq(q.field("friend_id"), friendshipRecord.user_id)
                    )
                )
                .first();

            // Delete both friendship records
            await ctx.db.delete(args.friendId);
            if (reciprocalFriendship) {
                await ctx.db.delete(reciprocalFriendship._id);
            }

            return {
                success: true,
                message: "Friend removed successfully"
            };
        } catch (error) {
            console.log(error, "Wasn't able to remove friend");
            return {
                success: false,
                message: "Couldn't remove this friend"
            };
        }
    }
});