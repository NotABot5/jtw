"use client";
import { useState } from "react";
import Input from "../input";
import Button from "../button";
import { answer_question } from "@/app/actions";
import BasicInput from "../basic_input";

function make_date(s1) {
  return s1
    .toLowerCase()
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
}) {
  const [answer, setAnswer] = useState("");
  const [showStatus, setShowStatus] = useState(0);
  return (
    <>
      {showStatus == 0 && (
        <div>
          <h1>{question}</h1>
          <BasicInput value={answer} setValue={setAnswer} />
          <Button
            onClick={() => {
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
              if (question_correct) {
                setShowStatus(1);
              } else {
                setShowStatus(2);
              }
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
