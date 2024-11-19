
"use client"

import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {BellIcon, Check, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {useMutation, useQuery} from "convex/react";
import {api} from "../../convex/_generated/api";
import {useAuth} from "@/hooks/useAuth";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getInitials} from "@/lib/utils";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Id} from "../../convex/_generated/dataModel";
import {toast} from "sonner";


export default function NotificationDialog(){

    const { user } = useAuth();
    const notifications = useQuery(api.invites.getAllNotifications, {
        userId: user?._id
    });

    const declineFriendRequest = useMutation(api.invites.removeFriendRequest)
    const acceptFriendRequest = useMutation(api.invites.acceptFriendRequest);

    const declineNotification = async (inviteId: Id<"friend_invites">) => {
        const { success } = await declineFriendRequest({
            friendInviteId: inviteId
        })

        if (!success){
            toast.error("Something went wrong")
        } else {
            toast.info("Request has been declined")
        }

    }
    const acceptNotification = async (inviteId: Id<"friend_invites">) => {
        const { success, message } = await acceptFriendRequest({
            inviteId: inviteId
        });

        if (success){
            toast.success(message);
        } else {
            toast.error(message);
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <BellIcon className="h-5 w-5" />
                    <div className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs dark:text-white text-primary-foreground">
                        {notifications?.length || 0}
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"rounded-xl p-0 border-none"} align={"center"}>
                <Card>
                    <CardHeader className={"border-b py-4 space-y-1"}>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>You have {notifications?.length || 0} new notifications</CardDescription>
                    </CardHeader>
                    <CardContent className=" shadow-none p-0">
                        <ScrollArea className="h-[300px] w-[350px]">
                            {notifications?.length ? (
                                notifications.map((notifi) => {
                                    if (!notifi) return null

                                    const { from_user, invite_id } = notifi;
                                    const { firstName, lastName, avatar } = from_user;
                                    const fullName = `${firstName} ${lastName}`
                                    return (
                                        <div key={invite_id || firstName } className="flex items-center space-x-4 p-2 focus:bg-transparent">
                                            <Avatar>
                                                <AvatarImage src={avatar || ""} alt={fullName} />
                                                <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium leading-none">{fullName}</p>
                                                <p className="text-sm text-muted-foreground">Sent you a follow request</p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Button
                                                    onClick={() => acceptNotification(invite_id)}
                                                    size="icon"
                                                    variant="main"
                                                    className="h-7 w-7"
                                                >
                                                    <Check className="h-4 w-4" />
                                                    <span className="sr-only">Accept</span>
                                                </Button>
                                                <Button
                                                    onClick={() => declineNotification(invite_id)}
                                                    size="icon"
                                                    variant="destructive"
                                                    className="h-7 w-7"
                                                >
                                                    <X className="h-4 w-4" />
                                                    <span className="sr-only">Decline</span>
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="flex h-[300px] items-center justify-center">
                                    <p className="text-sm text-muted-foreground">No new notifications</p>
                                </div>
                            )}
                        </ScrollArea>
                    </CardContent>
                </Card>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}