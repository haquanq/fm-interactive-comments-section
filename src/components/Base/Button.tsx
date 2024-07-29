import { cn } from "@/utils/cn";
import { splitProps, type JSX } from "solid-js";

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "danger";
}

export function Button(props: ButtonProps) {
  const [_, otherProps] = splitProps(props, ["class", "children"]);

  return (
    <button
      class={cn(
        `focus-vi pt-[0.9375rem] pb-[1rem] w-[6.5rem] rounded-lg text-white text-[1.0625rem] font-medium cursor-pointer hover-support:hover:opacity-50 border-none uppercase active:scale-95 transition-all tracking-main`,
        {
          "bg-blue-500": props.variant == "primary",
          "bg-blue-200": props.variant == "secondary",
          "bg-red-500": props.variant == "danger",
        },
        props.class,
      )}
      {...otherProps}
    >
      {props.children}
    </button>
  );
}
