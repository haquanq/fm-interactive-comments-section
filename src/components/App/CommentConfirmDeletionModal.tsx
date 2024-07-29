import {
  deleteSelectedComment,
  setDeletingCommentId,
} from "@/stores/commentStore";
import { Button } from "../Base/Button";

export const CommentConfirmDeletionModal = () => {
  return (
    <div class="fixed  bg-[rgba(0,0,0,0.4)] inset-0 flex items-center z-50">
      <article class="w-[min(100vw_-_2rem,_25rem)] mx-auto space-y-[1.25rem] bg-white p-8 rounded-lg">
        <h2 class="text-heading-2 font-medium leading-heading text-blue-900">
          Delete comment
        </h2>
        <p class="text-blue-200 text-body leading-paragraph">
          Are you sure you want to delete this comment? This will remove the
          comment and can’t be undone
        </p>
        <div class="flex space-x-[0.875rem]">
          <Button
            class="px-0 w-full pt-[0.9375rem] pb-[1rem]"
            onclick={() => setDeletingCommentId(null)}
            variant="secondary"
          >
            No, cancel
          </Button>
          <Button
            class="px-0 w-full pt-[0.9375rem] pb-[1rem]"
            onclick={() => deleteSelectedComment()}
            variant="danger"
          >
            Yes, delete
          </Button>
        </div>
      </article>
    </div>
  );
};
