"use client";
import { invalidate_set } from "@/app/actions";
import { TrashIcon } from "@radix-ui/react-icons";

export default function SetInvalidation({ id }) {
  return (
    <button
      onClick={() => {
        invalidate_set(id);
      }}
      className="p-2 pr-0"
    >
      <TrashIcon />
    </button>
  );
}
