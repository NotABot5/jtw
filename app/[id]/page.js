import { sql } from "@vercel/postgres";

export default async function SetPage({ params }) {
  const my_id = params.id;
  const row_ct = await sql`SELECT * FROM sets WHERE set_id = ${my_id}`;
  if (row_ct.rowCount == 0) {
    return (
      <h1>This page does not exist. You probably entered the wrong set id</h1>
    );
  }
  const relevant_questions =
    await sql`SELECT * FROM questions WHERE set_id = ${my_id}`;
  //console.log(relevant_questions);
  return <h1>{row_ct.rows[0].set_name}</h1>;
}
