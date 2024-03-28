export default function QuestionCard({ id, type, question, answers }) {
  return (
    <div>
      {type} {question} {"=> {"}{" "}
      {answers.map((prev, index) => (
        <h2 className="inline" key={index}>{`${prev}, `}</h2>
      ))}{" "}
      {"}"}
    </div>
  );
}
