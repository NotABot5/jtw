"use client";
import { invalidate_question } from "@/app/actions";
import { TrashIcon } from "@radix-ui/react-icons";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import RedButton from "../red_button";

export default function QuestionInvalidation({ id, set_id }) {
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <button
            className="text-red-600 hover:text-red-300 transition-all"
            title="remove question"
          >
            <TrashIcon />
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className=" bg-overlay opacity-40 fixed inset-0 animate-fade" />
          <AlertDialog.Content className="animate-appear fixed pt-3 top-[50%] left-[50%] max-h-[85vh] w-[90vw] shadow-lg border-solid border-2 border-primary max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-background p-4">
            <AlertDialog.Title className="text-2xl font-semibold text-primary">
              Czy chcesz usunąć pytanie?
            </AlertDialog.Title>
            <AlertDialog.Description className="text-xs mb-2 text-secondary">
              Usunięcie pytania jest działaniem nieodwracalnym
            </AlertDialog.Description>
            <AlertDialog.Cancel asChild>
              <button className="p-2 mr-2 text-primary hover:text-cyan-400 transition-all ">
                Anuluj
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <RedButton
                onClick={async () => {
                  invalidate_question(id, set_id);
                }}
              >
                Tak, usuń pytanie
              </RedButton>
            </AlertDialog.Action>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
}
