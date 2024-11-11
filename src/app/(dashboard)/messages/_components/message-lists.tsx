
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";

const messages = [
    { id: 1, name: "Alice Johnson", avatar: "/placeholder.svg?height=32&width=32", message: "Hey, how's it going?", time: "2m ago", unread: 2 },
    { id: 2, name: "Bob Smith", avatar: "/placeholder.svg?height=32&width=32", message: "Did you see the latest update?", time: "1h ago", unread: 0 },
    { id: 3, name: "Charlie Brown", avatar: "/placeholder.svg?height=32&width=32", message: "Let's meet up tomorrow!", time: "3h ago", unread: 1 },
    { id: 4, name: "Diana Prince", avatar: "/placeholder.svg?height=32&width=32", message: "Thanks for your help!", time: "1d ago", unread: 0 },
    { id: 5, name: "Ethan Hunt", avatar: "/placeholder.svg?height=32&width=32", message: "Mission accomplished!", time: "2d ago", unread: 0 },
    { id: 6, name: "Alice Johnson", avatar: "/placeholder.svg?height=32&width=32", message: "Hey, how's it going?", time: "2m ago", unread: 2 },
    { id: 7, name: "Bob Smith", avatar: "/placeholder.svg?height=32&width=32", message: "Did you see the latest update?", time: "1h ago", unread: 0 },
    { id: 8, name: "Charlie Brown", avatar: "/placeholder.svg?height=32&width=32", message: "Let's meet up tomorrow!", time: "3h ago", unread: 1 },
    { id: 9, name: "Diana Prince", avatar: "/placeholder.svg?height=32&width=32", message: "Thanks for your help!", time: "1d ago", unread: 0 },
    { id: 10, name: "Ethan Hunt", avatar: "/placeholder.svg?height=32&width=32", message: "Mission accomplished!", time: "2d ago", unread: 0 },
    { id: 11, name: "Alice Johnson", avatar: "/placeholder.svg?height=32&width=32", message: "Hey, how's it going?", time: "2m ago", unread: 2 },
    { id: 12, name: "Bob Smith", avatar: "/placeholder.svg?height=32&width=32", message: "Did you see the latest update?", time: "1h ago", unread: 0 },
    { id: 13, name: "Charlie Brown", avatar: "/placeholder.svg?height=32&width=32", message: "Let's meet up tomorrow!", time: "3h ago", unread: 1 },
    { id: 14, name: "Diana Prince", avatar: "/placeholder.svg?height=32&width=32", message: "Thanks for your help!", time: "1d ago", unread: 0 },
    { id: 15, name: "Ethan Hunt", avatar: "/placeholder.svg?height=32&width=32", message: "Mission accomplished!", time: "2d ago", unread: 0 },
]

export default function MessageLists(){

    return (
        <div className="space-y-2">
            {messages.map((message) => (
                <div key={message.id} className={cn("flex justify-between items-center space-x-4 hover:bg-gray-100/80 dark:hover:bg-gray-100/10 px-3 py-2")}>
                    <div className={"flex items-center gap-3"}>
                        <Avatar>
                            <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h3 className={cn("text-sm font-semibold",
                                message.unread > 0 && "text-blue-500"
                            )}>{message.name}</h3>
                            <p className="text-sm text-muted-foreground truncate">{message.message}</p>
                        </div>
                    </div>

                    {message.unread > 0 && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white font-medium text-xs text-primary-foreground">
                              {message.unread}
                            </span>
                    )}
                </div>
            ))}
        </div>
    )

}