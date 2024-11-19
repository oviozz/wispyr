
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {User} from "@/lib/types/user";
import {useMutation} from "convex/react";
import {api} from "../../../../../convex/_generated/api";
import {Id} from "../../../../../convex/_generated/dataModel";
import {toast} from "sonner";

interface FriendCardProps {
    friendId: Id<"friends">
    friend: User | null
}

export default function FriendCard({friend, friendId}: FriendCardProps){

    const unfollowFriend = useMutation(api.friends.removeFriend)

    if (!friend) return;

    const { firstName, lastName, avatar, email } = friend;
    const fullName = `${firstName} ${lastName}`

    const unfollowHandler = async () => {
        const { success, message } = await unfollowFriend({
            friendId: friendId
        })
        if (success){
            toast.success(message)
        } else {
            toast.error(message)
        }
    }

    return (
        <div className={"bg-gray-900 rounded-xl w-full"}>
            <img
                src={"https://marketplace.canva.com/EADaosozdz0/1/0/1600w/canva-purple-sky-profile-header-XBJ23wlhl0s.jpg"}
                alt={"friend headers"}
                className={"rounded-t-xl h-24 w-full"}
            />

            <div className={"relative flex items-center justify-between px-4 py-2"}>

                <div className={"flex items-center gap-4"}>

                    <Avatar className={"-mt-10 h-16 w-16"}>
                        <AvatarFallback>PS</AvatarFallback>
                        <AvatarImage
                            src={avatar || ""}
                            alt={"friend headers"}
                        />
                    </Avatar>

                    <div>
                        <h2 className={"-mb-1 text-white text-lg font-semibold"}>{fullName}</h2>
                        <span className={"text-sm text-muted/70 dark:text-muted-foreground"}>{email}</span>
                    </div>
                </div>

                <Button
                    onClick={unfollowHandler}
                    className={"font-semibold"} variant={"destructive"} size={"sm"}>
                    Unfollow
                </Button>
            </div>
        </div>
    )

}