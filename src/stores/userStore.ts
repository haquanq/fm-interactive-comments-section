import { UserProfile } from "@/types/UserProfile";
import { createStore } from "solid-js/store";

interface UserStoreState {
    users: UserProfile[];
    userMap: { [key: string]: number };
    currentUser: UserProfile;
    votedComments: { [key: string]: number };
}

interface UserStoreAction {
    getUserProfile: (userId: string) => UserProfile;
    findUserIndex: (userId: string) => number;
    upvoteComment: (commentId: string) => number;
    downvoteComment: (commentId: string) => number;
}

const [store, setStore] = createStore<UserStoreState>({
    userMap: {},
    users: [
        {
            id: "1",
            image: {
                png: "./images/avatars/image-juliusomo.png",
                webp: "./images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
        },
        {
            id: "2",

            image: {
                png: "./images/avatars/image-amyrobson.png",
                webp: "./images/avatars/image-amyrobson.webp",
            },
            username: "amyrobson",
        },
        {
            id: "3",
            image: {
                png: "./images/avatars/image-maxblagun.png",
                webp: "./images/avatars/image-maxblagun.webp",
            },
            username: "maxblagun",
        },
        {
            id: "4",
            image: {
                png: "./images/avatars/image-ramsesmiron.png",
                webp: "./images/avatars/image-ramsesmiron.webp",
            },
            username: "ramsesmiron",
        },
    ],
    currentUser: {
        id: "1",
        image: {
            png: "./images/avatars/image-juliusomo.png",
            webp: "./images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
    },
    votedComments: {},
});

export const userStoreState: UserStoreState = store;

export const userStoreAction: UserStoreAction = {
    upvoteComment: function (commentId: string): number {
        const downvoted =
            store.votedComments[commentId] &&
            store.votedComments[commentId] == 1;

        const val = downvoted ? 0 : 1;

        setStore("votedComments", (prev) => ({
            ...prev,
            [commentId]: val,
        }));

        return val == 0 ? -1 : val;
    },
    downvoteComment: function (commentId: string): number {
        const upvoted =
            store.votedComments[commentId] &&
            store.votedComments[commentId] == -1;

        const val = upvoted ? 0 : -1;

        setStore("votedComments", (prev) => ({
            ...prev,
            [commentId]: val,
        }));

        return val == 0 ? 1 : val;
    },
    findUserIndex(userId: string): number {
        let idx = store.userMap[userId];
        if (!idx) {
            idx = store.users.findIndex((user) => user.id == userId);
        }
        setStore("userMap", userId, idx);
        return idx;
    },

    getUserProfile(userId: string): UserProfile {
        const userIndex = userStoreAction.findUserIndex(userId);
        return store.users[userIndex];
    },
};
