import { UserProfile } from "@/types/UserProfile";
import { createStore } from "solid-js/store";

interface UserStoreState {
    profile: UserProfile;
}

export const [userStore, setUserStore] = createStore<UserStoreState>({
    profile: {
        image: {
            png: "./images/avatars/image-juliusomo.png",
            webp: "./images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
    },
});
