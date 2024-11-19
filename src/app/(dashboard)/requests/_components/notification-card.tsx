
import {Card, CardContent} from "@/components/ui/card";
import React from "react";
import {NotificationType} from "@/lib/types/notifications";
import {Button} from "@/components/ui/button";
import {Bell, Check, UserPlus, Users} from "lucide-react";
import {formatTimeAgo} from "@/lib/utils";

interface NotificationCardProps {
    notification: NotificationType
}
export default function NotificationCard({notification}: NotificationCardProps){

    return (
        <Card className={`rounded-md mb-4 shadow-none transition-all duration-200 ${!notification.is_read ? 'border-l-4 border-l-blue-500' : ''}`}>
            <CardContent className="p-4 ">
                <div className="flex items-start gap-4">
                    <div className="rounded-full bg-gray-50 p-2">
                        {getIcon(notification.event_type)}
                    </div>

                    <div className="flex-1 w-full">
                        <div className="flex items-start justify-between gap-2">
                            <p className="font-medium text-muted-foreground">
                                {notification.content}
                            </p>
                            <span className="sm:block hidden text-sm text-gray-500 whitespace-nowrap">
                                {formatTimeAgo(notification.created_at)}
                            </span>
                        </div>

                        {!notification.is_read && (
                            <div className="ml-auto mt-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-sm"
                                >
                                    <Check className="mr-1 h-4 w-4" />
                                    Mark as read
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )

}

const getIcon = (event_type: string) => {
    switch (event_type) {
        case 'FRIEND_ACCEPT':
            return <UserPlus className="h-7 w-7 text-blue-500" />;
        case 'GROUP_INVITATION':
            return <Users className="h-7 w-7 text-green-500" />;
        default:
            return <Bell className="h-7 w-7 text-gray-500" />;
    }
};