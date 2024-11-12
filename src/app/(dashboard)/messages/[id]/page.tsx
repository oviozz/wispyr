
import ChatHeader from "@/app/(dashboard)/messages/[id]/_components/chat-header";
import {Button} from "@/components/ui/button";
import ChatContent from "@/app/(dashboard)/messages/[id]/_components/chat-content";
import {Input} from "@/components/ui/input";
import {EmojiPickerDialog} from "@/components/emoji-picker-dialog";
import { IoSend } from "react-icons/io5";

export default function MessagesPage() {
    return (
        <div className="flex flex-col h-full overflow-hidden">

            <ChatHeader />

            {/* Messages area - scrollable */}
            <ChatContent />

            {/* ChatMessage input - fixed at bottom */}
            <div className="border-t p-4 shrink-0">
                <div className="flex items-center gap-2">
                    <EmojiPickerDialog />

                    <Input
                        type="text"
                        className="flex-1 rounded-lg bg-background px-3 py-2 text-sm"
                        placeholder="Type a message..."
                    />
                    <Button variant={"main"} className={"font-semibold"}>
                        Send
                        <IoSend className={"w-4 h-4 "}/>
                    </Button>
                </div>
            </div>
        </div>
    );
}