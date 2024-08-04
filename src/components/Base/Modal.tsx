import { JSX, Show, splitProps } from "solid-js";
import { Portal } from "solid-js/web";

interface ModalProps extends JSX.TdHTMLAttributes<HTMLDivElement> {
  open: boolean;
}

export const Modal = (props: ModalProps) => {
  const [, otherProps] = splitProps(props, ["children", "ref", "class"]);

  return (
    <Show when={props.open}>
      <Portal mount={document.body}>
        <div
          class="fixed bg-[rgba(0,0,0,0.4)] inset-0 flex items-center z-50"
          role="dialog"
          aria-modal="true"
          tabIndex={0}
        >
          <div class="w-[min(100vw_-_2rem,_25rem)] mx-auto space-y-[1.25rem] bg-white p-8 rounded-lg">
            {props.children}
          </div>
        </div>
      </Portal>
    </Show>
  );
};
