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
    return <h1>Quiz zakończony</h1>;
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
        <TextQuestion question={question.question} attempt_id={attempt_id} />
      )}
      {type == 2 && (
        <ListQuestion question={question.question} attempt_id={attempt_id} />
      )}
      {type == 3 && (
        <DateQuestion question={question.question} attempt_id={attempt_id} />
      )}
    </div>
  );
  return <h1>s</h1>;
}
