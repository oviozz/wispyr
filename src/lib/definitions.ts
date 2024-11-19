
import { z } from "zod";
import {capitalizeFirst} from "@/lib/utils";
import {Id} from "../../convex/_generated/dataModel";


export const signup_schema= z.object({
    firstName: z
        .string()
        .min(2, 'First name must be at least 2 characters')
        .max(20, 'First name is too long')
        .regex(/^[A-Za-z\s-']+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes')
        .transform(capitalizeFirst),
    lastName: z
        .string()
        .min(2, 'Last name must be at least 2 characters')
        .max(20, 'Last name is too long')
        .regex(/^[A-Za-z\s-']+$/, 'Letters, spaces and hyphens only')
        .transform(capitalizeFirst),
    email: z
        .string()
        .email({ message: "Please enter a valid email" })
        .max(50, 'Email is too long')
        .trim(),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Include an uppercase letter')
        .regex(/[a-z]/, 'Include a lowercase letter')
        .regex(/[0-9]/, 'Include a number')
        .regex(/[^A-Za-z0-9]/, 'Include a special character'),
    confirmPassword: z.string(),
    avatar: z.string().optional()

}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
})


export const login_schema = z.object({
    email: z
        .string()
        .email({ message: "Please provide a valid email "})
        .trim(),
    password: z.
        string()
        .trim()
})

export const chat_room_schema = z.object({
    room_name: z.string()
        .min(2, 'Chat Room must be longer than 2 characters')
        .max(30, "Chat room name too long")
        .trim()
        .regex(/^[a-zA-Z0-9\s]+$/, "Room name can only contain letters, numbers, and spaces")
        .transform(capitalizeFirst),


    admin_id: z.custom<Id<"users">>(), // Convex ID type
    participants: z.array(z.custom<Id<"users">>()) // Convert to array of Convex ID type
        .min(1, "At least one participant required")
        .max(100, "Maximum 100 participants allowed"),
    max_participants: z
        .number()
        .min(2, "At least 2 participants required")
        .max(100, "Maximum 100 participants allowed")
        .optional(),

    retention: z.boolean().default(false).optional()
});


export const message_schema = z.object({
    sender_id: z.custom<Id<"users">>(),
    chat_room_id: z.custom<Id<"chat_rooms">>(),
    content: z
        .string()
        .min(2, "Message is too short. Please type more than 2 characters.")
        .max(200, "Message is too long. Keep it under 200 characters.")
        .trim(),
    reply_to_id: z.custom<Id<"messages">>().optional(),
    reactions: z.array(z.string()).optional(),
})


export type SignupFormData = z.infer<typeof signup_schema>;
export type LoginFormData = z.infer<typeof login_schema>;
export type ChatRoomSchema = z.infer<typeof chat_room_schema>;