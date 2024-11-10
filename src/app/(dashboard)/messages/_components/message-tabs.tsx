
"use client"
import {useState} from "react";
import {cn} from "@/lib/utils";
import {MessageCircle, Users, Hash } from "lucide-react"


const tabOptions = [
    { value: "all", title: "All", icon: MessageCircle },
    { value: "people", title: "People", icon: Users },
    { value: "groups", title: "Groups", icon: Hash }
]


export default function MessageTabs(){

    const [activeTab, setActiveTab] = useState(tabOptions[0].value)


    return (
        <div className={"w-full rounded-xl"}>
            <nav className={"flex items-center justify-between gap-2"}>
                { tabOptions.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        className={cn(
                            "flex items-center justify-center font-medium w-full text-md px-3 py-1 rounded-md cursor-pointer transition-colors",
                            activeTab === tab.value
                                ? "bg-blue-100/50 dark:bg-blue-200/50 text-blue-500 dark:text-blue-200"
                                : "text-muted-foreground/80 bg-neutral-100/50 dark:bg-neutral-200/10 dark:text-white"
                        )}
                    >
                        <tab.icon className="h-4 w-4 mr-1" />
                        {tab.title}
                    </button>
                ))}
            </nav>
        </div>
    )

}