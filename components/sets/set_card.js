"use client";
import Link from "next/link";
import SetInvalidation from "./set_invalidation";
import { useState } from "react";

export default function SetCard({ name, id }) {
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <div>
      {!isDisabled && (
        <div className=" h-8 p-2 my-2 rounded flex items-center justify-end border border-primary">
          <Link
            href={`/${id}`}
            className="w-full h-8 flex justify-end border-r border-primary transition-all text-primary hover:text-primary-light"
          >
            <button className="pr-3 ">{name}</button>
          </Link>
          <SetInvalidation id={id} setIsDisabled={setIsDisabled} />
        </div>
      )}
    </div>
  );
}
