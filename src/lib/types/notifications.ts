
// types.ts
export interface NotificationType {
    _id: string;
    recipient_id?: string; // who to
    triggered_by: string;
    event_type: EventType;
    content: string;
    is_read: boolean;
    created_at: string;
}

export type EventType = 'FRIEND_ACCEPT' | 'GROUP_INVITATION';

