import { sql } from "@vercel/postgres";
import SetCard from "@/components/sets/set_card";
import AddSet from "@/components/sets/add_set";
import TextFileUpload from "@/components/txt_upload";

export default async function Home() {
  const set_list = await sql`SELECT * FROM sets WHERE invalidated = FALSE`;
  return (
    <>
      <h1 className="text-2xl font-semibold text-cyan-800">
        Widok zestawów pytań
      </h1>
      <h3 className="text-xs mb-2 text-slate-400">
        Aby dodać pytania, wejdź do istniejącego zestawu lub stwórz nowy
      </h3>
      <div className="flex justify-center items-center w-full">
        <div className="w-full max-w-[360px]">
          {set_list.rows.map((prev) => {
            return (
              <SetCard
                id={prev.set_id}
                name={prev.set_name}
                key={prev.set_id}
              />
            );
          })}
        </div>
      </div>
      <AddSet />
    </>
  );
}
