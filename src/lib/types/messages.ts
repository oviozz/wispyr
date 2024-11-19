
import {Id} from "../../../convex/_generated/dataModel";


export interface MessageType {
    sender_id: Id<"users">
    chat_room_id: Id<"chat_rooms">
    content: string
    reply_to_id: Id<"messages">
    reactions?: string[]
    is_deleted?: boolean
    _creationTime?: number
}