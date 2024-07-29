import { cn } from "@/utils/cn";
import { JSX, onMount, splitProps } from "solid-js";
interface TextAreaProps
  extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = (props: TextAreaProps) => {
  const [, otherProps] = splitProps(props, ["class", "ref"]);

  const handleOnInput = (
    e: Event & {
      currentTarget: HTMLTextAreaElement;
      target: HTMLTextAreaElement;
    },
  ) => {
    e.target.style.height = "auto";
    e.target.style.height = `calc(${e.target.scrollHeight}rem / 16)`;
  };

  let inputRef: HTMLTextAreaElement | undefined;

  onMount(() => {
    if (inputRef) {
      inputRef.style.height = `calc(${inputRef.scrollHeight}rem / 16)`;
    }
  });

  return (
    <textarea
      {...otherProps}
      ref={inputRef}
      onInput={handleOnInput}
      class={cn(
        `focus-vi rounded-lg overflow-hidden w-full min-h-[6rem] text-blue-900 block border resize-none border-gray-100 leading-paragraph py-[0.6875rem] px-[1.4375rem] hover-support:hover:border-blue-500 transition-colors `,
        props.class,
      )}
    ></textarea>
  );
};
