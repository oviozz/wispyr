
"use client"

import FindFriendsDialog from "@/app/(dashboard)/friends/_components/find-friends-button";
import {useAuth} from "@/hooks/useAuth";
import {useQuery} from "convex/react";
import {Skeleton} from "@/components/ui/skeleton";
import {UserPlus} from "lucide-react";
import FriendCard from "@/app/(dashboard)/friends/_components/friend-card";
import {api} from "../../../../convex/_generated/api";

export default function Friends() {

    const { user } = useAuth();
    const friends = useQuery(api.friends.getAllFriends, {
        userId: user?._id
    });

    const isLoading = friends === undefined;
    const friendCount = friends?.length ?? 0;

    return (
        <div className="p-5 sm:p-8 space-y-5 h-full">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-bold text-2xl">Your Friends</h2>
                    <p className="text-sm text-muted-foreground">
                        {isLoading ? "Loading..." : `${friendCount} added friends`}
                    </p>
                </div>
                <FindFriendsDialog />
            </div>

            <div className="overflow-y-auto h-[calc(100vh-11rem)] hide-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 max-w-screen-2xl">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="p-6 rounded-lg border">
                                <Skeleton className="h-12 w-12 rounded-full mb-4" />
                                <Skeleton className="h-4 w-2/3 mb-2" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                        ))
                    ) : friends === null ? (
                        <div className={"flex items-center justify-center h-screen"}>
                            <p className={"text-sm text-red-500"}>Unable to load friends. Please try again later.</p>
                        </div>
                    ) : friends.length <= 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                            <UserPlus className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="font-semibold text-lg mb-2">No friends added yet</h3>
                            <p className="text-muted-foreground mb-4">
                                Start by finding friends to connect with
                            </p>
                            <FindFriendsDialog />
                        </div>
                    ) : (
                        friends?.map((friend, index) => (
                            <FriendCard
                                key={index}
                                friendId={friend.friendId}
                                friend={friend.friend}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}