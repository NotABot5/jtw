import { sql } from "@vercel/postgres";
import Link from "next/link";
import Button from "@/components/button";
import { redirect } from "next/navigation";
import StartAttemptButton from "@/components/attempts/start_attempt_button";
import AddDateQuestion from "@/components/questionDialogs/add_date_question";

export default async function SetPage({ params }) {
  const my_id = params.id;
  if (!/^[0-9]*$/.test(my_id)) {
    return (
      <h1 className="text-2xl font-semibold text-cyan-800">
        Ta strona nie istnieje
      </h1>
    );
  }
  const row_ct =
    await sql`SELECT * FROM sets WHERE set_id = ${my_id} AND invalidated = FALSE`;
  if (row_ct.rowCount == 0) {
    return (
      <h1 className="text-2xl font-semibold text-cyan-800">
        Ta strona nie istnieje
      </h1>
    );
  }
  const relevant_questions =
    await sql`SELECT * FROM questions WHERE set_id = ${my_id} AND invalidated = FALSE`;
  if (relevant_questions.rowCount == 0) {
    redirect(`/${my_id}/modify`);
  }
  return (
    <>
      <h1 className="text-2xl font-semibold text-cyan-800">
        {row_ct.rows[0].set_name}
      </h1>
      <StartAttemptButton
        set_id={my_id}
        questions_in_set={relevant_questions.rows
          .map((prev) => {
            return prev.question_id;
          })
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)}
      />
      <Link href={`/${my_id}/modify`}>
        <Button>Modyfikuj zestaw</Button>
      </Link>
    </>
  );
}
