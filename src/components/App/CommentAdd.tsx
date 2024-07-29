import { userStore } from "@/stores/userStore";
import { Button } from "../Base/Button";
import { TextArea } from "../Base/TextArea";

interface CommentAddProps {}

export function CommentAdd(props: CommentAddProps) {
  return (
    <div class="mt-2 bg-white rounded-lg p-4 tablet:p-6">
      <div class="flex justify-evenly gap-x-4 items-start">
        <img
          class="hidden w-10 h-10 tablet:block mt-1"
          src={userStore.profile.image.png}
          alt="Current user avatar"
        />
        <TextArea placeholder="Add a comment..." />
        <Button class="hidden tablet:block" variant="primary">
          Reply
        </Button>
      </div>
      <div class="flex justify-between items-center mt-4 tablet:hidden">
        <img
          class="w-8 h-8"
          src={userStore.profile.image.png}
          alt="Current user avatar"
        />
        <Button variant="primary">Send</Button>
      </div>
    </div>
  );
}
