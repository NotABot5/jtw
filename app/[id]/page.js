import QuestionCard from "@/components/question_card";
import { sql } from "@vercel/postgres";
import AddTextQuestion from "@/components/add_text_question";

export default async function SetPage({ params }) {
  const my_id = params.id;
  const row_ct =
    await sql`SELECT * FROM sets WHERE set_id = ${my_id} AND invalidated = FALSE`;
  if (row_ct.rowCount == 0) {
    return (
      <h1>This page does not exist. You probably entered the wrong set id</h1>
    );
  }
  const relevant_questions =
    await sql`SELECT * FROM questions WHERE set_id = ${my_id} AND invalidated = FALSE`;
  return (
    <>
      <h1>{row_ct.rows[0].set_name}</h1>
      {relevant_questions.rows.map((prev) => (
        <QuestionCard
          id={prev.question_id}
          question={prev.question}
          answers={prev.answers}
          type={prev.type}
        />
      ))}
      <AddTextQuestion set_id={params.id} />
    </>
  );
}
