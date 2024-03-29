"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function invalidate_question(question_id, set_id) {
  await sql`UPDATE questions SET invalidated = true WHERE question_id = ${question_id}`;
  revalidatePath(`/${set_id}`);
}

function make_basic_string(s1) {
  return s1
    .toLowerCase()
    .replace(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, "")
    .replace("ę", "e")
    .replace("ó", "o")
    .replace("ą", "a")
    .replace("ś", "s")
    .replace("ł", "l")
    .replace("ż", "z")
    .replace("ź", "z")
    .replace("ń", "n")
    .replace("ć", "c");
}

export async function start_attempt(set_id, start_ids) {
  let gen_id = 0;
  let results = 1;
  while (results != 0) {
    gen_id = Math.floor(Math.random() * 2000000000);
    results = (await sql`SELECT * FROM attempts WHERE attempt_id = ${gen_id}`)
      .rowCount;
  }
  await sql`INSERT INTO attempts (set_id, start_ids, attempt_id, completed, response_code) VALUES (${set_id}, ${JSON.stringify(
    start_ids
  )
    .replace("[", "{")
    .replace("]", "}")}, ${gen_id}, 0, 0)`;
  redirect(`/attempt/${gen_id}`);
}

export async function answer_question(attempt_id, given_answer) {
  const response =
    await sql`SELECT * FROM attempts WHERE attempt_id = ${attempt_id}`;
  const question_id = response.rows[0].start_ids[response.rows[0].completed];
  const question = (
    await sql`SELECT * FROM questions WHERE question_id = ${question_id}`
  ).rows[0];
  let question_correct = false;
  console.log(question);
  if (question.type == 1) {
    const result1 = make_basic_string(given_answer);
    const result2 = question.answers.map((prev) => make_basic_string(prev));
    if (result2.includes(result1)) {
      question_correct = true;
    }
  }
  if (question.type == 3) {
    if (given_answer.length == 1) {
      if (given_answer[0] == question.answers[0]) {
        question_correct = true;
      }
    }
    if (given_answer.length == 2) {
      if (
        given_answer[0] == question.answers[0] &&
        given_answer[1] == question.answers[1]
      ) {
        question_correct = true;
      }
    }
    if (given_answer.length == 3) {
      if (
        given_answer[0] == question.answers[0] &&
        given_answer[1] == question.answers[1] &&
        given_answer[2] == question.answers[2]
      ) {
        question_correct = true;
      }
    }
  }
  if (question.type == 2) {
    const result1 = given_answer.map((prev) => make_basic_string(prev)).sort();
    const result2 = question.answers
      .map((prev) => make_basic_string(prev))
      .sort();
    if (JSON.stringify(result1) == JSON.stringify(result2)) {
      question_correct = true;
    }
  }
  if (question_correct) {
    let p = response.rows[0].correct_answer_ids;
    if (p == null) {
      p = [question_id];
    } else {
      p.push(question_id);
    }

    await sql`UPDATE attempts SET correct_answer_ids=${JSON.stringify(p)
      .replace("[", "{")
      .replace("]", "}")}, response_code = 2, completed = ${
      response.rows[0].completed + 1
    } WHERE attempt_id = ${attempt_id}`;
  } else {
    await sql`UPDATE attempts SET response_code = 1, completed = ${
      response.rows[0].completed + 1
    } WHERE attempt_id = ${attempt_id}`;
  }
  if (response.rows[0].completed + 1 >= response.rows[0].start_ids.length) {
    await sql`UPDATE attempts SET response_code = 3, end_timestamp = CURRENT_TIMESTAMP WHERE attempt_id = ${attempt_id}`;
  }
  revalidatePath(`/attempt/${attempt_id}`);
}
