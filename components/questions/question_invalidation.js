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
      <button
        onClick={() => {
          start_attempt(573900368, [17, 18]);
        }}
      >
        agdfsgfdfg -
      </button>
      <button
        onClick={() => {
          answer_question(1755947279, ["2005"]);
        }}
      >
        bsagfdfgagdf
      </button>
    </>
  );
}
