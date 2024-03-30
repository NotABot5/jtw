import Link from "next/link";
import SetInvalidation from "./set_invalidation";

export default function SetCard({ name, id }) {
  return (
    <div className="w-2/3 max-w-96 h-8 p-2 my-2 rounded flex items-center justify-end border border-cyan-800">
      <Link
        href={`/${id}`}
        className="w-full h-8 flex justify-end border-r border-cyan-800"
      >
        <button className="pr-3">{name}</button>
      </Link>
      <SetInvalidation id={id} />
    </div>
  );
}
