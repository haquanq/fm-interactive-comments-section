import { commentStore } from "@/stores/commentStore";
import { For, Show, createSignal } from "solid-js";
import { CommentAdd } from "./CommentAdd";
import { CommentCard } from "./CommentCard";

export const CommentSection = () => {
  const [replies, setReplies] = createSignal<{ [key: number]: number[] }>({});

  const processComment = () => {
    const replyMap: { [key: number]: number[] } = {};
    const parentCommentIndices: number[] = [];

    commentStore.comments.forEach((comment, index) => {
      if (comment.parentCommentId != undefined) {
        if (!replyMap[comment.parentCommentId]) {
          replyMap[comment.parentCommentId] = [];
        }
        replyMap[comment.parentCommentId].push(index);
      } else {
        parentCommentIndices.push(index);
      }
    });

    setReplies(replyMap);
    return parentCommentIndices;
  };
  return (
    <div class="space-y-4 tablet:space-y-[1.25rem]">
      <For each={processComment()}>
        {(commentIndex) => (
          <>
            <CommentCard
              commentIndex={commentIndex}
              comment={commentStore.comments[commentIndex]}
            />

            <Show when={replies()[commentStore.comments[commentIndex].id]}>
              <div class="relative pl-4 tablet:pl-[5.5rem]">
                <span class="absolute top-0 bottom-0 left-0 block w-[2px] bg-gray-100 tablet:left-[2.625rem]"></span>
                <div class="space-y-4 tablet:space-y-[1.5rem] ">
                  <For each={replies()[commentStore.comments[commentIndex].id]}>
                    {(replyCommentIndex) => (
                      <CommentCard
                        commentIndex={replyCommentIndex}
                        comment={commentStore.comments[replyCommentIndex]}
                      />
                    )}
                  </For>
                </div>
              </div>
            </Show>
          </>
        )}
      </For>
      <CommentAdd />
    </div>
  );
};
