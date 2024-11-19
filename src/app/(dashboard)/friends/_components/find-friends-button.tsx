
"use client"

import React, { useState } from 'react';
import {
    Credenza,
    CredenzaBody,
    CredenzaClose,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger
} from "@/components/ui/credenza";
import { UserSearch, Loader2, UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import FriendRequestItem from "@/app/(dashboard)/friends/_components/friend-request-item";
import {api} from "../../../../../convex/_generated/api";
import {  useQuery } from "convex/react";
import {useAuth} from "@/hooks/useAuth";

export default function FindFriendsDialog() {

    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const allUsers = useQuery(api.users.getAllUsers, {
        userId: user?._id
    });

    const allInvites = useQuery(api.invites.getAllInvites, {
        userId: user?._id
    });

    const allFriends = useQuery(api.friends.getAllFriends, {
        userId: user?._id
    });

    const filteredFriends = allUsers?.filter(friend => {
        const fullName = `${friend.firstName} ${friend.lastName} ${friend.email}`;
        return fullName.toLowerCase().includes(searchQuery.toLowerCase())
    });

    // Simulate loading when searching
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchQuery(value);
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 200);
    };

    return (
        <div className="bg-background">
            <Credenza>
                <CredenzaTrigger asChild>
                    <Button variant="main" className="gap-2 hover:opacity-90 transition-opacity">
                        <UserPlus className="w-4 h-4" />
                        Find Friends
                    </Button>
                </CredenzaTrigger>

                <CredenzaContent className="max-w-xl">
                    <CredenzaHeader className="space-y-1">
                        <CredenzaTitle>Find Friends</CredenzaTitle>
                        <CredenzaDescription>
                            Search and connect with friends to start chatting
                        </CredenzaDescription>
                    </CredenzaHeader>

                    <CredenzaBody className="space-y-7 py-2">
                        <div className="space-y-2">
                            <Label htmlFor="search" className="text-sm font-medium">
                                Search For Friends
                            </Label>
                            <div className="relative">
                                <UserSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="search"
                                    className="pl-9"
                                    placeholder="Enter friend's name..."
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">Find Friends</Label>
                                <span className="text-xs text-muted-foreground">
                                  {filteredFriends && filteredFriends.length || 0} found
                                </span>
                            </div>

                            <div className={"h-[280px]"}>
                                {isLoading || allUsers === undefined ? (
                                    <div className="flex justify-center py-8">
                                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                                    </div>
                                ) : filteredFriends && filteredFriends.length > 0 ? (
                                    <ScrollArea className="pr-4 h-full">
                                        <ul className="space-y-2">
                                            {filteredFriends.map((friend, index) => {
                                                const requested_invite_id = allInvites?.find((id) => id?.invite_user === friend._id) || null;
                                                const isFriend = allFriends?.some(
                                                    friendRecord => friendRecord?.friend?._id === friend._id
                                                );
                                                return (
                                                    <FriendRequestItem
                                                        key={index}
                                                        userId={user?._id}
                                                        friend_info={friend}
                                                        hasRequested={!!requested_invite_id}
                                                        requested_invite_id={requested_invite_id?.invite_id}
                                                        isFriend={isFriend}
                                                    />
                                                )
                                            })}
                                        </ul>
                                    </ScrollArea>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <Users className="w-10 h-10 text-muted-foreground/50 mb-3" />
                                        <p className="text-muted-foreground font-medium">No friends found</p>
                                        <p className="text-sm text-muted-foreground">
                                            Try searching with a different name
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CredenzaBody>

                    <CredenzaFooter className="flex justify-end">
                        <CredenzaClose asChild>
                            <Button variant="outline" className="w-full sm:w-auto">
                                Done
                            </Button>
                        </CredenzaClose>
                    </CredenzaFooter>
                </CredenzaContent>
            </Credenza>
        </div>
    );
}