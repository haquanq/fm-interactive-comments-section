import {
  CommentActionType,
  commentStoreAction,
  commentStoreState,
} from "@/stores/commentStore";
import { userStoreState } from "@/stores/userStore";
import { UserComment } from "@/types/UserComment";
import { CommentCardAction } from "./CommentCardAction";
import { CommentCardContent } from "./CommentCardContent";
import { CommentCardPerson } from "./CommentCardPerson";
import { CommentCardReply } from "./CommentCardReply";
import { CommentCardScore } from "./CommentCardScore";

interface CommentCardProps {
  comment: UserComment;
}

export function CommentCard(props: CommentCardProps) {
  const { setCommentActionMode, setSelectedCommentId } = commentStoreAction;

  const isReplyMode = () => {
    return (
      commentStoreState.selectedCommentId == props.comment.id &&
      commentStoreState.commentActionMode == CommentActionType.REPLY
    );
  };

  const isEditMode = () => {
    return (
      commentStoreState.selectedCommentId == props.comment.id &&
      commentStoreState.commentActionMode == CommentActionType.EDIT
    );
  };

  const checkCommentBelongToCurrentUser = () =>
    userStoreState.currentUser.id == props.comment.userId;

  const handleReplyButtonClick = () => {
    setCommentActionMode(CommentActionType.REPLY);
    setSelectedCommentId(props.comment.id);
  };

  const handleEditButtonClick = () => {
    setCommentActionMode(CommentActionType.EDIT);
    setSelectedCommentId(props.comment.id);
  };

  const handleDeleteButtonClick = () => {
    setCommentActionMode(CommentActionType.DELETE);
    setSelectedCommentId(props.comment.id);
  };

  return (
    <div>
      <article class="p-4 bg-white rounded-lg tablet:p-6 tablet:pb-[1.5625rem] flex gap-x-6">
        <div class="hidden tablet:block">
          <CommentCardScore
            commentId={props.comment.id}
            commentScore={props.comment.score}
          />
        </div>
        <div class="w-full">
          <div class="flex items-center justify-between mb-4 tablet:mb-[0.875rem]">
            <CommentCardPerson
              checkCommentBelongToCurrentUser={checkCommentBelongToCurrentUser}
              commentUserId={props.comment.userId}
              commentCreatedAt={props.comment.createdAt}
            />
            <div class="hidden tablet:block">
              <CommentCardAction
                checkCommentBelongToCurrentUser={
                  checkCommentBelongToCurrentUser
                }
                handleDeleteButtonClick={handleDeleteButtonClick}
                handleEditButtonClick={handleEditButtonClick}
                handleReplyButtonClick={handleReplyButtonClick}
              />
            </div>
          </div>
          <CommentCardContent
            commentId={props.comment.id}
            commentContent={props.comment.content}
            editingMode={isEditMode()}
          />
          <div class="flex items-center justify-between mt-4 tablet:hidden">
            <CommentCardScore
              commentId={props.comment.id}
              commentScore={props.comment.score}
            />
            <CommentCardAction
              checkCommentBelongToCurrentUser={checkCommentBelongToCurrentUser}
              handleDeleteButtonClick={handleDeleteButtonClick}
              handleEditButtonClick={handleEditButtonClick}
              handleReplyButtonClick={handleReplyButtonClick}
            />
          </div>
        </div>
      </article>
      <CommentCardReply open={isReplyMode()} />
    </div>
  );
}
