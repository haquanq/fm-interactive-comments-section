export type UserCommentCreateDto = {
    parentId: string;
    content: string;
    createdAt: string;
    score: number;
    userId: string;
};
