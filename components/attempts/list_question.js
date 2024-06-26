"use client";
import { useState, useEffect } from "react";
import Button from "../button";
import { answer_question } from "@/app/actions";
import BasicInput from "../basic_input";

function make_basic_string(s1) {
  return s1
    .toLowerCase()
    .replaceAll(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, "")
    .replaceAll("ę", "e")
    .replaceAll("ó", "o")
    .replaceAll("ą", "a")
    .replaceAll("ś", "s")
    .replaceAll("ł", "l")
    .replaceAll("ż", "z")
    .replaceAll("ź", "z")
    .replaceAll("ń", "n")
    .replaceAll("ć", "c")
    .replaceAll("ü", "u");
}

export default function ListQuestion({
  question,
  attempt_id,
  prevalidated,
  setAnswered,
  setShowStatus,
  setPreviousAnswer,
  setGiven,
}) {
  const [answer, setAnswer] = useState("");
  const submission = () => {
    let question_correct = false;
    const result1 = answer
      .split(",")
      .map((prev) => make_basic_string(prev))
      .sort();
    console.log(result1);
    const result2 = prevalidated.map((prev) => make_basic_string(prev)).sort();
    console.log(result2);
    if (JSON.stringify(result1) == JSON.stringify(result2)) {
      question_correct = true;
    }
    if (question_correct) {
      setShowStatus(1);
    } else {
      setShowStatus(2);
    }
    setGiven(answer);
    let pv = "";
    prevalidated.forEach((prev) => {
      pv += prev;
      pv += ", ";
    });
    setPreviousAnswer(pv.substring(0, pv.length - 2));
    answer_question(attempt_id, question_correct);
    setAnswered((prev) => {
      return prev + 1;
    });
  };
  useEffect(() => {
    setAnswer("");
  }, [question]);
  useEffect(() => {
    const ls = (event) => {
      if (event.code == "Enter") {
        event.preventDefault();
        submission();
      }
    };
    document.addEventListener("keydown", ls);
    return () => {
      document.removeEventListener("keydown", ls);
    };
  }, [answer]);
  return (
    <>
      <div>
        <h1 className="text-xl text-primary">{question}</h1>
        <BasicInput value={answer} setValue={setAnswer} />
        <Button
          onClick={() => {
            submission();
          }}
        >
          Odpowiedz
        </Button>
      </div>
    </>
  );
}
