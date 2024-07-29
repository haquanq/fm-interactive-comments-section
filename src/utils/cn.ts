import clsx, { ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customMerge = extendTailwindMerge({
    classGroups: {
        "font-size": [
            {
                text: [
                    "heading-l",
                    "heading-xl",
                    "heading-m",
                    "heading-s",
                    "body-m",
                    "body-l",
                ],
            },
        ],
        "bg-image": [
            {
                bg: ["checked-icon"],
            },
        ],
    },
});

export function cn(...classes: ClassValue[]) {
    return customMerge(clsx(classes));
}
