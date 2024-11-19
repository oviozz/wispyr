
"use client"
import ChatHeader from "@/app/(dashboard)/messages/[id]/_components/chat-header";
import ChatContent from "@/app/(dashboard)/messages/[id]/_components/chat-content";
import {Id} from "../../../../../../convex/_generated/dataModel";
import {useQuery as useConvexQuery} from "convex/react";
import {api} from "../../../../../../convex/_generated/api";
import {toast} from "sonner";
import {notFound} from "next/navigation";
import {LoadingSpinner} from "@/components/loading-spinner";
import SendMessage from "@/app/(dashboard)/messages/[id]/_components/send-message";
import {useAuth} from "@/hooks/useAuth";

interface MainMessageContentProps {
    roomId: Id<"chat_rooms">
}
export default function MainMessageContent({roomId}: MainMessageContentProps) {

    const { user } = useAuth();
    const getChatRoomDetails = useConvexQuery(api.chat_rooms.getChatRoomById, {
        chatRoomId: roomId
    })


    if (getChatRoomDetails === undefined){
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
                <LoadingSpinner className={"text-blue-500 w-10 h-10"} />
                <p className="text-lg font-medium animate-pulse">Loading messages...</p>
            </div>
        )
    }

    const { success, code, message, room_details } = getChatRoomDetails;

    if (!success && code){
        toast.error(message);
        notFound();
    }


    return (
        <div className="flex flex-col h-full overflow-hidden">

            <ChatHeader room_details={room_details!} />

            {/* Messages area - scrollable */}
            <ChatContent userId={user?._id} roomId={roomId} />

            {/* ChatMessage input - fixed at bottom */}
            <SendMessage userId={user?._id} roomId={roomId} />
        </div>
    );
}