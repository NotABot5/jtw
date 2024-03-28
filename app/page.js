import { sql } from "@vercel/postgres";
import SetCard from "@/components/set_card";

export default async function Home() {
  const set_list = await sql`SELECT * FROM sets WHERE invalidated = FALSE`;
  return (
    <>
      <h1>JTW</h1>
      <hr />
      {set_list.rows.map((prev) => {
        return (
          <SetCard id={prev.set_id} name={prev.set_name} key={prev.set_id} />
        );
      })}
    </>
  );
}
