import { sql } from "@vercel/postgres";
export default async function Attempt(attempt_id) {
  const response = (
    await sql`SELECT * FROM attempts WHERE attempt_id = ${attempt_id}`
  ).rows[0];
  const comment = "";
  if (response.response_code == 1) {
    comment = "Nieprawidłowa odpowiedź";
  }
  if (response.response_code == 2) {
    comment = "Poprawna odpowiedź";
  }
  if (response.response_code == 3) {
    comment = "Quiz został zakończony";
  }
  return (
    <div>
      <h1>{comment}</h1>
    </div>
  );
}
