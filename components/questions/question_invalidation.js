"use client";
import { invalidate_question } from "@/app/actions";
import { TrashIcon } from "@radix-ui/react-icons";

export default function QuestionInvalidation({ id, set_id }) {
  return (
    <>
      <button
        onClick={() => {
          invalidate_question(id, set_id);
        }}
      >
        <TrashIcon />
      </button>
    </>
  );
}
