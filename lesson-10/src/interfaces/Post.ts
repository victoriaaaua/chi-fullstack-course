import { User } from "./User";

export interface Post {
    id: number,
    imageUrl: string,
    description: string,
    user: User,
    commentCount: number,
    createdAt: string
}

