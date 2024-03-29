"use client";
import { useState } from "react";
import Input from "../input";
import Button from "../button";
import { answer_question } from "@/app/actions";

export default function DateQuestion({
  question,
  attempt_id,
  fragments_specified,
}) {
  if (fragments_specified == 1) {
    const [year, setYear] = useState("");
    return (
      <div>
        <h1>{question}</h1>
        <Input value={year} setValue={setYear} id="odp">
          Rok
        </Input>
        <Button
          onClick={() => {
            answer_question(attempt_id, [year]);
          }}
        >
          Odpowiedz
        </Button>
      </div>
    );
  }
  if (fragments_specified == 2) {
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    return (
      <div>
        <h1>{question}</h1>
        <Input value={year} setValue={setYear} id="odp">
          Rok
        </Input>
        <Input value={month} setValue={setMonth} id="odp2">
          Miesiąc
        </Input>
        <Button
          onClick={() => {
            if (month == "") {
              answer_question(attempt_id, [year]);
              return;
            }
            answer_question(attempt_id, [year, month]);
          }}
        >
          Odpowiedz
        </Button>
      </div>
    );
  }
  if (fragments_specified == 3) {
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    return (
      <div>
        <h1>{question}</h1>
        <Input value={year} setValue={setYear} id="odp">
          Rok
        </Input>
        <Input value={month} setValue={setMonth} id="odp2">
          Miesiąc
        </Input>
        <Input value={day} setValue={setDay} id="odp3">
          Dzień
        </Input>
        <Button
          onClick={() => {
            if (month == "") {
              answer_question(attempt_id, [year]);
              return;
            }
            if (day == "") {
              answer_question(attempt_id, [year, month]);
              return;
            }
            answer_question(attempt_id, [year, month, day]);
          }}
        >
          Odpowiedz
        </Button>
      </div>
    );
  }
}
