
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";


interface ChatMessageProps {
    avatarImage: string,
    senderName: string,
    timestamp: string,
    content: string,
    currentUser: boolean,
    className?: string
}

export default function ChatMessage({ avatarImage, senderName, timestamp, content, currentUser }: ChatMessageProps) {

    return (
        <div className={cn("flex items-start gap-3", currentUser ? "justify-end" : "justify-start" )}>
            { !currentUser && (
                <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                    <AvatarImage src={avatarImage} />
                </Avatar>
            )}
            <div className="flex flex-col gap-0.5 w-fit max-w-lg">
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold">{currentUser ? "You" : senderName}</span>
                    <span>•</span>
                    <span className="text-xs text-muted-foreground">{timestamp}</span>
                </div>
                <div className="border dark:border-gray-700 bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-200 rounded-lg p-3">
                    <p className="text-sm">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    )

}