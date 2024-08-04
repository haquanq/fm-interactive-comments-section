import { userStoreAction } from "@/stores/userStore";
import { Show } from "solid-js";

interface CommentCardPersonProps {
  commentUserId: string;
  commentCreatedAt: string;
  checkCommentBelongToCurrentUser: () => boolean;
}

export const CommentCardPerson = (props: CommentCardPersonProps) => {
  const { getUserProfile } = userStoreAction;

  const userProfile = getUserProfile(props.commentUserId);

  return (
    <div class="flex items-center gap-x-4">
      <img
        class="w-8 h-8"
        src={userProfile.image.webp}
        alt={`${userProfile.username} avatar`}
      />
      <div class="flex items-center gap-x-[1.0625rem] mb-[0.0625rem]">
        <p class="font-medium text-blue-900 flex">
          {userProfile.username}
          <Show when={props.checkCommentBelongToCurrentUser()}>
            <span class="ml-[0.5rem] pt-[0.125rem] pb-[0.25rem] pl-[0.375rem] pr-[0.4375rem] bg-blue-500 text-white text-[0.8125rem]">
              you
            </span>
          </Show>
        </p>
        <p class="creation-time">{props.commentCreatedAt}</p>
      </div>
    </div>
  );
};
