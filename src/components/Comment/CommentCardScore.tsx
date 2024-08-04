import { commentStoreAction } from "@/stores/commentStore";
import { userStoreAction, userStoreState } from "@/stores/userStore";
import { cn } from "@/utils/cn";

interface CommentCardScoreProps {
  commentId: string;
  commentScore: number;
}

export const CommentCardScore = (props: CommentCardScoreProps) => {
  const { updateComment } = commentStoreAction;
  const { upvoteComment, downvoteComment } = userStoreAction;

  const handleUpvote = () => {
    const scoreChange = upvoteComment(props.commentId);
    updateComment({
      id: props.commentId,
      score: props.commentScore + scoreChange,
    });
  };

  const handleDownvote = () => {
    const scoreChange = downvoteComment(props.commentId);
    updateComment({
      id: props.commentId,
      score: props.commentScore + scoreChange,
    });
  };

  const getCurrentUserVoteState = () =>
    userStoreState.votedComments[props.commentId];
  const currentUserUpvoted = () => getCurrentUserVoteState() == 1;
  const currentUserDownvoted = () => getCurrentUserVoteState() == -1;

  return (
    <div class="flex items-center text-blue-500 justify-between rounded-lg bg-gray-50 w-[6.25rem] h-[2.5rem] tablet:w-[2.5rem] tablet:h-[6.25rem] tablet:flex-col">
      <button
        class={cn(
          "px-3 active:scale-95 transition-transform h-full group focus-visible:outline-1 focus-visible:outline-blue-500 rounded-inherit tablet:pt-[0.6875rem] tablet:pb-[0.875rem] tablet:h-fit tablet:w-full tablet:px-0 tablet:pl-[1px] tablet:flex tablet:justify-center",
          {},
        )}
        onclick={handleUpvote}
        aria-label="Upvote"
      >
        <svg
          class={cn("group-focus-visible:scale-110 transition-transform", {
            "scale-125": currentUserUpvoted(),
          })}
          width="11"
          height="11"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class={cn(
              "hover-support:group-hover:fill-blue-500 group-focus-visible:fill-blue-500 transition-colors",
              {
                "fill-blue-500": currentUserUpvoted(),
              },
            )}
            d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
            fill="#C5C6EF"
          />
        </svg>
      </button>
      <span class="text-md font-medium" textContent={props.commentScore}></span>
      <button
        class={cn(
          "px-3 active:scale-95 focus-visible:outline-1 focus-visible:outline-blue-500 rounded-inherit transition-transform h-full group tablet:py-4 tablet:h-fit tablet:w-full tablet:px-0 tablet:pl-[1px] tablet:flex tablet:justify-center",
          {},
        )}
        onclick={handleDownvote}
        aria-label="Downvote"
      >
        <svg
          class={cn("group-focus-visible:scale-110 transition-transform", {
            "scale-125": currentUserDownvoted(),
          })}
          width="11"
          height="3"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class={cn(
              "hover-support:group-hover:fill-blue-500 group-focus-visible:fill-blue-500  transition-colors",
              {
                "fill-blue-500": currentUserDownvoted(),
              },
            )}
            d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
            fill="#C5C6EF"
          />
        </svg>
      </button>
    </div>
  );
};
