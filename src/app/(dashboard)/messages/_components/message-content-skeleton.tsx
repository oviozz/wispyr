
import {LoadingSpinner} from "@/components/loading-spinner";

export default function MessageContentSkeleton() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <LoadingSpinner className={"text-blue-500 w-10 h-10"} />
            <p className="text-lg font-medium animate-pulse">Loading messages...</p>
        </div>
    )
}