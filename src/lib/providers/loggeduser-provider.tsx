
"use client"
import {ReactNode, useEffect} from "react"
import { useQuery } from "@tanstack/react-query"
import { useQuery as useConvexQuery } from "convex/react"
import { LoadingSpinner } from "@/components/loading-spinner"
import {Id} from "../../../convex/_generated/dataModel";
import {api} from "../../../convex/_generated/api";
import {cn} from "@/lib/utils";
import {gabarito} from "@/lib/fonts";
import {useAuth} from "@/hooks/useAuth";
import LogoutButton from "@/components/LogoutButton";

interface LoggedUserProps {
    children: ReactNode
    userId?: Id<"users"> | null
}

export default function LoggedUserProvider({userId, children,}: Readonly<LoggedUserProps>) {

    const { user, setUser, setLoading } = useAuth()

    const convexUserQuery = useConvexQuery(api.users.getUserById,
        { id: userId as Id<"users"> }
    );
    const { data: userData, isPending } = useQuery({
        queryKey: ["user-info", userId],
        queryFn: () => convexUserQuery,
        enabled: !!userId && !!convexUserQuery,
    })

    useEffect(() => {
        if (userData) {
            setUser(userData)
            setLoading(false)
        }
    }, [userData, setLoading, setUser]);


    if (!isPending && !user){
        return (
            <div className="flex flex-col items-center justify-center h-screen space-y-3 text-center p-4">
                <h2 className={cn("text-3xl font-bold text-foreground", gabarito.className)}>
                    {"We couldn't find your account"}
                </h2>
                <div className={"w-fit"}>
                    <LogoutButton />
                </div>
            </div>
        )
    }

    return (
        <>
            { isPending && !user ? (
                <div className="flex flex-col items-center justify-center h-screen space-y-1 text-center">
                    <LoadingSpinner size="lg" className="text-blue-500" />
                    <h2 className={cn("text-3xl font-bold text-foreground", gabarito.className)}>
                        Signing you in
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                        Please wait a moment while we process your request
                    </p>
                </div>
            ) : (
                children
            )}
        </>
    )
}