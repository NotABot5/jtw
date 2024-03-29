import QuestionInvalidation from "./question_invalidation";

export default function QuestionCard({ id, set_id, type, question, answers }) {
  return (
    <div>
      {type} {question} {"=> {"}{" "}
      {answers.map((prev, index) => (
        <h2 className="inline" key={crypto.randomUUID()}>{`${prev}, `}</h2>
      ))}{" "}
      {"}"}
      <QuestionInvalidation id={id} set_id={set_id} />
    </div>
  );
}
