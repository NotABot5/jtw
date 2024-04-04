"use client";
import { setColorSchemeCookie } from "@/app/actions";
import { MoonIcon } from "@radix-ui/react-icons";
import { SunIcon } from "@radix-ui/react-icons";

export default function ColorSchemeSwitch({ type }) {
  return (
    <>
      {type == "dark" && (
        <button
          className="fixed text-primary -translate-y-10 translate-x-4"
          onClick={() => setColorSchemeCookie("light")}
        >
          <SunIcon />
        </button>
      )}
      {type == "light" && (
        <button
          className="fixed text-primary -translate-y-10 translate-x-4"
          onClick={() => setColorSchemeCookie("dark")}
        >
          <MoonIcon />
        </button>
      )}
    </>
  );
}
