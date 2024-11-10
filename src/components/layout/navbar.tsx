
"use client"

import {Button} from "@/components/ui/button";
import {BellIcon, Search} from "lucide-react";
import {ThemeToggle} from "@/components/theme-toggle";
import * as React from "react";
import {SidebarTrigger} from "@/components/ui/sidebar";
import ProfileDropdown from "@/components/(auth)/profile-dropdown";
import {usePathname} from "next/navigation";
import {getTitle} from "@/lib/utils";

export default function Navbar(){

    const pathname = usePathname()
    const page_title = getTitle(pathname);

    return (
        <header className={"flex justify-between items-center w-full border-b border-gray-200 dark:border-gray-100/30 sm:py-1 py-2 px-4"}>

            <div className={"flex items-center gap-2"}>
                <SidebarTrigger className={""} />
                <h2 className={"text-xl font-bold"}>{page_title}</h2>
            </div>

            <div className={"flex items-center gap-4"}>
                <Button variant="ghost" size="icon" className="relative">
                    <BellIcon className="h-5 w-5" />
                    <div className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs dark:text-white text-primary-foreground">
                        3
                    </div>
                </Button>

                <Button variant={"ghost"} size={"icon"}>
                    <Search className={"h-5 w-5"} />
                </Button>

                <div className={"hidden sm:flex items-center gap-3"}>
                    <ThemeToggle />
                    <div className="w-px h-7 bg-border" />
                    <ProfileDropdown _align={"end"}/>
                </div>
            </div>
        </header>
    )

}