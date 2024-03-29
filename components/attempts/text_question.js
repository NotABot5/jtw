"use client";
import { useState } from "react";
import Input from "../input";
import Button from "../button";
import { answer_question } from "@/app/actions";

export default function TextQuestion({ question, attempt_id }) {
  const [answer, setAnswer] = useState("");
  return (
    <div>
      <h1>{question}</h1>
      <Input value={answer} setValue={setAnswer} id="odp">
        Odpowiedź
      </Input>
      <Button
        onClick={() => {
          answer_question(attempt_id, answer);
        }}
      >
        Odpowiedz
      </Button>
    </div>
  );
}
