"use client";
import { start_attempt } from "@/app/actions";
import Button from "../button";
export default function StartAttemptButton({ set_id, questions_in_set }) {
  return (
    <Button
      onClick={() => {
        start_attempt(set_id, questions_in_set);
      }}
    >
      Rozpocznij quiz
    </Button>
  );
}
