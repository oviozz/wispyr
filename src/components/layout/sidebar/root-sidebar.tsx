
import BrandTitle from "@/components/brand-title";
import {Sidebar, SidebarFooter, SidebarHeader, SidebarRail} from "@/components/ui/sidebar";
import SidebarContent from "@/components/layout/sidebar/sidebar-contents";
import ProfileDropdown from "@/components/profile-dropdown";

export default function RootSidebar(){

    return (
        <Sidebar>
            <SidebarHeader className={"p-3"}>
                <BrandTitle />
            </SidebarHeader>
            <SidebarContent/>
            <SidebarRail />

            <SidebarFooter className={"border-t"}>
                <ProfileDropdown />
            </SidebarFooter>
        </Sidebar>
    )

}