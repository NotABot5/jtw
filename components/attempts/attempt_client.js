"use client";
import TextQuestion from "./text_question";
import ListQuestion from "./list_question";
import DateQuestion from "./date_question";
import { useState } from "react";

export default function AttemptClient({
  questions,
  question_ids,
  attempt_id,
  response,
  pre_answered = 0,
}) {
  const [answered, setAnswered] = useState(pre_answered);
  const [responseCode, setResponseCode] = useState(0);
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
    return (
      <>
        <h1>
          Quiz zakończony w czasie {m != 0 && `${m}m`} {s}s
        </h1>
        <h1>
          Poprawne odpowiedzi: {correct}/{all} {`(${percentage}%)`}
        </h1>
      </>
    );
  }
  let question = questions.find((val) => {
    return val.question_id == question_ids[answered];
  });
  //console.log(answered);
  let type = question.type;
  //console.log(question);
  return (
    <div>
      {responseCode == 1 && <h1>Poprawna odpowiedź</h1>}
      {responseCode == 2 && <h1>Błędna odpowiedź</h1>}
      {type == 1 && (
        <TextQuestion
          question={question.question}
          attempt_id={attempt_id}
          prevalidated={question.answers}
          setAnswered={setAnswered}
          setShowStatus={setResponseCode}
        />
      )}
      {type == 2 && (
        <ListQuestion
          question={question.question}
          attempt_id={attempt_id}
          prevalidated={question.answers}
          setAnswered={setAnswered}
          setShowStatus={setResponseCode}
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
        />
      )}
    </div>
  );
}
