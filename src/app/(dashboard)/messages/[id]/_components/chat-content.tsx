
import { useEffect, useRef } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import ChatMessage from "@/app/(dashboard)/messages/[id]/_components/chat-message";
import EmptyChatPlaceholder from "@/app/(dashboard)/messages/[id]/_components/empty-chat-placeholder";
import { LoadingSpinner } from "@/components/loading-spinner";

const MESSAGES_PER_PAGE = 25;

interface ChatContentProps {
    roomId: Id<"chat_rooms">;
    userId: Id<"users"> | undefined;
}

export default function ChatContent({ roomId, userId }: ChatContentProps) {

    const scrollRef = useRef<HTMLDivElement>(null);
    const isFirstLoad = useRef(true);
    const previousMessagesLength = useRef(0);

    const messages = useQuery(api.messages.getAllMessagesById, {
        chat_room_id: roomId,
        paginationOpts: {
            limit: MESSAGES_PER_PAGE,
            cursor: undefined,
        },
    });

    // Auto-scroll to bottom on first load and new messages
    useEffect(() => {
        if (!messages) return;

        const shouldScrollToBottom =
            isFirstLoad.current ||
            (previousMessagesLength.current < messages.length &&
                scrollRef.current &&
                scrollRef.current.scrollHeight - scrollRef.current.scrollTop <= scrollRef.current.clientHeight + 100);

        if (shouldScrollToBottom && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }

        if (isFirstLoad.current) {
            isFirstLoad.current = false;
        }

        previousMessagesLength.current = messages.length;
    }, [messages]);


    if (messages === undefined) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
                <LoadingSpinner className="text-blue-500 w-10 h-10" />
                <p className="text-lg font-medium animate-pulse">Loading messages...</p>
            </div>
        );
    }

    if (!messages || messages.length === 0) {
        return <EmptyChatPlaceholder />;
    }

    return (
        <div className={"h-screen w-full flex flex-col overflow-y-auto items-center justify-center"}>
            <div
                ref={scrollRef}
                className="flex-1 w-full overflow-y-auto p-4 scroll-smooth"
            >
                <div className="space-y-7">
                    {messages?.map((message) => {
                        const isCurrentUser = userId === message.sender_id;
                        return (
                            <ChatMessage
                                key={message._id}
                                avatarImage={message.sender?.avatar || ""}
                                senderName={`${message.sender?.firstName} ${message.sender?.lastName}`}
                                timestamp={new Date(message._creationTime).toLocaleString()}
                                content={message.content}
                                currentUser={isCurrentUser}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}