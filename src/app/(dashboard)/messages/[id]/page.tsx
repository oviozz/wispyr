import ChatHeader from "@/app/(dashboard)/messages/[id]/_components/chat-header";

export default function MessagesPage() {
    return (
        <div className="flex flex-col h-full overflow-hidden">

            <ChatHeader />

            {/* Messages area - scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
                {/* Message items would go here */}
                <div className="space-y-4">
                    {/* Example message structure */}
                    <div className="flex items-start gap-2.5">
                        <div className="flex flex-col gap-1 w-full max-w-[320px]">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-semibold">John Doe</span>
                                <span className="text-xs text-muted-foreground">11:45 AM</span>
                            </div>
                            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3">
                                <p className="text-sm">Hey, how are you?</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Message input - fixed at bottom */}
            <div className="border-t p-4 shrink-0">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background"
                        placeholder="Type a message..."
                    />
                    <button className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}