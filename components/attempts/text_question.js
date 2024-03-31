"use client";
import { useState } from "react";
import Input from "../input";
import Button from "../button";
import { answer_question } from "@/app/actions";
import BasicInput from "../basic_input";

function make_basic_string(s1) {
  return s1
    .toLowerCase()
    .replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, "")
    .replace("ę", "e")
    .replace("ó", "o")
    .replace("ą", "a")
    .replace("ś", "s")
    .replace("ł", "l")
    .replace("ż", "z")
    .replace("ź", "z")
    .replace("ń", "n")
    .replace("ć", "c");
}

export default function TextQuestion({ question, attempt_id, prevalidated }) {
  const [answer, setAnswer] = useState("");
  const [showStatus, setShowStatus] = useState(0);
  return (
    <>
      {showStatus == 0 && (
        <div>
          <h1>{question}</h1>
          <BasicInput value={answer} setValue={setAnswer} id="odp" />
          <Button
            onClick={() => {
              let question_correct = false;
              const result1 = make_basic_string(answer);
              const result2 = prevalidated.map((prev) =>
                make_basic_string(prev)
              );
              if (result2.includes(result1)) {
                question_correct = true;
              }
              if (question_correct) {
                setShowStatus(1);
              } else {
                setShowStatus(2);
              }
              answer_question(attempt_id, question_correct);
            }}
          >
            Odpowiedz
          </Button>
        </div>
      )}
      {showStatus == 1 && <h1>Poprawna odpowiedź</h1>}
      {showStatus == 2 && <h1>Niepoprawna odpowiedź</h1>}
    </>
  );
}
