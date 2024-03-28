"use client";
import { invalidate_question } from "@/app/actions";
import { answer_question } from "@/app/actions";

export default function QuestionInvalidation({ id, set_id }) {
  return (
    <>
      <button
        onClick={() => {
          invalidate_question(id, set_id);
        }}
      >
        -
      </button>
    </>
  );
}
