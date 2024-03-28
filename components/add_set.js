"use client";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "./button";
import Input from "./input";
import { useState } from "react";
import { create_set } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function AddSet() {
  const [nazwa, setNazwa] = useState("");
  const router = useRouter();
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Dodaj zestaw</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Nowy zestaw</Dialog.Title>
          <Dialog.Description>
            Tu podaj dane do nowego zestawu
          </Dialog.Description>
          <Input id="zestaw" value={nazwa} setValue={setNazwa}>
            Nazwa zestawu
          </Input>
          <Dialog.Close asChild>
            <Button
              onClick={() => {
                create_set(nazwa);
                router.refresh();
              }}
            >
              Dodaj
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
