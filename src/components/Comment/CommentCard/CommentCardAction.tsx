import { IconDelete, IconEdit, IconReply } from "@/assets/icons";
import { Show } from "solid-js";

interface CommentCardActioProps {
  checkCommentBelongToCurrentUser: () => boolean;
  handleReplyButtonClick: () => void;
  handleDeleteButtonClick: () => void;
  handleEditButtonClick: () => void;
}

export const CommentCardAction = (props: CommentCardActioProps) => {
  return (
    <div class="flex gap-x-4 tablet:gap-x-[1.5625rem] pr-[0.0625rem]">
      <Show
        when={props.checkCommentBelongToCurrentUser()}
        fallback={
          <button
            class="focus-outline hover-support:hover:opacity-50 active:scale-95 [transition:transform_200ms_ease] font-medium gap-2 flex items-center text-blue-500"
            onclick={props.handleReplyButtonClick}
          >
            <img src={IconReply} alt="Reply icon" aria-hidden="true" />
            <span class="pb-[0.0625rem]">Reply</span>
          </button>
        }
      >
        <button
          class="focus-outline hover-support:hover:opacity-50 active:scale-95 [transition:transform_200ms_ease] font-medium gap-2 flex items-center text-red-500"
          onclick={props.handleDeleteButtonClick}
        >
          <img src={IconDelete} alt="Delete icon" aria-hidden="true" />
          <span class="pb-[0.0625rem]">Delete</span>
        </button>
        <button
          class="focus-outline hover-support:hover:opacity-50 active:scale-95 [transition:transform_200ms_ease] font-medium gap-2 flex items-center text-blue-500"
          onclick={props.handleEditButtonClick}
        >
          <img src={IconEdit} alt="Edit icon" aria-hidden="true" />
          <span class="pb-[0.0625rem]">Edit</span>
        </button>
      </Show>
    </div>
  );
};
