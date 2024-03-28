"use client";
import { useState } from "react";
import MultiInput from "../multi_input";
import Button from "../button";
import { answer_question } from "@/app/actions";

export default function ListQuestion({ question, attempt_id }) {
  const [answers, setAnswers] = useState([""]);
  return (
    <div>
      <h1>{question}</h1>
      <MultiInput value={answers} setValue={setAnswers}>
        Odpowiedzi
      </MultiInput>
      <Button
        onClick={() => {
          answer_question(attempt_id, answers);
        }}
      >
        Odpowiedz
      </Button>
    </div>
  );
}
