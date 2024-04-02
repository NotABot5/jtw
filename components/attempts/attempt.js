import { sql } from "@vercel/postgres";
import AttemptClient from "./attempt_client";

export default async function Attempt({ attempt_id }) {
  const response = (
    await sql`SELECT * FROM attempts WHERE attempt_id = ${attempt_id}`
  ).rows[0];
  const set_id = response.set_id;
  const question_ids = response.start_ids;
  const question = (
    await sql`SELECT * FROM questions WHERE ${set_id} = set_id AND invalidated = false`
  ).rows;
  return (
    <AttemptClient
      set_id={set_id}
      questions={question}
      question_ids={question_ids}
      pre_answered={response.completed}
      attempt_id={attempt_id}
      response={response.response_code == 3 ? response : undefined}
    />
  );
}
