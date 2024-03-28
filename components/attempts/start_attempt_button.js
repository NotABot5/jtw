"use client";
import { start_attempt } from "@/app/actions";
export default function StartAttemptButton({ set_id, questions_in_set }) {
  return (
    <button
      onClick={() => {
        start_attempt(set_id, questions_in_set);
      }}
    >
      start attempt
    </button>
  );
}
