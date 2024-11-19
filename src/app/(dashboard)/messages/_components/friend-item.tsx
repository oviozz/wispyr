
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {User} from "@/lib/types/user";
import {cn, getInitials} from "@/lib/utils";
import {Checkbox} from "@/components/ui/checkbox";
import {useState} from "react";
import {Check} from "lucide-react";
import {Id} from "../../../../../convex/_generated/dataModel";

interface FriendItemProps {
    friend: User | null
    toggleFriend: (friendId: Id<"users">) => void;
}
export default function FriendItem({friend, toggleFriend}: FriendItemProps){

    const [check, setCheck] = useState<boolean>(false);

    if (!friend) return null

    const { _id, firstName, lastName, email, avatar } = friend;
    const fullName = `${firstName} ${lastName}`
    const initial = getInitials(fullName);


    const handleCheckedChange = () => {
        toggleFriend(_id);
        setCheck((prev) => !prev);
    }

    return (
        <div onClick={handleCheckedChange} className={"group/friend hover:cursor-pointer flex items-center gap-2"}>

            <Checkbox checked={check} id={`friend-${_id}`} />

            <div className={cn("flex items-center justify-between rounded-lg w-full py-1 px-2", check ? "bg-blue-100/70 dark:bg-blue-100/20 border border-blue-400" : "group-hover/friend:bg-gray-100 dark:group-hover/friend:bg-gray-100/20")}>
                <div className={"flex items-center gap-2"}>
                    <Avatar className={"w-9 h-9"}>
                        <AvatarFallback>{initial}</AvatarFallback>
                        <AvatarImage src={avatar || ""} alt={`${name}'s profile picture`} />
                    </Avatar>

                    <div className={"leading-5"}>
                        <p className={"transition font-medium"}>{fullName}</p>
                        <span className={"text-sm text-muted-foreground"}>{email}</span>
                    </div>
                </div>

                { check && (
                    <span className={"inline-flex items-center gap-1 text-xs text-muted-foreground"}>
                        <Check className={"h-3 w-3"}/>
                        Selected
                    </span>
                )}

            </div>

        </div>
    )

}