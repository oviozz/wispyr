
import MainMessageContent from "@/app/(dashboard)/messages/[id]/_components/main-message-content";
import {Id} from "../../../../../convex/_generated/dataModel";
import {Suspense} from "react";
import MessageContentSkeleton from "@/app/(dashboard)/messages/_components/message-content-skeleton";


export default async function Message({params}: { params: Promise<{id: Id<"chat_rooms">}>}) {

    const roomId = (await params).id;

    return (
        <Suspense fallback={<MessageContentSkeleton />}>
            <MainMessageContent roomId={roomId} />
        </Suspense>
    );
}