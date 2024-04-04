"use client";
import AddTextQuestion from "./add_text_question";
import AddListQuestion from "./add_list_question";
import AddDateQuestion from "./add_date_question";
import { useState } from "react";
import AddFromFile from "./add_from_file";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function AddQuestionsBox({ set_id }) {
  const [alertUser, setAlertUser] = useState(false);
  return (
    <div className="inline-flex ml-4 justify-center">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="my-4 rounded-full font-light bg-background border border-primary text-primary text-2xl w-8 h-8 flex items-center justify-center hover:bg-highlight transition-all">
            +
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="relative animate-appearDown shadow-lg border-solid border border-primary rounded-lg mt-2 bg-background py-1 px-2">
            <AddTextQuestion set_id={set_id} setAlertUser={setAlertUser} />
            <hr />
            <AddListQuestion set_id={set_id} setAlertUser={setAlertUser} />
            <hr />
            <AddDateQuestion set_id={set_id} setAlertUser={setAlertUser} />
            <hr />
            <AddFromFile set_id={set_id} setAlertUser={setAlertUser} />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {alertUser && (
        <h3>Nie można było dodać pytania, ponieważ wejście było niepoprawne</h3>
      )}
    </div>
  );
}
