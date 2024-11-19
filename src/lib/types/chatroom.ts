
import {Id} from "../../../convex/_generated/dataModel";

export interface ChatRoomType {
    _id: Id<"chat_rooms">;
    _creationTime: number;
    max_participants?: number;
    lastMessageId?: Id<"messages">;
    retention?: boolean;
    room_name: string;
    admin_id: Id<"users">;
}
