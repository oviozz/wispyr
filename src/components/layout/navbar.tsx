
import {Button} from "@/components/ui/button";
import {BellIcon, Search} from "lucide-react";
import {ThemeToggle} from "@/components/theme-toggle";
import * as React from "react";
import {SidebarTrigger} from "@/components/ui/sidebar";
import ProfileDropdown from "@/components/(auth)/profile-dropdown";

export default function Navbar(){

    return (
        <header className={"flex justify-between items-center w-full"}>

            <div className={"flex items-center gap-2"}>
                <SidebarTrigger className={""} />
                <h2 className={"text-xl font-bold"}>Dashboard</h2>
            </div>

            <div className={"flex items-center gap-4"}>
                <Button variant="secondary" size="icon" className="relative">
                    <BellIcon className="h-5 w-5" />
                    <div className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs dark:text-white text-primary-foreground">
                        3
                    </div>
                </Button>

                <Button variant={"secondary"} size={"icon"}>
                    <Search className={"h-5 w-5"} />
                </Button>

                <div className={"hidden sm:flex items-center gap-3"}>
                    <ThemeToggle />
                    <div className="w-px h-8 bg-border" />
                    <ProfileDropdown />
                </div>
            </div>
        </header>
    )

}