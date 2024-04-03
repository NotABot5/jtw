"use client";
import { invalidate_set } from "@/app/actions";
import { TrashIcon } from "@radix-ui/react-icons";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import RedButton from "../red_button";

export default function SetInvalidation({ id, setIsDisabled }) {
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <button className="p-2 pr-0 text-red-600 hover:text-red-300 transition-all">
            <TrashIcon />
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className=" bg-slate-950 opacity-40 fixed inset-0 animate-fade" />
          <AlertDialog.Content className="animate-appear fixed pt-3 top-[50%] left-[50%] max-h-[85vh] w-[90vw] shadow-lg border-solid border-2 border-cyan-800 max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-4">
            <AlertDialog.Title className="text-2xl font-semibold text-cyan-800">
              Czy chcesz usunąć zestaw?
            </AlertDialog.Title>
            <AlertDialog.Description className="text-xs mb-2 text-slate-400">
              Usunięcie zestawu pytań jest działaniem nieodwracalnym
            </AlertDialog.Description>
            <AlertDialog.Cancel asChild>
              <button className="p-2 mr-2 text-cyan-800 hover:text-cyan-400 transition-all ">
                Anuluj
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <RedButton
                onClick={async () => {
                  setIsDisabled(true);
                  invalidate_set(id);
                }}
              >
                Tak, usuń zestaw
              </RedButton>
            </AlertDialog.Action>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
}
