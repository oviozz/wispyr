import {X} from "lucide-react";


export default function NotFound(){

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <X className={"text-blue-500 w-10 h-10 animate-spin"} />
            <p className="text-lg font-medium animate-pulse">Chat Room Not Found</p>
        </div>
    )

}