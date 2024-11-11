
import {ReactNode} from "react";
import MessageSidebar from "@/app/(dashboard)/messages/_components/message-sidebar";

interface MessageLayoutProps {
    readonly children: ReactNode;
}
export default function MessageLayout({children}: MessageLayoutProps ){

    return (
        <div className="flex h-full">
            <MessageSidebar />
            <div className="flex-1 min-h-0">
                {children}
            </div>
        </div>
    )


}