import { userStore } from "@/stores/userStore";
import { Show } from "solid-js";
import { Button } from "../Base/Button";
import { CommentTextbox } from "./CommentTextbox";

interface CommentCardReplyProps {
  inReplyingMode: boolean;
}

export const CommentCardReply = (props: CommentCardReplyProps) => {
  return (
    <Show when={props.inReplyingMode}>
      <div class="mt-2 bg-white rounded-lg p-4 tablet:p-6">
        <div class="flex justify-evenly gap-x-4 items-start">
          <img
            class="hidden w-10 h-10 tablet:block mt-1"
            src={userStore.profile.image.png}
            alt="Current user avatar"
          />
          <Button class="hidden tablet:block" variant="primary">
            Reply
          </Button>
        </div>
        <div>
          <CommentTextbox />
        </div>
        <div class="flex justify-between items-center mt-4 tablet:hidden">
          <img
            class="w-8 h-8"
            src={userStore.profile.image.png}
            alt="Current user avatar"
          />
          <Button variant="primary">Reply</Button>
        </div>
      </div>
    </Show>
  );
};
