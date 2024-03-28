export default function QuestionCard({ id, type, question, answers }) {
  return (
    <div>
      {type} {question} {"=> {"} {answers.map((prev) => `${prev}, `)} {"}"}
    </div>
  );
}
