import { Button } from "@/components/base/Button";
import { TextEditor } from "@/components/base/TextEditor";
import { userStoreState } from "@/stores/userStore";
import { Show } from "solid-js";

interface CommentCardReplyProps {
  open: boolean;
}

export const CommentCardReply = (props: CommentCardReplyProps) => {
  const { currentUser } = userStoreState;
  return (
    <Show when={props.open}>
      <div class="mt-2 bg-white rounded-lg p-4 tablet:p-6">
        <div class="flex justify-evenly gap-x-4 items-start">
          <img
            class="hidden w-10 h-10 tablet:block mt-1"
            src={currentUser.image.png}
            alt="Current user avatar"
          />
          <TextEditor />
          <Button class="hidden tablet:block" variant="primary">
            Reply
          </Button>
        </div>
        <div class="flex justify-between items-center mt-4 tablet:hidden">
          <img
            class="w-8 h-8"
            src={currentUser.image.png}
            alt="Current user avatar"
          />
          <Button variant="primary">Reply</Button>
        </div>
      </div>
    </Show>
  );
};
