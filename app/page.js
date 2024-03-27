"use client";
import { create_question, create_set } from "./actions";

export default function Home() {
  return (
    <>
      <button onClick={() => create_set("test")}>Create set</button>
      <button
        onClick={() =>
          create_question(
            1328520828,
            "Test question",
            '{"test_answer1", "test_answer2"}'
          )
        }
      >
        Create sample question
      </button>
    </>
  );
}
