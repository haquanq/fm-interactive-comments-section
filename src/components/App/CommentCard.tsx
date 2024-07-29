import {
  decreaseCommentScore,
  increaseCommentScore,
  setDeletingCommentId,
  updateComment,
} from "@/stores/commentStore";
import { userStore } from "@/stores/userStore";
import { UserComment } from "@/types/UserComment";
import { createSignal } from "solid-js";
import { CommentCardAction } from "./CommentCardAction";
import { CommentCardContent } from "./CommentCardContent";
import { CommentCardPerson } from "./CommentCardPerson";
import { CommentCardReply } from "./CommentCardReply";
import { CommentCardScore } from "./CommentCardScore";

interface CommentCardProps {
  comment: UserComment;
  commentIndex: number;
}
export function CommentCard(props: CommentCardProps) {
  const [meReplying, setMeReplying] = createSignal(false);
  const [editing, setEditing] = createSignal({
    state: false,
    content: "",
  });
  const checkCommentBelongToCurrentUser = () =>
    userStore.profile.username == props.comment.user.username;
  const handleReplyClick = () => {
    setMeReplying((v) => !v);
  };
  const handleEditClick = () => {
    setEditing((v) => {
      if (v.state) return { state: false, content: "" };
      return {
        state: true,
        content: `@${props.comment.replyingTo} ${props.comment.content}`,
      };
    });
  };
  const handleEditingContentChange = (
    e: Event & {
      currentTarget: HTMLTextAreaElement;
      target: HTMLTextAreaElement;
    },
  ) => {
    console.log(e.currentTarget.value);
    setEditing((v) => ({
      ...v,
      content: e.currentTarget.value,
    }));
  };
  const handleDeleteClick = () => {
    setDeletingCommentId(props.comment.id);
  };
  const handleUpdateContent = () => {
    updateComment(props.commentIndex, editing().content);
    setEditing({ state: false, content: "" });
  };
  const handleScoreDecrement = () => {
    decreaseCommentScore(props.commentIndex);
  };
  const handleScoreIncrement = () => {
    increaseCommentScore(props.commentIndex);
  };

  return (
    <div>
      <article class="p-4 bg-white rounded-lg tablet:p-6 tablet:pb-[1.5625rem] flex gap-x-6">
        <div class="hidden tablet:block">
          <CommentCardScore
            handleScoreDecrement={handleScoreDecrement}
            handleScoreIncrement={handleScoreIncrement}
            score={props.comment.score.toString()}
          />
        </div>
        <div class="w-full">
          <div class="flex items-center justify-between mb-4 tablet:mb-[0.875rem]">
            <CommentCardPerson
              checkCommentBelongToCurrentUser={checkCommentBelongToCurrentUser}
              commentCreatedAt={props.comment.createdAt}
              personAvatar={props.comment.user.image.webp}
              personUsername={props.comment.user.username}
            />
            <div class="hidden tablet:block">
              <CommentCardAction
                checkCommentBelongToCurrentUser={
                  checkCommentBelongToCurrentUser
                }
                whenDeleteClick={handleDeleteClick}
                whenEditClick={handleEditClick}
                whenReplyClick={handleReplyClick}
              />
            </div>
          </div>
          <CommentCardContent
            commentContent={props.comment.content}
            commentReplyingTo={props.comment.replyingTo}
            inEditingMode={editing().state}
            editingContent={editing().content}
            handleEditingContentChange={handleEditingContentChange}
            handleUpdateContent={handleUpdateContent}
          />
          <div class="flex items-center justify-between mt-4 tablet:hidden">
            <CommentCardScore
              handleScoreDecrement={handleScoreDecrement}
              handleScoreIncrement={handleScoreIncrement}
              score={props.comment.score.toString()}
            />
            <CommentCardAction
              checkCommentBelongToCurrentUser={checkCommentBelongToCurrentUser}
              whenDeleteClick={handleDeleteClick}
              whenEditClick={handleEditClick}
              whenReplyClick={handleReplyClick}
            />
          </div>
        </div>
      </article>
      <CommentCardReply inReplyingMode={meReplying()} />
    </div>
  );
}
