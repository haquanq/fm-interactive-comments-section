import { DOMElement } from "solid-js/jsx-runtime";

import { cn } from "@/utils/cn";
import { JSX, onMount } from "solid-js";
interface TextAreaProps
  extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextEditor = (props: TextAreaProps) => {
  let inputRef!: HTMLDivElement;

  const handleKeydown = (
    e: KeyboardEvent & {
      currentTarget: HTMLDivElement;
      target: DOMElement;
    },
  ) => {
    return;
    if (e.key == "@") {
      console.log(window.getSelection()?.getRangeAt(0).getBoundingClientRect());
    }
  };

  const handleKeyup = (
    e: KeyboardEvent & {
      currentTarget: HTMLDivElement;
      target: DOMElement;
    },
  ) => {
    console.log(window.getSelection()?.getRangeAt(0).getBoundingClientRect());

    const range = document.createRange();
    range.selectNodeContents(e.currentTarget);

    console.log(range);

    e.target.innerHTML = e.target.innerHTML.replace(
      /(@[\w\d]{1,})/g,
      `<span class="user-tag">$1</span>`,
    );
  };

  onMount(() => {
    inputRef.style.height = `calc(${inputRef.scrollHeight}rem / 16)`;
  });

  return (
    <div
      contentEditable
      ref={inputRef}
      onkeydown={handleKeydown}
      onkeyup={handleKeyup}
      class={cn(
        `focus-outline rounded-lg overflow-hidden w-full min-h-[6rem] text-blue-900 block border resize-none border-gray-100 leading-paragraph py-[0.6875rem] px-[1.4375rem] hover-support:hover:border-blue-500 transition-colors `,
        props.class,
      )}
    ></div>
  );
};
