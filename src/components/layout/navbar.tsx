
"use client"
import {Button} from "@/components/ui/button";
import {PanelLeft, Search} from "lucide-react";
import {ThemeToggle} from "@/components/theme-toggle";
import {useSidebar} from "@/components/ui/sidebar";
import * as React from "react";
import {cn} from "@/lib/utils";

export default function Navbar(){

    const { toggleSidebar, setOpen } = useSidebar();

    return (
        <header className={"flex justify-between items-center w-full border rounded-lg p-1"}>

            <div className={"flex items-center"}>
                <div
                    className={cn("h-9 w-9")}
                    onClick={() => {
                        toggleSidebar()
                    }}
                >
                    <PanelLeft className={"h-12 w-12"}/>
                    <span className="sr-only">Toggle Sidebar</span>
                </div>
                <h2 className={"text-xl font-bold"}>Dashboard</h2>
            </div>

            <div className={"flex items-center gap-2"}>

                <Button size={"icon"} variant={"secondary"}>
                    <Search className={"h-8 w-8"} />
                </Button>

                <ThemeToggle />


            </div>
        </header>
    )

}