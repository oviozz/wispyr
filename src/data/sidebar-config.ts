
import { BellRing, MessageCircleMore, Users, UserCog } from "lucide-react"

export const sidebar_config = [
    {
        label: "Menu",
        sub_items: [
            { title: "Messages",  url: "/messages",  icon: MessageCircleMore, },
            { title: "Friends",  url: "/friends",  icon: Users, },
            { title: "Requests",  url: "/requests",  icon: BellRing, },
        ]
    },
    {
        label: "Other",
        sub_items: [
            { title: "Settings",  url: "/settings",  icon: UserCog, },
        ]
    }
]
