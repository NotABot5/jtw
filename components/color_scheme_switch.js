"use client";
import { setColorSchemeCookie } from "@/app/actions";
import { MoonIcon } from "@radix-ui/react-icons";
import { SunIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";

export default function ColorSchemeSwitch({ type }) {
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setColorSchemeCookie("dark");
    }
  }, []);
  return (
    <>
      {type == "dark" && (
        <button
          className="fixed text-primary -translate-y-14 translate-x-4 h-12 w-12 flex justify-center items-center"
          onClick={() => setColorSchemeCookie("light")}
        >
          <SunIcon width={24} height={24} />
        </button>
      )}
      {type == "light" && (
        <button
          className="fixed text-primary -translate-y-14 translate-x-4 h-12 w-12 flex justify-center items-center"
          onClick={() => setColorSchemeCookie("dark")}
        >
          <MoonIcon width={24} height={24} />
        </button>
      )}
    </>
  );
}
