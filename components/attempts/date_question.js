"use client";
import { useState, useEffect } from "react";
import Button from "../button";
import { answer_question } from "@/app/actions";
import BasicInput from "../basic_input";

function make_date(s1) {
  return s1
    .toLowerCase()
    .replaceAll("ę", "e")
    .replaceAll("ó", "o")
    .replaceAll("ą", "a")
    .replaceAll("ś", "s")
    .replaceAll("ł", "l")
    .replaceAll("ż", "z")
    .replaceAll("ź", "z")
    .replaceAll("ń", "n")
    .replaceAll("ć", "c")
    .replaceAll("ü", "u")
    .replaceAll("stycznia", "1")
    .replaceAll("lutego", "2")
    .replaceAll("marca", "3")
    .replaceAll("kwietnia", "4")
    .replaceAll("maja", "5")
    .replaceAll("czerwca", "6")
    .replaceAll("lipca", "7")
    .replaceAll("sierpnia", "8")
    .replaceAll("wrzesnia", "9")
    .replaceAll("pazdziernika", "10")
    .replaceAll("listopada", "11")
    .replaceAll("grudnia", "12")
    .replaceAll("styczen", "1")
    .replaceAll("luty", "2")
    .replaceAll("marzec", "3")
    .replaceAll("kwiecien", "4")
    .replaceAll("maj", "5")
    .replaceAll("czerwiec", "6")
    .replaceAll("lipiec", "7")
    .replaceAll("sierpien", "8")
    .replaceAll("wrzesien", "9")
    .replaceAll("pazdziernik", "10")
    .replaceAll("listopad", "11")
    .replaceAll("grudzien", "12")
    .replaceAll(" r.", "")
    .replaceAll("w ", "")
    .replaceAll("roku ", "")
    .replaceAll("rok ", "")
    .replaceAll(" ", ".")
    .replaceAll(".0", ".")
    .replaceAll("xii", "12")
    .replaceAll("xi", "11")
    .replaceAll("ix", "9")
    .replaceAll("x", "10")
    .replaceAll("viii", "8")
    .replaceAll("vii", "7")
    .replaceAll("vi", "6")
    .replaceAll("iv", "4")
    .replaceAll("v", "5")
    .replaceAll("iii", "3")
    .replaceAll("ii", "2")
    .replaceAll("i", "1")
    .split(".");
}

export default function DateQuestion({
  question,
  attempt_id,
  fragments_specified,
  prevalidated,
  setAnswered,
  setShowStatus,
  setPreviousAnswer,
  setGiven,
}) {
  const [answer, setAnswer] = useState("");
  const submission = () => {
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
      setGiven(`${year}`);
    } else if (day == "") {
      if (year == prevalidated[0] && month == prevalidated[1]) {
        question_correct = true;
      }
      setGiven(`${month}.${year}`);
    } else {
      if (
        year == prevalidated[0] &&
        month == prevalidated[1] &&
        day == prevalidated[2]
      ) {
        question_correct = true;
      }
      setGiven(`${day}.${month}.${year}`);
    }
    if (prevalidated[2] && prevalidated[1] && prevalidated[0]) {
      setPreviousAnswer(
        `${prevalidated[2]}.${prevalidated[1]}.${prevalidated[0]}`
      );
    } else if (prevalidated[1] && prevalidated[0]) {
      setPreviousAnswer(`${prevalidated[1]}.${prevalidated[0]}`);
    } else if (prevalidated[0]) {
      setPreviousAnswer(`${prevalidated[0]}`);
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
