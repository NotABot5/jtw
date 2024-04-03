"use client";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Button from "./button";

export default function BasicStyledDialog({
  description,
  title,
  trigger_text,
  children,
  closeButtonAction,
  closeButtonText,
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>{trigger_text}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className=" bg-slate-950 opacity-40 fixed inset-0 animate-fade" />
        <Dialog.Content className="animate-appear fixed pt-3 top-[50%] left-[50%] max-h-[85vh] w-[90vw] shadow-lg border-solid border-2 border-cyan-800 max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-4">
          <Dialog.Title className="text-2xl font-semibold text-cyan-800">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-xs mb-2 text-slate-400">
            {description}
          </Dialog.Description>
          <hr />
          {children}
          <div className="flex w-auto justify-end">
            <Dialog.Close asChild>
              <Button onClick={closeButtonAction}>{closeButtonText}</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
