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
        <button className="w-full text-start pl-2 py-1 text-primary hover:bg-highlight transition-all rounded mr-8 text-sm my-1">
          {trigger_text}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className=" bg-overlay opacity-40 fixed inset-0 animate-fade" />
        <Dialog.Content className="animate-appear fixed pt-3 top-[50%] left-[50%] max-h-[85vh] w-[90vw] shadow-lg border-solid border-2 border-primary max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-background p-4">
          <Dialog.Title className="text-2xl font-semibold text-primary">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-xs mb-2 text-secondary">
            {description}
          </Dialog.Description>
          <hr className="border-primary border border-opacity-20" />
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
