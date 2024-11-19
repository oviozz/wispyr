
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronsUpDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {cn, getInitials} from "@/lib/utils";
import { LoadingSpinner } from "@/components/loading-spinner";
import {useAuth} from "@/hooks/useAuth";
import LogoutButton from "@/components/LogoutButton";

interface ProfileDropDownProps {
    _align?: "start" | "center" | "end";
}

export default function ProfileDropdown({ _align = "start" }: ProfileDropDownProps) {

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const { user } = useAuth()

    if (!user) return <LoadingSpinner size={"sm"} />

    const { firstName, lastName, email, avatar } = user;
    const fullName = `${firstName} ${lastName}`

    return (
        <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
                <div
                    className={cn(
                        "flex items-center justify-between gap-2 hover:bg-gray-100 dark:hover:bg-gray-100/10 cursor-pointer py-0.5 px-2 rounded-md",
                        isDropdownOpen && "bg-gray-100 dark:bg-gray-100/10"
                    )}
                >
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={avatar || ""} />
                            <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col leading-none">
                            <p className="text-sm font-medium line-clamp-1">{fullName}</p>
                            <span className="font-semibold text-xs text-blue-500">{email}</span>
                        </div>
                    </div>
                    <ChevronsUpDown
                        className="h-4 w-4 text-muted-foreground transition-transform duration-300"
                        style={{ transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                </div>
            </DropdownMenuTrigger>

            {/* Dropdown Menu */}
            <DropdownMenuContent className="w-56 rounded-xl" align={_align}>
                <LogoutButton />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
