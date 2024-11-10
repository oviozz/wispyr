
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {LogOut, ChevronsUpDown, Settings} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

interface ProfileDropDownProps {
    _align?: "start" | "center" | "end"
}

export default function ProfileDropdown({_align = "start"}: ProfileDropDownProps){

    const [isOpen, setIsOpen] = useState(false)


    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <div className={cn(
                    "flex items-center justify-between gap-2 hover:bg-gray-100 dark:hover:bg-gray-100/10 hover:cursor-pointer py-0.5 px-2 rounded-md",
                    isOpen ? "bg-gray-100 dark:bg-gray-100/10" : null
                )}>
                    <div className={"flex items-center gap-2"}>
                        <Avatar className={"h-8 w-8"}>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col gap-0.5 leading-none">
                            <p className={"text-sm font-medium line-clamp-2"}>Jasper Melisone</p>
                            <span className={"font-semibold text-xs text-blue-500"}>ID: 452332</span>
                        </div>
                    </div>
                    <ChevronsUpDown className="h-4 w-4 text-muted-foreground transition-transform duration-300"
                                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-xl" align={_align}>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Settings className="mr-1 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <Button variant={"destructive"} className={"w-full hover:bg-red-"}>
                    <LogOut className="h-4 w-4" />
                    <span className={"font-semibold"}>Log out</span>
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}