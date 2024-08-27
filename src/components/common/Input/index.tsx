import { cva } from "class-variance-authority";

const inputVariants = cva("px-4 py-2 border rounded-md focus:outline-none", {
  variants: {
    error: {
      true: "border-red-500",
      false: "border-gray-300",
    },
  },
});

export default inputVariants;
