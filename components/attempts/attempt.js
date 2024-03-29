import { sql } from "@vercel/postgres";
import TextQuestion from "./text_question";
import ListQuestion from "./list_question";
import DateQuestion from "./date_question";
export default async function Attempt({ attempt_id }) {
  const response = (
    await sql`SELECT * FROM attempts WHERE attempt_id = ${attempt_id}`
  ).rows[0];
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
  }
  const question_id = response.start_ids[response.completed];
  const question = (
    await sql`SELECT * FROM questions WHERE ${question_id} = question_id`
  ).rows[0];
  const type = question.type;
  return (
    <div>
      <h1>{comment}</h1>
      {type == 1 && (
        <TextQuestion
          question={question.question}
          attempt_id={attempt_id}
          prevalidated={question.answers}
        />
      )}
      {type == 2 && (
        <ListQuestion
          question={question.question}
          attempt_id={attempt_id}
          prevalidated={question.answers}
        />
      )}
      {type == 3 && (
        <DateQuestion
          question={question.question}
          attempt_id={attempt_id}
          fragments_specified={question.answers.length}
          prevalidated={question.answers}
        />
      )}
    </div>
  );
}
