"use client";
import { useState } from "react";
import Input from "../input";
import Button from "../button";
import { answer_question } from "@/app/actions";

export default function DateQuestion({
  question,
  attempt_id,
  fragments_specified,
  prevalidated,
}) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [showStatus, setShowStatus] = useState(0);
  return (
    <>
      {showStatus == 0 && (
        <div>
          <h1>{question}</h1>
          <Input value={year} setValue={setYear} id="odp">
            Rok
          </Input>
          {fragments_specified > 1 && (
            <Input value={month} setValue={setMonth} id="odp2">
              Miesiąc
            </Input>
          )}
          {fragments_specified > 2 && (
            <Input value={day} setValue={setDay} id="odp3">
              Dzień
            </Input>
          )}
          <Button
            onClick={() => {
              let question_correct = false;
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
