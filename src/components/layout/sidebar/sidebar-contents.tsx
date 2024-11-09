
import {
    SidebarContent, SidebarGroup,
    SidebarGroupContent, SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import {sidebar_config} from "@/data/sidebar-config";


export default function SidebarContent(){

    return (
        <SidebarContent>
            { sidebar_config?.map(({label, sub_items}, index) => {
                return (
                    <SidebarGroup key={index}>
                        <SidebarGroupLabel className={"text-md"}>{label}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {sub_items.map((side_links) => (
                                    <SidebarMenuItem key={side_links.title}>
                                        <SidebarMenuButton className={"font-medium hover:bg-blue-100/50 text-md"} asChild>
                                            <a href={side_links.url}>
                                                <side_links.icon className={"text-blue-500"} />
                                                <span>{side_links.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )
            })}
        </SidebarContent>
    )

}