import { Show } from "solid-js";
import { CommentConfirmDeletionModal } from "./components/App/CommentConfirmDeletionModal";
import { CommentSection } from "./components/App/CommentSection";
import { commentStore } from "./stores/commentStore";

function App() {
  return (
    <>
      <main class="bg-gray-50 min-h-screen py-8 tablet:py-16 leading-none text-body text-blue-200">
        <section class="w-[min(100vw_-_2rem,_45.625rem)] mx-auto">
          <h1 class="absolute opacity-0">Interactive comment section</h1>
          <CommentSection />
          <Show when={commentStore.deletingCommentId != null}>
            <CommentConfirmDeletionModal />
          </Show>
        </section>
      </main>
    </>
  );
}

export default App;
