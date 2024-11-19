
import {Id} from "../../../convex/_generated/dataModel";

export interface User {
    _id: Id<"users">
    _creationTime: number
    firstName: string
    lastName: string
    email: string
    password?: string
    avatar?: string | null
    isOnline?: boolean | undefined
}
