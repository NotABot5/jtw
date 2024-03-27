"use server";
import { sql } from "@vercel/postgres";

export async function create_set(set_name) {
  const gen_id = Math.floor(Math.random() * 2000000000);
  await sql`INSERT INTO sets VALUES (${gen_id}, ${set_name})`;
}

export async function create_question(set_id, question, answers, type = 1) {
  const gen_id = (await sql`SELECT * FROM questions`).rowCount + 1;
  await sql`INSERT INTO questions VALUES (${gen_id}, ${set_id}, ${type}, ${question}, ${answers})`;
}
