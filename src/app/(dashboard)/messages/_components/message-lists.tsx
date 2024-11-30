
"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";
import {MessageSquareLock} from "lucide-react";

interface MessageListProps {
    closeSidebar?: () => void
}

export default function MessageLists({closeSidebar}: MessageListProps) {


    const pathname = usePathname();
    const { user } = useAuth();
    const getAllRooms = useQuery(api.chat_rooms.getUserChatRooms, {
        userId: user?._id
    });

    if (getAllRooms === undefined) {
        return (
            <div className="space-y-2">
                {Array.from({ length: 7 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center space-x-4 px-3 py-2"
                    >
                        <div className="flex items-center gap-3 w-full">
                            <Avatar>
                                <AvatarFallback>
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    const messageId = pathname.split('/')[2];

    return (
        <div className="space-y-2">
            {getAllRooms && getAllRooms?.length > 0 ? (
                getAllRooms.map((room) => (
                    <Link onClick={closeSidebar} key={room?._id} href={`/messages/${room?._id}`}>
                        <div
                            className={cn(
                                "flex justify-between items-center space-x-4 px-3 py-2 hover:cursor-pointer",
                                messageId === room?._id
                                    ? "bg-gray-100/80 dark:bg-gray-100/20"
                                    : "hover:bg-gray-100/50 dark:hover:bg-gray-100/5"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarFallback>
                                        {room?.room_name?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold">
                                        {room?.room_name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground truncate">
                                        {room?.lastMessage?.content && room.lastMessage.content.length > 25
                                            ? room.lastMessage.content.slice(0, 25) + "..."
                                            : room?.lastMessage?.content || "No messages yet"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <div className={"flex flex-col items-center mt-20 px-3 text-neutral-400 animate-pulse"}>
                    <MessageSquareLock className={"h-8 w-8"} />
                    <span className={"font-semibold"}>No rooms has been made</span>
                </div>
            )}
        </div>
    );
}