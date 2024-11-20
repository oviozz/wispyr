
import { User } from "@/lib/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {useMutation} from "convex/react";
import {api} from "../../../../../convex/_generated/api";
import {Id} from "../../../../../convex/_generated/dataModel";
import {toast} from "sonner";

interface FriendRequestItemProps {
    friend_info: User;
    userId: Id<"users"> | undefined
    hasRequested: boolean | null
    requested_invite_id: Id<"friend_invites"> | undefined
    isFriend: boolean | undefined
}

export default function FriendRequestItem({ friend_info, userId, hasRequested, requested_invite_id, isFriend }: FriendRequestItemProps) {

    const addFriend = useMutation(api.invites.requestFriend)
    const deleteFriend = useMutation(api.invites.removeFriendRequest)

    const [isRequested, setIsRequested] = useState(hasRequested);
    const { _id: friendId, firstName, lastName, email, avatar } = friend_info;
    const fullName = `${firstName} ${lastName}`;
    const initial = getInitials(fullName);

    const handleFriendRequest = async () => {
        if (!userId && !friendId || isFriend) return

        setIsRequested((prev) => !prev)

        try {
            if (isRequested && requested_invite_id) {
                const { success, message } = await deleteFriend({
                    friendInviteId: requested_invite_id
                })
                if (success) {
                    toast.info(message)
                } else {
                    toast.error(message)
                }
            } else {
                const { success, message } = await addFriend({
                    userId: userId,
                    toUserId: friendId
                })
                if (success) {
                    toast.success(message)
                } else {
                    toast.error(message)
                }
            }
        } catch (error) {
            setIsRequested((prev) => !prev) // Revert state on error
            toast.error(error instanceof Error ? error.message : "An error occurred")
        }
    }
    return (
        <div className={"flex items-center justify-between px-2 py-1 rounded-xl"}>
            <div className={"flex items-center gap-2"}>
                <Avatar className={"w-9 h-9"}>
                    <AvatarFallback>{initial}</AvatarFallback>
                    <AvatarImage src={avatar || ""} alt={`${fullName}'s profile picture`} />
                </Avatar>

                <div className={"leading-5"}>
                    <p className={"transition font-medium"}>{fullName}</p>
                    <span className={"text-sm text-muted-foreground"}>{email}</span>
                </div>
            </div>

            <Button
                onClick={handleFriendRequest}
                variant={isFriend ? "green" : isRequested ? "yellow" : "outline"}
                size="sm"
                className="font-semibold text-xs relative flex items-center gap-2 px-5"
            >
                {!isFriend ? (
                    isRequested ? (
                        <>
                            <span className="relative flex items-center h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-800 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-700"></span>
                            </span>
                            Requested
                        </>
                    ) : (
                        <span>Follow</span>
                    )
                ) : (
                    <span>Friend</span>
                )}
            </Button>

        </div>
    );
}
