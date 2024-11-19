
import {MessagesSquare} from "lucide-react";


export default function EmptyChatPlaceholder(){

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center gap-4 p-8 text-muted-foreground">
            <div className="rounded-full bg-muted/100 dark:bg-muted/50 p-6">
                <MessagesSquare className="h-10 w-10 text-gray-500" />
            </div>

            <div className="flex flex-col items-center gap-2 max-w-sm text-center">
                <h3 className="text-xl font-bold text-foreground">
                    No Messages Yet
                </h3>
                <p className="text-sm">
                    {`Be sure to say "Hi"`}
                </p>
            </div>
        </div>
    )

}