import QuestionInvalidation from "./question_invalidation";

export default function QuestionCard({ id, set_id, type, question, answers }) {
  return (
    <div className="text-cyan-800 text-xs my-2 rounded flex items-center border border-cyan-800 w-full">
      <span className="w-52 mr-2 p-2 h-full border-r border-cyan-800 flex justify-center items-center justify-self-start">
        {question}
      </span>
      <span className="w-96 p-2 ml-2">
        {answers.map((prev) => (
          <h2 className="inline" key={crypto.randomUUID()}>{`${prev}, `}</h2>
        ))}
      </span>
      <span className="p-2 justify-self-end h-full flex items-center border-cyan-800">
        <QuestionInvalidation id={id} set_id={set_id} />
      </span>
    </div>
  );
}
