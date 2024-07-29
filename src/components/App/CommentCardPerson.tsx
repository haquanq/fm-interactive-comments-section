import { Show } from "solid-js";

interface CommentCardPersonProps {
  personAvatar: string;
  personUsername: string;
  commentCreatedAt: string;
  checkCommentBelongToCurrentUser: () => boolean;
}

export const CommentCardPerson = (props: CommentCardPersonProps) => {
  return (
    <div class="flex items-center gap-x-4">
      <img
        class="w-8 h-8"
        src={props.personAvatar}
        alt={`${props.personUsername} avatar`}
      />
      <div class="flex items-center gap-x-[1.0625rem] mb-[0.0625rem]">
        <p class="font-medium text-blue-900 flex">
          {props.personUsername}
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
