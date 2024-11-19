
import "server-only";

import { SignJWT, jwtVerify } from 'jose'
import {cookies} from "next/headers";
import {Id} from "../../../../convex/_generated/dataModel";


const secretKey = process.env.AUTH_SECRET;
if (!secretKey){
    throw new Error('AUTH_SECRET is not set in environment variables');
}

const encodedKey = new TextEncoder().encode(secretKey);

const cookie = {
    name: "session",
    options: {
        httpOnly: true,
        secure: true,
        sameSite: "lax" as const,
        path: "/"
    },
    duration: 24 * 60 * 60 * 1000,
}

export interface SessionPayload {
    userId: string;
    expiresAt: Date;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    if (!session) return null;

    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.log(error,'Failed to verify session')
        return null;
    }
}

export async function createSession(userId: Id<"users"> | undefined){
    if (!userId) return null;

    const expiresAt = new Date(Date.now() + cookie.duration);
    const session = await encrypt({ userId, expiresAt});

    const cookieStore = await cookies();
    cookieStore.set(cookie.name, session, {...cookie.options});
}

export async function verifySession(){
    const user_cookies = (await cookies()).get(cookie.name)?.value;
    const session = await decrypt(user_cookies);
    return session
}

export async function deleteSession(){
    const cookieStore = await cookies()
    cookieStore.delete(cookie.name);
}

