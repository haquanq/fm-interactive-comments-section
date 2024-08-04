import { Button } from "@/components/base/Button";
import { Modal } from "@/components/base/Modal";

import {
  CommentActionType,
  commentStoreAction,
  commentStoreState,
} from "@/stores/commentStore";

export const CommentDeleteModal = () => {
  const { selectedCommentId: deleteCommentId } = commentStoreState;
  const { deleteComment, setSelectedCommentId: setDeleteCommentId } =
    commentStoreAction;

  const handleDeleteButtonClick = () => {
    deleteComment(deleteCommentId);
  };

  const handleCancelButtonClick = () => {
    setDeleteCommentId("");
  };

  const deletingComment = () =>
    commentStoreState.selectedCommentId != "" &&
    commentStoreState.commentActionMode == CommentActionType.DELETE;

  return (
    <Modal open={deletingComment()}>
      <article class="space-y-[1.25rem]">
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
            onclick={handleCancelButtonClick}
            variant="secondary"
          >
            No, cancel
          </Button>
          <Button
            class="px-0 w-full pt-[0.9375rem] pb-[1rem]"
            onClick={handleDeleteButtonClick}
            variant="danger"
          >
            Yes, delete
          </Button>
        </div>
      </article>
    </Modal>
  );
};
