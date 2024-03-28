import Link from "next/link";

export default function SetCard({ name, id }) {
  return (
    <div>
      <Link href={`/${id}`}>
        <button>{name}</button>
      </Link>
    </div>
  );
}
