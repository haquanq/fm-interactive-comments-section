import { For, Show, createSignal } from "solid-js";

import { CommentCard } from "@/components/Comment/CommentCard/CommentCard";
import { CommentDeleteModal } from "@/components/Comment/CommentDeleteModal/CommentDeleteModal";
import { commentStoreState } from "@/stores/commentStore";

import { CommentCreate } from "@/components/Comment/CommentCreate/CommentCreate";

export const Home = () => {
  const [replies, setReplies] = createSignal<{ [key: string]: string[] }>({});

  setReplies(() => {
    const rep: { [key: string]: string[] } = {};

    commentStoreState.comments.forEach((comment) => {
      if (comment.parentId) {
        if (!rep[comment.parentId]) {
          rep[comment.parentId] = [];
        }
        rep[comment.parentId].push(comment.id);
      }
    });
    return rep;
  });

  return (
    <main class="bg-gray-50 min-h-screen py-8 tablet:py-16 leading-none text-body text-blue-200">
      <section class="w-[min(100vw_-_2rem,_45.625rem)] mx-auto">
        <h1 class="absolute opacity-0">Interactive comment section</h1>

        <div class="space-y-4 tablet:space-y-[1.25rem]">
          <For each={commentStoreState.comments.filter((v) => !v.parentId)}>
            {(comment) => (
              <>
                <CommentCard comment={comment} />
                <Show when={replies()[comment.id]}>
                  <div class="relative pl-4 tablet:pl-[5.5rem]">
                    <span class="absolute top-0 bottom-0 left-0 block w-[2px] bg-gray-100 tablet:left-[2.625rem]"></span>
                    <div class="space-y-4 tablet:space-y-[1.5rem] ">
                      <For
                        each={commentStoreState.comments.filter((v) =>
                          replies()[comment.id].includes(v.id),
                        )}
                      >
                        {(childComment) => (
                          <CommentCard comment={childComment} />
                        )}
                      </For>
                    </div>
                  </div>
                </Show>
              </>
            )}
          </For>
          <CommentCreate />
        </div>
        <CommentDeleteModal />
      </section>
    </main>
  );
};
