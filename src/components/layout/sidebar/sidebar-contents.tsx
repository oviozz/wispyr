
"use client"

import {
    SidebarContent, SidebarGroup,
    SidebarGroupContent, SidebarGroupLabel,
    SidebarMenu,
} from "@/components/ui/sidebar";
import {sidebar_config} from "@/data/sidebar-config";
import SidebarItem from "@/components/layout/sidebar/sidebar-item";

export default function SidebarContents(){


    return (
        <SidebarContent className={"divide-y"}>
            { sidebar_config?.map(({label, sub_items}, index) => {
                return (
                    <SidebarGroup key={index}>
                        <SidebarGroupLabel className={"text-md"}>{label}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {sub_items.map((side_links, index) => (
                                    <SidebarItem
                                        key={index}
                                        title={side_links.title}
                                        url={side_links.url}
                                        icon={side_links.icon}
                                        dialog={side_links.dialog}
                                    />
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )
            })}
        </SidebarContent>
    )

}