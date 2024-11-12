
import ChatMessage from "@/app/(dashboard)/messages/[id]/_components/chat-message";
import {chat_messages} from "@/data/sample-chat-msg";


export default function ChatContent(){

    const userId = "1";

    return (
        <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-7">
                { chat_messages.map((message) => {
                    const { sendId, content, avatarImage, senderName, timestamp } = message;
                    const current_user = userId === sendId;

                    return (
                        <ChatMessage
                            key={sendId + content}
                            avatarImage={avatarImage}
                            senderName={senderName}
                            timestamp={timestamp}
                            content={content}
                            currentUser={current_user}
                        />
                    )
                })}
            </div>
        </div>
    )

}