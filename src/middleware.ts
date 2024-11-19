
import { NextRequest, NextResponse } from 'next/server'
import {verifySession} from "@/app/(auth)/_actions/session";

const protectedRoutes = ['/messages', "/friends", "/requests"]
const publicRoutes = ['/login', '/signup', '/']

export default async function middleware(req: NextRequest) {

    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    const session = await verifySession();

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    if (
        isPublicRoute &&
        session?.userId &&
        !req.nextUrl.pathname.startsWith(protectedRoutes[0])
    ) {
        return NextResponse.redirect(new URL(protectedRoutes[0], req.nextUrl))
    }

    return NextResponse.next()
}
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}