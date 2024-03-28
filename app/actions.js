"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function create_set(set_name) {
  let gen_id = 0;
  let results = 1;
  while (results != 0) {
    gen_id = Math.floor(Math.random() * 2000000000);
    results = (await sql`SELECT * FROM sets WHERE set_id = ${gen_id}`).rowCount;
  }
  await sql`INSERT INTO sets VALUES (${gen_id}, ${set_name}, false)`;
  revalidatePath("/");
}

export async function create_question(set_id, question, answers, type = 1) {
  const gen_id = (await sql`SELECT * FROM questions`).rowCount + 1;
  let a = "{";
  let b = JSON.stringify(answers);
  let c = a.concat(b.slice(1, b.length - 1).concat("}"));
  await sql`INSERT INTO questions VALUES (${gen_id}, ${set_id}, ${type}, ${question}, ${c}, false)`;
  revalidatePath(`/${set_id}`);
}

export async function invalidate_set(set_id) {
  await sql`UPDATE sets SET invalidated = true WHERE set_id = ${set_id}`;
  revalidatePath("/");
}
