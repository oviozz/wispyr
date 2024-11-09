
import {SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar";
import {ForwardRefExoticComponent, RefAttributes} from "react";
import {LucideProps} from "lucide-react";

interface SidebarItemProps {
    title: string,
    url: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}
export default function SidebarItem({title, url, icon: Icon }: SidebarItemProps){

    const friend_request: number = 5;

    return (
        <SidebarMenuItem key={title}>
            <SidebarMenuButton className={"font-medium hover:bg-blue-100/50 dark:hover:bg-blue-100/20 text-md"} asChild>
                <a href={url}>
                    <Icon className={"text-blue-500"} />
                    <span>{title}</span>
                </a>
            </SidebarMenuButton>


            { friend_request && title.toLowerCase().includes("friends") && (
                <SidebarMenuBadge className={"peer-hover/menu-button:text-blue-700 bg-blue-100 text-blue-700 border border-blue-300 font-semibold rounded-lg"}>
                    {friend_request}
                </SidebarMenuBadge>
            )}
        </SidebarMenuItem>
    )
}