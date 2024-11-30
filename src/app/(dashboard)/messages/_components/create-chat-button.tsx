
"use client"

import {Plus, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    Credenza,
    CredenzaBody, CredenzaClose,
    CredenzaContent, CredenzaDescription, CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger
} from "@/components/ui/credenza";
import {Input} from "@/components/ui/input";
import FriendItem from "@/app/(dashboard)/messages/_components/friend-item";
import {Label} from "@/components/ui/label";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Checkbox} from "@/components/ui/checkbox";
import {useAuth} from "@/hooks/useAuth";
import {useMutation, useQuery} from "convex/react";
import {api} from "../../../../../convex/_generated/api";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {chat_room_schema, ChatRoomSchema} from "@/lib/definitions";
import {useEffect, useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getInitials} from "@/lib/utils";
import {Id} from "../../../../../convex/_generated/dataModel";
import {toast} from "sonner";

export default function CreateChatButton() {

    const { user } = useAuth();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedParticipants, setSelectedParticipants] = useState<Id<"users">[]>([]);
    const {
        reset,
        control,
        setValue,
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = useForm<ChatRoomSchema>({
        resolver: zodResolver(chat_room_schema),
        defaultValues: {
            max_participants: 5,
            admin_id: user?._id as Id<"users">,
            retention: false,
            participants: [] as Id<"users">[],
            room_name: ""
        }
    });

    useEffect(() => {
        setSelectedParticipants([]);
        reset()
    }, [dialogOpen, reset]);

    const myfriends = useQuery(api.friends.getAllFriends, {
        userId: user?._id
    });

    const create_room = useMutation(api.chat_rooms.createChatRoom)

    const toggleParticipant = (friendId: Id<"users">) => {
        setSelectedParticipants(prev => {
            const newParticipants = prev.includes(friendId)
                ? prev.filter(id => id !== friendId)
                : [...prev, friendId];

            setValue('participants', newParticipants);
            return newParticipants;
        });
    };

    const removeParticipant = (friendId: Id<"users">) => {
        setSelectedParticipants(prev => {
            const newParticipants = prev.filter(id => id !== friendId);
            setValue('participants', newParticipants);
            return newParticipants;
        });
    };

    const createChatRoom = async (data: ChatRoomSchema) => {

        const { room_name, admin_id, participants, max_participants, retention} = data;
        const { success, message } = await create_room({
            room_name,
            admin_id,
            participants,
            max_participants,
            retention
        });

        if (success){
            toast.success(message);
            setDialogOpen(false)
            reset();
        } else {
         toast.error(message)
        }
    };
    return (
        <div className="bg-background">
            <Credenza open={dialogOpen} onOpenChange={setDialogOpen}>
                <CredenzaTrigger asChild>
                    <Button className="w-full" variant="main">
                        <Plus className="w-4 h-4" />
                        Start New Conversation
                    </Button>
                </CredenzaTrigger>
                <CredenzaContent>
                    <CredenzaHeader className="space-y-1">
                        <CredenzaTitle>
                            Start a new conversation
                        </CredenzaTitle>
                        <CredenzaDescription>
                            Invite friends to start chatting
                        </CredenzaDescription>
                    </CredenzaHeader>
                    <CredenzaBody>
                        <div className="space-y-1">
                            <Label>Chat Name</Label>
                            <Input
                                {...register("room_name")}
                                placeholder="Enter chat name.."
                                className="w-full"
                            />
                            {errors.room_name && (
                                <p className="text-sm text-red-500">
                                    {errors.room_name.message}
                                </p>
                            )}
                        </div>

                        <div className="py-4 space-y-2">
                            <div className="flex justify-between">
                                <Label>Your Friends</Label>
                                <span className="text-xs text-muted-foreground">
                                    {myfriends?.length || 0} found
                                </span>
                            </div>
                            <div>
                                {myfriends && myfriends?.length > 0 ? (
                                    <ScrollArea className="h-60 pr-4">
                                        <ul className="space-y-3">
                                            {myfriends?.map(({friend}, index) => (
                                                <FriendItem
                                                    toggleFriend={toggleParticipant}
                                                    key={index}
                                                    friend={friend}
                                                />
                                            ))}
                                        </ul>
                                    </ScrollArea>
                                ) : (
                                    <span className="h-52 font-semibold flex justify-center text-gray-500 py-5">
                                        No friends added
                                    </span>
                                )}
                            </div>
                            { errors.participants && (
                                <p className={"text-sm text-red-500"}>{errors.participants.message}</p>
                            )}
                        </div>

                        <div className="py-2 space-y-1">
                            <div className="flex items-center gap-2">
                                <Label>Max Participants:</Label>
                                <Controller
                                    name="max_participants"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            type="number"
                                            value={field.value}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            className="w-24"
                                        />
                                    )}
                                />
                                {errors.max_participants && (
                                    <p className="text-sm text-red-500">
                                        {errors.max_participants.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="py-2 space-y-1">
                            <div className="flex items-center gap-2">
                                <Label>Retention Days:</Label>
                                <Controller
                                    name="retention"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    )}
                                />
                                {errors.retention && (
                                    <p className="text-sm text-red-500">
                                        {errors.retention.message}
                                    </p>
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                If checked, the messages will be deleted after 1 minutes.
                            </p>
                        </div>

                        <div className="pt-2 space-y-1">
                            <Label>
                                Selected Friends:
                            </Label>
                            <div className="flex flex-wrap gap-2">
                                {selectedParticipants.length > 0 ? (
                                    selectedParticipants.map((participantId) => {
                                        const selectedFriend = myfriends?.find(f => f?.friend?._id === participantId)?.friend;

                                        if (!selectedFriend) return null;

                                        return (
                                            <div
                                                key={participantId}
                                                className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-xl text-sm"
                                            >
                                                <Avatar className="h-4 w-4">
                                                    <AvatarImage src={selectedFriend.avatar || ""} />
                                                    <AvatarFallback>
                                                        {getInitials(`${selectedFriend.firstName} ${selectedFriend.lastName}`)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                {selectedFriend.firstName}
                                                <button
                                                    onClick={() => removeParticipant(participantId)}
                                                    className="hover:bg-blue-100 rounded-full p-0.5"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-muted-foreground text-sm">No friend selected</p>
                                )}
                            </div>
                        </div>
                    </CredenzaBody>

                    <CredenzaFooter className="flex flex-row">
                        <CredenzaClose asChild>
                            <Button variant="secondary" className="w-32">
                                Cancel
                            </Button>
                        </CredenzaClose>
                        <Button
                            onClick={handleSubmit(createChatRoom)}
                            variant="main"
                            className="sm:flex-none flex-1 w-40 font-semibold"
                        >
                            {isSubmitting ? "Creating Room" : "Start Chatting"}
                        </Button>
                    </CredenzaFooter>
                </CredenzaContent>
            </Credenza>
        </div>
    );
}