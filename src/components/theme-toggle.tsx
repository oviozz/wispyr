
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {useEffect, useState} from "react";
import {Skeleton} from "@/components/ui/skeleton";

export function ThemeToggle() {

    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <ThemeToggleSkeleton />;
    }

    return (
        <Card className="p-1 flex items-center w-fit space-x-1 shadow-none">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme("light")}
                className={`${
                    theme === "light" ? "bg-blue-100 text-blue-700" : ""
                } transition-colors`}
                aria-label="Light mode"
            >
                <Sun className="h-5 w-5" />
            </Button>
            <div className="h-6 w-px bg-border" />
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme("dark")}
                className={`${
                    theme === "dark" ? "bg-blue-100 text-blue-500" : ""
                } transition-colors`}
                aria-label="Dark mode"
            >
                <Moon className="h-5 w-5" />
            </Button>
        </Card>
    )
}



const ThemeToggleSkeleton = () => {
    return (
        <Card className="animate-pulse p-1 flex items-center w-fit space-x-1 shadow-none">
            <Skeleton className={"animate-pulse dark:bg-gray-900 bg-gray-200 w-7 h-7"}/>
            <div className="h-6 w-px bg-border" />
            <Skeleton className={"animate-pulse dark:bg-gray-900 bg-gray-200 w-7 h-7"}/>
        </Card>
    )
}