export type UserComment = {
    id: string;
    parentId?: string;
    content: string;
    createdAt: string;
    score: number;
    userId: string;
};
