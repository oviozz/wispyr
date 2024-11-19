
"use client"

import React, { useState } from 'react';
import {
    Bell,
} from 'lucide-react';
import {sampleNotifications} from "@/data/sample-notification";
import {Button} from "@/components/ui/button";
import NotificationCard from "@/app/(dashboard)/requests/_components/notification-card";
import {NotificationType} from "@/lib/types/notifications";

export default function NotificationPage(){

    const [notifications,] = useState<NotificationType[]>(sampleNotifications);

    return (
        <div className="h-full p-5 md:p-8 ov">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Notifications</h1>
                    <p className="text-sm text-muted-foreground">
                        3 unread notifications
                    </p>
                </div>
                { sampleNotifications.length && (
                    <Button variant={"main"}>
                        Mark all as read
                    </Button>
                )}
            </div>

            {notifications.length > 0 ? (
                <div className={"h-[calc(100vh-11rem)] overflow-y-auto hide-scrollbar"}>
                    <ul className={"space-y-4"}>
                        {notifications.map((notification) => (
                            <li key={notification._id}>
                                <NotificationCard
                                    notification={notification}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="flex justify-center pt-10">
                    <div className="flex flex-col items-center justify-center text-center">
                        <Bell className="h-10 w-10" />
                        <h3 className="mt-2 font-semibold">No notifications</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {"When you get notifications, they'll show up here"}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};