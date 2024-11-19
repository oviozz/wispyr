
"use client";
import { Input } from "@/components/ui/input";
import { UserRoundSearch } from "lucide-react";
import MessageTabs from "@/app/(dashboard)/messages/_components/message-tabs";
import MessageLists from "@/app/(dashboard)/messages/_components/message-lists";
import CreateChatButton from "@/app/(dashboard)/messages/_components/create-chat-button";

import { useRef, useEffect } from "react";
import {useIsMobile} from "@/hooks/use-mobile";
import {useMessageSidebarControl} from "@/hooks/useMessageSidebarControl";

export default function MessageSidebar() {

    const isMobile = useIsMobile();
    const { isOpen, closeSidebar } = useMessageSidebarControl();
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isMobile &&
                isOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                closeSidebar();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMobile, isOpen, closeSidebar]);

    if (isMobile === undefined) return null;

    if (isMobile) {
        return (
            <div
                ref={sidebarRef}
                className={`
                  absolute top-0 left-0 h-full w-80 
                  transform transition-transform duration-300 z-50 bg-black
                  ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                  shadow-lg
                `}>
                <div className="flex flex-col h-full max-w-80 border-r">
                    {/* Existing sidebar content */}
                    <div className="py-4 space-y-3 px-3 border-b">
                        <CreateChatButton />
                        <MessageTabs />
                    </div>
                    <div className="flex flex-col flex-1 min-h-0">
                        <div className="py-2 pb-4 px-3 space-y-1.5">
                            <p className="text-sm text-muted-foreground">Search Messages</p>
                            <div className="relative">
                                <Input
                                    placeholder="Search"
                                    aria-label="Search"
                                    className="shadow-none rounded-lg bg-neutral-100/30 dark:bg-neutral-100/10 font-medium pl-10"
                                />
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <UserRoundSearch className="h-5 w-5 text-neutral-500" />
                                </div>
                            </div>
                        </div>
                        <h2 className="px-3 text-sm text-muted-foreground">Your Message Group</h2>
                        <div className="flex-1 mt-1 overflow-y-auto hide-scrollbar">
                            <MessageLists closeSidebar={closeSidebar} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full max-w-80 border-r">
            {/* Existing desktop sidebar content */}
            <div className="py-4 space-y-3 px-3 border-b">
                <CreateChatButton />
                <MessageTabs />
            </div>
            <div className="flex flex-col flex-1 min-h-0">
                <div className="py-2 pb-4 px-3 space-y-1.5">
                    <p className="text-sm text-muted-foreground">Search Messages</p>
                    <div className="relative">
                        <Input
                            placeholder="Search"
                            aria-label="Search"
                            className="shadow-none rounded-lg bg-neutral-100/30 dark:bg-neutral-100/10 font-medium pl-10"
                        />
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <UserRoundSearch className="h-5 w-5 text-neutral-500" />
                        </div>
                    </div>
                </div>
                <h2 className="px-3 text-sm text-muted-foreground">Your Message Group</h2>
                <div className="flex-1 mt-1 overflow-y-auto hide-scrollbar">
                    <MessageLists />
                </div>
            </div>
        </div>
    );
}