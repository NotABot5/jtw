import QuestionCard from "@/components/questions/question_card";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import AddQuestionsBox from "@/components/questionDialogs/add_questions_box";

export default async function SetModificationPage({ params }) {
  revalidatePath("/");
  const my_id = params.id;
  if (!/^[0-9]*$/.test(my_id)) {
    return (
      <h1 className="text-2xl font-semibold text-primary">
        Ta strona nie istnieje
      </h1>
    );
  }
  const row_ct =
    await sql`SELECT * FROM sets WHERE set_id = ${my_id} AND invalidated = FALSE`;
  if (row_ct.rowCount == 0) {
    return (
      <h1 className="text-2xl font-semibold text-primary">
        Ta strona nie istnieje
      </h1>
    );
  }
  const relevant_questions =
    await sql`SELECT * FROM questions WHERE set_id = ${my_id} AND invalidated = FALSE`;
  return (
    <>
      <h1 className="text-2xl font-semibold inline text-primary ">
        {row_ct.rows[0].set_name}
      </h1>

      <AddQuestionsBox set_id={my_id} />
      {relevant_questions.rowCount == 0 && (
        <h2 className="text-sm text-secondary">
          W tym zestawie nie ma jeszcze żadnych pytań. Aby dodać nowe pytania
          albo zaimportować je z pliku, wciśnij przycisk + na prawo od nazwy
          zestawu.
        </h2>
      )}
      {relevant_questions.rows.map((prev) => (
        <QuestionCard
          id={prev.question_id}
          question={prev.question}
          answers={prev.answers}
          type={prev.type}
          set_id={my_id}
          key={crypto.randomUUID()}
        />
      ))}
    </>
  );
}
