
import {Id} from "../../../../convex/_generated/dataModel";
import {cookies} from "next/headers";
import {decrypt} from "@/app/(auth)/_actions/session";

export async function getUserId(): Promise<Id<"users"> | null> {
    try {
        const user_cookies = (await cookies()).get("session")?.value;
        const session = await decrypt(user_cookies);

        if (!session || !session.userId) {
            return null;
        }

        return session.userId as Id<"users">;
    } catch (error) {
        console.error("Error getting userId:", error);
        return null;
    }
}

export async function requireUserId(): Promise<Id<"users">> {
    const userId = await getUserId();

    if (!userId) {
        throw new Error("Unauthorized: No valid session found");
    }

    return userId;
}