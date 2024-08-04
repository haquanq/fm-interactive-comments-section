import { UserComment } from "@/types/UserComment";
import { UserCommentCreateDto } from "@/types/UserCommentCreateDto";
import { UserCommentUpdateDto } from "@/types/UserCommentUpdateDto";
import { createStore } from "solid-js/store";
import { v4 as UUIDv4 } from "uuid";

export enum CommentActionType {
    NONE,
    EDIT,
    REPLY,
    DELETE,
}

type DataMap = { [key: string]: number };

interface CommentStoreState {
    selectedCommentId: string;
    commentActionMode: CommentActionType;
    commentMap: DataMap;
    comments: UserComment[];
}

interface CommentStoreAction {
    setSelectedCommentId: (commentId: string) => void;
    setCommentActionMode: (mode: CommentActionType) => void;
    findCommentIndex: (commentId: string) => number;
    updateComment: (commentUpdateDto: UserCommentUpdateDto) => void;
    createComment: (commentCreateDto: UserCommentCreateDto) => void;
    deleteComment: (commentId: string) => void;
}

const [store, setStore] = createStore<CommentStoreState>({
    selectedCommentId: "",
    commentActionMode: CommentActionType.NONE,
    commentMap: {},
    comments: [
        {
            id: "c4c12b52-f63e-441d-90cc-d8c5267d59b1",
            content:
                "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
            createdAt: "1 month ago",
            score: 12,
            userId: "2",
        },
        {
            id: "f2b005e5-e34a-4f85-b174-471cba89fa5b",
            content:
                "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
            createdAt: "2 weeks ago",
            score: 5,
            userId: "3",
        },
        {
            id: "db121daf-d5cc-42e9-aee6-96af3924efcf",
            parentId: "f2b005e5-e34a-4f85-b174-471cba89fa5b",
            content:
                "[@3] If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            createdAt: "1 week ago",
            score: 4,
            userId: "4",
        },
        {
            id: "057a58d6-2acf-4f78-8ee5-e87331057402",
            parentId: "f2b005e5-e34a-4f85-b174-471cba89fa5b",
            content:
                "[@1] I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            createdAt: "2 days ago",
            score: 2,
            userId: "1",
        },
    ],
});

export const commentStoreState: CommentStoreState = store;

export const commentStoreAction: CommentStoreAction = {
    setSelectedCommentId(commentId: string) {
        setStore("selectedCommentId", commentId);
    },
    setCommentActionMode(mode: CommentActionType) {
        setStore("commentActionMode", mode);
    },
    findCommentIndex(commentId: string): number {
        let idx = store.commentMap[commentId];
        if (!idx) {
            idx = store.comments.findIndex(
                (comment) => comment.id == commentId,
            );
        }
        setStore("commentMap", commentId, idx);
        return idx;
    },

    createComment(commentCreateDto: UserCommentCreateDto) {
        setStore("comments", store.comments.length, {
            id: UUIDv4(),
            ...commentCreateDto,
        });
    },

    updateComment(commentUpdateDto: UserCommentUpdateDto): void {
        const commentIndex = commentStoreAction.findCommentIndex(
            commentUpdateDto.id,
        );
        setStore("comments", commentIndex, { ...commentUpdateDto });
    },

    deleteComment(commentId: string): void {
        setStore("comments", (prev) =>
            prev.filter((comment) => comment.id != commentId),
        );
    },
};
