import { sql } from "@vercel/postgres";
import AttemptClient from "./attempt_client";
import { unstable_noStore } from "next/cache";

export default async function Attempt({
  attempt_id,
  show_full_answers = false,
}) {
  unstable_noStore();
  const response = (
    await sql`SELECT * FROM attempts WHERE attempt_id = ${attempt_id}`
  ).rows[0];
  const set_id = response.set_id;
  const question_ids = response.start_ids;
  const question = (await sql`SELECT * FROM questions WHERE ${set_id} = set_id`)
    .rows;
  return (
    <AttemptClient
      set_id={set_id}
      questions={question}
      question_ids={question_ids}
      pre_answered={response.completed}
      attempt_id={attempt_id}
      show_full_answers={show_full_answers}
      response={response.response_code == 3 ? response : undefined}
    />
  );
}
