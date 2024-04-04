import QuestionInvalidation from "./question_invalidation";

export default function QuestionCard({ id, set_id, type, question, answers }) {
  let ans = "";
  if (type == 1) {
    answers.forEach((prev) => {
      ans += prev;
      ans += " / ";
    });
    ans = ans.slice(0, ans.length - 3);
  }
  if (type == 2) {
    answers.forEach((prev) => {
      ans += prev;
      ans += ", ";
    });
    ans = ans.slice(0, ans.length - 2);
  }
  if (type == 3) {
    answers = answers.reverse();
    answers.forEach((prev) => {
      ans += prev;
      ans += ".";
    });
    ans = ans.slice(0, ans.length - 1);
  }
  return (
    <div className="text-primary text-xs my-2 rounded flex items-center border border-primary w-full">
      <span className="w-52 mr-2 p-2 h-full border-r border-primary flex justify-center items-center justify-self-start">
        {question}
      </span>
      <span className="w-96 p-2 ml-2 h-full">
        <h2 className="inline" key={crypto.randomUUID()}>
          {ans}
        </h2>
      </span>
      <span className="p-2 justify-self-end h-full flex items-center border-primary">
        <QuestionInvalidation id={id} set_id={set_id} />
      </span>
    </div>
  );
}
