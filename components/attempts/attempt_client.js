"use client";
import TextQuestion from "./text_question";
import ListQuestion from "./list_question";
import DateQuestion from "./date_question";
import { useState, useEffect } from "react";
import StartAttemptButton from "./start_attempt_button";
import Link from "next/link";
import Button from "../button";
import { start_attempt } from "@/app/actions";

export default function AttemptClient({
  questions,
  question_ids,
  attempt_id,
  response,
  set_id,
  pre_answered = 0,
}) {
  const [answered, setAnswered] = useState(pre_answered);
  const [responseCode, setResponseCode] = useState(0);
  const [previousAnswer, setPreviousAnswer] = useState("");
  const [given, setGiven] = useState("");
  let new_questions_in_set = [];
  useEffect(() => {
    const ls = (event) => {
      if (
        event.code == "Enter" &&
        answered == question_ids.length &&
        response != undefined &&
        (response.correct_answer_ids == null ||
          response.correct_answer_ids.length != response.start_ids.length)
      ) {
        event.preventDefault();
        new_questions_in_set =
          response.correct_answer_ids == undefined ||
          response.correct_answer_ids.length == 0
            ? response.start_ids
                .map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
            : response.start_ids
                .filter((id) => {
                  return !response.correct_answer_ids.includes(id);
                })
                .map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
        start_attempt(set_id, new_questions_in_set);
      }
    };
    document.addEventListener("keydown", ls);
    return () => {
      document.removeEventListener("keydown", ls);
    };
  }, [answered, response]);
  if (answered == question_ids.length) {
    if (response == undefined) {
      return <h1>Ładowanie wyników...</h1>;
    }
    const date_diff = response.end_timestamp - response.timestamp_start;
    const m = Math.floor(date_diff / 60000);
    const s = Math.floor(date_diff / 1000) - m * 60;
    const correct =
      response.correct_answer_ids == null
        ? 0
        : response.correct_answer_ids.length;
    const all = response.start_ids.length;
    const percentage = Math.round((correct / all) * 1000) / 10;
    new_questions_in_set =
      response.correct_answer_ids == undefined ||
      response.correct_answer_ids.length == 0
        ? response.start_ids
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
        : response.start_ids
            .filter((id) => {
              return !response.correct_answer_ids.includes(id);
            })
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

    return (
      <>
        <h1>
          Quiz zakończony w czasie {m != 0 && `${m}m`} {s}s
        </h1>
        <h1>
          Poprawne odpowiedzi: {correct}/{all} {`(${percentage}%)`}
        </h1>
        {percentage != 100 && (
          <StartAttemptButton
            set_id={set_id}
            button_text="Popraw błędne odpowiedzi"
            questions_in_set={new_questions_in_set}
          />
        )}
        <Link href={`/${set_id}`}>
          <Button>Wróć na stronę zestawu</Button>
        </Link>
      </>
    );
  }
  let question = questions.find((val) => {
    return val.question_id == question_ids[answered];
  });
  let type = question.type;
  return (
    <div>
      {responseCode == 1 && <h1>Poprawna odpowiedź {`(${given})`}</h1>}
      {responseCode == 2 && (
        <h1>
          Błędna odpowiedź {`(${given})`}, poprawna odpowiedź to:{" "}
          {previousAnswer}
        </h1>
      )}
      {type == 1 && (
        <TextQuestion
          question={question.question}
          attempt_id={attempt_id}
          prevalidated={question.answers}
          setAnswered={setAnswered}
          setShowStatus={setResponseCode}
          setPreviousAnswer={setPreviousAnswer}
          setGiven={setGiven}
        />
      )}
      {type == 2 && (
        <ListQuestion
          question={question.question}
          attempt_id={attempt_id}
          prevalidated={question.answers}
          setAnswered={setAnswered}
          setShowStatus={setResponseCode}
          setPreviousAnswer={setPreviousAnswer}
          setGiven={setGiven}
        />
      )}
      {type == 3 && (
        <DateQuestion
          question={question.question}
          attempt_id={attempt_id}
          fragments_specified={question.answers.length}
          prevalidated={question.answers}
          setAnswered={setAnswered}
          setShowStatus={setResponseCode}
          setPreviousAnswer={setPreviousAnswer}
          setGiven={setGiven}
        />
      )}
    </div>
  );
}
