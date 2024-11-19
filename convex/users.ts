

import {mutation, query} from "./_generated/server";
import {v} from "convex/values";

export const createUser = mutation({
    args: {
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
        hashedPassword: v.string(),
    },
    handler: async (ctx, args) => {

        const { firstName, lastName, email, hashedPassword } = args
        const email_owned = await findUserByEmail(ctx,{
            email
        });

        if (email_owned?._id){
            return {
                success: false,
                message: "Email is already taken."
            }
        }

        const new_user = await ctx.db
            .insert("users", {
                firstName,
                lastName,
                email,
                password: hashedPassword
            })

        return {
            success: true,
            message: "User has been created.",
            userId: new_user
        }
    }
})

export const findUserByEmail = query({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        const users = await ctx.db
            .query("users")
            .withIndex("by_email", q =>
                q.eq("email", args.email)
            )
            .first()

        return users;
    }
})

export const getUserById = query({
    args: { id: v.optional(v.id("users")) },
    handler: async (ctx,args) => {

        if (!args.id) return null;

        const identity = await ctx.db.get(args.id);
        if (!identity) return null;

        return {
            ...identity,
            avatar: identity.avatar ? await ctx.storage.getUrl(identity.avatar) : null
        };
    },
});

export const updateUserAvatar = mutation({
    args: {
        imageId: v.id("_storage"),
        userId: v.id("users")
    },
    handler: async (ctx, args) => {
        try{

            const { imageId, userId } = args;
            await ctx.db.patch(userId, {
                avatar: imageId
            })
            return {
                success: true,
                imageUrl: await ctx.storage.getUrl(imageId)
            }
        } catch (error){
            console.log(error, "Error happened when updating profile pic")
            return { success: false }
        }
    }
})

export const getAllUsers = query({
    args: { userId: v.optional(v.id("users")) },
    handler: async (ctx, args) => {
        const users = await ctx.db
            .query("users")
            .withIndex("by_creation_time")
            .filter((q) => q.neq(q.field("_id"), args.userId))
            .order("desc")
            .collect()

        return Promise.all(
            users.map(async (user) => {
                if (user.avatar) {
                    const avatarUrl = await ctx.storage.getUrl(user.avatar);
                    return {
                        ...user,
                        avatar: avatarUrl
                    };
                }
                return user;
            })
        );
    }
})


export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});