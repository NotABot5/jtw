import Link from "next/link";
import SetInvalidation from "./set_invalidation";

export default function SetCard({ name, id }) {
  return (
    <div>
      <Link href={`/${id}`}>
        <button>{name}</button>
      </Link>
      <SetInvalidation id={id} />
    </div>
  );
}
