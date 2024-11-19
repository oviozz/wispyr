
import {SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar";
import {ForwardRefExoticComponent, ReactNode, RefAttributes} from "react";
import {LucideProps} from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils";

interface SidebarItemProps {
    title: string,
    url?: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    dialog: ReactNode
}
export default function SidebarItem({title, url, icon: Icon, dialog }: SidebarItemProps){

    const friend_request: number = 5;

    return (
        <SidebarMenuItem key={title}>
            <SidebarMenuButton className={cn("font-medium text-md",
                url && !dialog && "hover:bg-blue-100/50 dark:hover:bg-blue-100/20"
            )} asChild>
                { (url && !dialog) ? (
                    <Link href={url}>
                        <Icon className={"text-blue-500"} />
                        <span>{title}</span>
                    </Link>
                ) : (
                    <div>{dialog}</div>
                )}
            </SidebarMenuButton>


            { friend_request && title.toLowerCase().includes("friends") && (
                <SidebarMenuBadge className={"peer-hover/menu-button:text-blue-700 bg-blue-100 text-blue-700 border border-blue-300 font-semibold rounded-lg"}>
                    {friend_request}
                </SidebarMenuBadge>
            )}
        </SidebarMenuItem>
    )
}