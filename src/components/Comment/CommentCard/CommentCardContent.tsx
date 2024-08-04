import { Button } from "@/components/base/Button";
import { TextArea } from "@/components/base/TextArea";
import { commentStoreAction } from "@/stores/commentStore";
import { userStoreAction } from "@/stores/userStore";
import { createSignal, Show } from "solid-js";

interface CommentCardContentProps {
  commentId: string;
  commentContent: string;
  editingMode: boolean;
}

export const CommentCardContent = (props: CommentCardContentProps) => {
  const { updateComment } = commentStoreAction;
  const { getUserProfile } = userStoreAction;

  const [content, setContent] = createSignal("");

  const highlightEditorUserTags = (str: string) => {
    return str.replace(/\[(@[\w\d]{1,})\]/g, (_, args) => {
      const userId = args.slice(-args.length + 1);
      const userProfile = getUserProfile(userId);
      const textContent = userProfile ? userProfile.username : "not_found";

      return `<a class="text-blue-500 font-medium hover-support:hover:underline transition-colors" href="">@${textContent}</a>`;
    });
  };

  const handleUpdateCommnetContent = () => {
    updateComment({
      id: props.commentId,
      content: content(),
    });
    setContent("");
  };

  const handleEditorContentChange = (
    e: Event & {
      currentTarget: HTMLTextAreaElement;
      target: HTMLTextAreaElement;
    },
  ) => {
    setContent(e.target.value);
  };

  return (
    <Show
      when={props.editingMode}
      fallback={
        <p
          class="leading-paragraph"
          innerHTML={highlightEditorUserTags(props.commentContent)}
        ></p>
      }
    >
      <div class="flex flex-col gap-4 items-end tablet:flex-row w-full">
        <TextArea value={content()} onchange={handleEditorContentChange} />
        <Button onclick={handleUpdateCommnetContent} variant="primary">
          Update
        </Button>
      </div>
    </Show>
  );
};
