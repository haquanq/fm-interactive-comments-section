import { UserProfile } from "./UserProfile";

export type UserComment = {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    parentCommentId?: number;
    replyingTo?: string;
    user: UserProfile;
};
