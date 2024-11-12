
import { MessageCircleMore } from "lucide-react";

export default function MessageContentPage(){

    return (
        <div className="h-full w-full flex flex-col items-center justify-center gap-4 p-8 text-muted-foreground">
            <div className="rounded-full bg-muted/100 dark:bg-muted/50 p-6">
                <MessageCircleMore className="h-12 w-12 text-gray-500" />
            </div>

            <div className="flex flex-col items-center gap-2 max-w-sm text-center">
                <h3 className="text-2xl font-bold text-foreground">
                    Pick a message
                </h3>
                <p className="text-sm">
                    Select a conversation from the sidebar to start chatting
                </p>
            </div>
        </div>
    )

}