import { Show } from "solid-js";
import { Button } from "../Base/Button";
import { TextArea } from "../Base/TextArea";

interface CommentCardContentProps {
  commentContent: string;
  commentReplyingTo?: string;
  editingContent: string;
  inEditingMode: boolean;
  handleUpdateContent: () => void;
  handleEditingContentChange: (
    e: Event & {
      currentTarget: HTMLTextAreaElement;
      target: HTMLTextAreaElement;
    },
  ) => void;
}

export const CommentCardContent = (props: CommentCardContentProps) => {
  return (
    <Show
      when={props.inEditingMode}
      fallback={
        <p class="leading-paragraph">
          <Show when={props.commentReplyingTo}>
            <span class="font-medium text-blue-500">
              @{props.commentReplyingTo + " "}
            </span>
          </Show>
          <span>{props.commentContent}</span>
        </p>
      }
    >
      <div class="flex flex-col gap-4 items-end tablet:flex-row w-full">
        <TextArea
          value={props.editingContent}
          onchange={props.handleEditingContentChange}
        />
        <Button onclick={props.handleUpdateContent} variant="primary">
          Update
        </Button>
      </div>
    </Show>
  );
};
