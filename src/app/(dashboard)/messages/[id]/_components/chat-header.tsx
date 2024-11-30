
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { MoreHorizontal, Users } from 'lucide-react'
import {User} from "@/lib/types/user";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";
import {ChatRoomType} from "@/lib/types/chatroom";
import {MessageSidebarToggle} from "@/app/(dashboard)/messages/[id]/_components/message-sidebar-toggle";

interface ChatHeaderProps {
    room_details: {
        details: ChatRoomType;
        participants: {
            user: User | null;
            role: "admin" | "member";
        }[];
    };
}

export default function ChatHeader({ room_details }: ChatHeaderProps) {

    const { details, participants } = room_details

    const displayParticipants = participants?.slice(0, 3)
    const remainingParticipants = participants?.length - displayParticipants.length

    return (
        <div className="flex items-center justify-between border-b px-4 py-1.5 shrink-0 bg-background">
            <div className={"flex items-center gap-2"}>
                <div className={"sm:hidden block"}>
                    <MessageSidebarToggle />
                </div>
                <div className="flex items-center space-x-4">
                    <h2 className="text-xl font-bold">{details?.room_name}</h2>
                    <div className={"sm:block hidden"}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button size={"sm"} variant={"green"} className="flex items-center py-0 px-2">
                                        <Users className="w-4 h-4 mr-1 dark:text-white" />
                                        <span className={"text-sm text-white font-semibold"}>
                                            {participants?.length}
                                            {details.max_participants && `/${details.max_participants}`}
                                        </span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="text-gray-100">
                                    <p className="font-medium text-gray-200 dark:text-gray-500 mb-2 text-sm">Participants:</p>
                                    <ul className="space-y-2">
                                        {participants.map((participant, index) => {
                                            if (participant.user) {
                                                const fullName = `${participant.user.firstName} ${participant.user.lastName}`
                                                return (
                                                    <li key={index} className="flex items-center gap-2 text-sm">
                                                <span
                                                    className={`w-2 h-2 rounded-full ${
                                                        participant.role === 'admin'
                                                            ? 'bg-red-400'
                                                            : 'bg-emerald-400'
                                                    }`}
                                                />
                                                        <span className="text-gray-100 dark:text-gray-500">{fullName}</span>
                                                        <Badge
                                                            variant={participant.role === "admin" ? "destructive" : "green"}
                                                            className="ml-auto text-xs font-normal border-gray-700"
                                                        >
                                                            {participant.role}
                                                        </Badge>
                                                    </li>
                                                )
                                            }
                                            return null
                                        })}
                                    </ul>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>

            <div className={"flex items-center gap-2"}>

                <div className="sm:flex items-center gap-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className={`flex items-center gap-2 ${details.retention ? 'text-green-500' : 'text-red-500'}`}>
                                <span className="relative flex h-3 w-3">
                                    <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", details.retention ? "bg-green-500" : "bg-red-400")}></span>
                                    <span className={cn("relative inline-flex rounded-full h-3 w-3", details.retention ? "bg-green-500" : "bg-red-500")}></span>
                                </span>
                                    <span className="sm:block hidden text-sm font-semibold">
                                        Retention {details.retention ? 'On' : 'Off'}
                                    </span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                {details.retention
                                    ? "Messages will be deleted after 1 min"
                                    : "Messages are not being retained"}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <div className={"sm:flex hidden items-center gap-2"}>
                        <p className={"text-sm font-semibold text-muted-foreground"}>Members:</p>
                        <div className="flex items-center -space-x-2 rtl:space-x-reverse">
                            {displayParticipants.map((participant) => {
                                if (participant.user) {
                                    return (
                                        <TooltipProvider key={participant.user._id}>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Avatar className={`hover:scale-110 transition h-9 w-9 border-[3px] animate-spin ${participant.role === 'admin' ? 'border-red-500' : 'border-green-500'}`}>
                                                        <AvatarImage src={participant.user.avatar || undefined} alt={`${participant.user.firstName} ${participant.user.lastName}`} />
                                                        <AvatarFallback>{`${participant.user.firstName?.[0] || ''}${participant.user.lastName?.[0] || ''}`}</AvatarFallback>
                                                    </Avatar>
                                                </TooltipTrigger>
                                                <TooltipContent className={"flex flex-col w-full gap-2"}>
                                                    <p className={"font-medium"}>{`${participant.user.firstName} ${participant.user.lastName}`}</p>
                                                    <span className={cn("w-fit text-white font-semibold rounded-xl px-2 py-0.5",
                                                        participant.role !== "admin" ? "bg-green-500" : "bg-red-500"
                                                    )}>
                                                        {participant.role}
                                                    </span>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )
                                }
                                return null
                            })}
                            {remainingParticipants > 0 && (
                                <div className="flex items-center justify-center w-8 h-8 text-xs font-medium text-primary-foreground bg-primary rounded-full border-2 border-background">
                                    +{remainingParticipants}
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="main" size="icon" className="ml-2">
                            <MoreHorizontal className="w-4 h-4" />
                            <span className="sr-only">More options</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Room Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Button variant={"destructive"}>Leave Room</Button>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}