
import {BellRing, MessageCircleMore, Users, UserCog, LucideIcon} from "lucide-react"
import SettingsDialog from "@/components/settings-dialog";
import {ReactNode} from "react";

export const sidebar_config: SidebarConfig[] = [
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
            { title: "Settings",  dialog: <SettingsDialog />,  icon: UserCog, },
        ]
    }
]


type SidebarConfig = {
    label: string;
    sub_items: Array<
        {
            title: string;
            icon: LucideIcon; // Icon from Lucide-react
        } & (
        | { url: string; dialog?: never } // If there's a URL, dialog must not exist
        | { dialog: ReactNode; url?: never } // If there's a dialog, URL must not exist
        )
    >;
};