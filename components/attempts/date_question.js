"use client";
import { useState, useEffect } from "react";
import Button from "../button";
import { answer_question } from "@/app/actions";
import BasicInput from "../basic_input";

function make_date(s1) {
  return s1
    .toLowerCase()
    .replace(" r.", "")
    .replace("w ", "")
    .replace("roku ", "")
    .replace("rok ", "")
    .replace(" ", ".")
    .replace("xii", "12")
    .replace("xi", "11")
    .replace("ix", "9")
    .replace("x", "10")
    .replace("viii", "8")
    .replace("vii", "7")
    .replace("vi", "6")
    .replace("iv", "4")
    .replace("v", "5")
    .replace("iii", "3")
    .replace("ii", "2")
    .replace("i", "1")
    .split(".");
}

export default function DateQuestion({
  question,
  attempt_id,
  fragments_specified,
  prevalidated,
  setAnswered,
  setShowStatus,
}) {
  const [answer, setAnswer] = useState("");
  const submission = () => {
    console.log(answer);
    let question_correct = false;
    let full_date = make_date(answer);
    let year = "";
    let month = "";
    let day = "";
    if (full_date.length == 1) {
      year = full_date[0];
    }
    if (full_date.length == 2) {
      if (fragments_specified == 2) {
        month = full_date[0];
      }
      year = full_date[1];
    }
    if (full_date.length == 3) {
      if (fragments_specified == 3) {
        day = full_date[0];
      }
      if (fragments_specified >= 2) {
        month = full_date[1];
      }
      year = full_date[2];
    }
    if (month == "") {
      if (year == prevalidated[0]) {
        question_correct = true;
      }
    } else if (day == "") {
      if (year == prevalidated[0] && month == prevalidated[1]) {
        question_correct = true;
      }
    } else {
      if (
        year == prevalidated[0] &&
        month == prevalidated[1] &&
        day == prevalidated[2]
      ) {
        question_correct = true;
      }
    }
    answer_question(attempt_id, question_correct);
    setAnswered((prev) => {
      return prev + 1;
    });
    if (question_correct) {
      setShowStatus(1);
    } else {
      setShowStatus(2);
    }
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
        <h1>{question}</h1>
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
