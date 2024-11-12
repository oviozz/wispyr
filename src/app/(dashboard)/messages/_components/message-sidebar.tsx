import {Input} from "@/components/ui/input";
import {UserRoundSearch} from "lucide-react";
import MessageTabs from "@/app/(dashboard)/messages/_components/message-tabs";
import MessageLists from "@/app/(dashboard)/messages/_components/message-lists";

export default function MessageSidebar(){

    return (
        <div className={"flex flex-col h-full max-w-80 border-r"}>

            {/*message tab search*/}
            <div className={"py-4 space-y-2 px-3 border-b "}>
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

            {/*message list*/}
            <div className="flex flex-col flex-1 min-h-0">
                <h2 className="px-3 py-2 text-sm text-muted-foreground">Your Messages</h2>
                <div className="flex-1 overflow-y-auto hide-scrollbar">
                    <MessageLists />
                </div>
            </div>

        </div>
    )

}