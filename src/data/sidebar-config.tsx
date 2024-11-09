
import { Home, MessageCircleMore, Users, UserCog } from "lucide-react"

export const sidebar_config = [
    {
        label: "Menu",
        sub_items: [
            { title: "Dashboard",  url: "/",  icon: Home, },
            { title: "Friends",  url: "/friends",  icon: Users, },
            { title: "Messages",  url: "/messages",  icon: MessageCircleMore, },
        ]
    },
    {
        label: "Other",
        sub_items: [
            { title: "Settings",  url: "/settings",  icon: UserCog, },
        ]
    }
]
