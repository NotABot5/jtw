"use client";
import { start_attempt } from "@/app/actions";
import Button from "../button";
export default function StartAttemptButton({
  set_id,
  questions_in_set,
  button_text = "Rozpocznij quiz",
  full_answers = false,
}) {
  return (
    <Button
      onClick={() => {
        start_attempt(set_id, questions_in_set, full_answers);
      }}
      autoFocus
    >
      {button_text}
    </Button>
  );
}
