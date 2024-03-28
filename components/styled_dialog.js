"use client";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "./button";

export default function StyledDialog({
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
        <Button>{trigger_text}</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
          {children}
          <Dialog.Close asChild>
            <Button onClick={closeButtonAction}>{closeButtonText}</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
