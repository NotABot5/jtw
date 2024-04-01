import { sql } from "@vercel/postgres";
import AttemptClient from "./attempt_client";

export default async function Attempt({ attempt_id }) {
  const response = (
    await sql`SELECT * FROM attempts WHERE attempt_id = ${attempt_id}`
  ).rows[0];
  /*
  let comment = "";
  if (response.response_code == 1) {
    comment = "Nieprawidłowa odpowiedź";
  }
  if (response.response_code == 2) {
    comment = "Poprawna odpowiedź";
  }
  if (response.response_code == 3) {
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
  }*/
  const set_id = response.set_id;
  const question_ids = response.start_ids;
  const question = (
    await sql`SELECT * FROM questions WHERE ${set_id} = set_id AND invalidated = false`
  ).rows;
  return (
    <AttemptClient
      questions={question}
      question_ids={question_ids}
      attempt_id={attempt_id}
      response={response.response_code == 3 ? response : undefined}
    />
  );
}
