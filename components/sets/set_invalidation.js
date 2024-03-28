"use client";
import { invalidate_set } from "@/app/actions";

export default function SetInvalidation({ id }) {
  return (
    <button
      onClick={() => {
        invalidate_set(id);
      }}
    >
      invalidate this set
    </button>
  );
}
