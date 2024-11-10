import {Input} from "@/components/ui/input";
import {UserRoundSearch} from "lucide-react";
import MessageTabs from "@/app/(dashboard)/messages/_components/message-tabs";
import MessageLists from "@/app/(dashboard)/messages/_components/message-lists";

export default function MessageSidebar(){

    return (
        <div className={"flex flex-col gap-1 max-w-80 border-r"}>

            <div className={"py-4 space-y-2 px-2.5"}>
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
                <MessageTabs />
            </div>

            <div className={"space-y-3"}>
                <h2 className={"ml-2.5 text-sm text-muted-foreground"}>Your Messages</h2>
                <MessageLists />
            </div>

        </div>
    )

}