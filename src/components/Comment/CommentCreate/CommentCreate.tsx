import { Button } from "@/components/base/Button";
import { TextArea } from "@/components/base/TextArea";
import { userStoreState } from "@/stores/userStore";

interface CommentAddProps {}

export function CommentCreate(_: CommentAddProps) {
  const currentUser = userStoreState.currentUser;

  return (
    <form class="mt-2 bg-white rounded-lg p-4 tablet:p-6">
      <div class="flex justify-evenly gap-x-4 items-start">
        <img
          class="hidden w-10 h-10 tablet:block mt-1"
          src={currentUser.image.png}
          alt="Current user avatar"
        />
        <TextArea placeholder="Add a comment..." />
        <Button class="hidden tablet:block" variant="primary">
          Send
        </Button>
      </div>
      <div class="flex justify-between items-center mt-4 tablet:hidden">
        <img
          class="w-8 h-8"
          src={currentUser.image.png}
          alt="Current user avatar"
        />
        <Button variant="primary">Send</Button>
      </div>
    </form>
  );
}
