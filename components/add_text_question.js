"use client";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "./button";
import Input from "./input";
import MultiInput from "./multi_input";
import { useState } from "react";
import { create_question } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function AddTextQuestion({ set_id }) {
  const [pytanie, setPytanie] = useState("");
  const [odpowiedzi, setOdpowiedzi] = useState([""]);
  const router = useRouter();
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Dodaj pytanie tekstowe</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Nowe pytanie</Dialog.Title>
          <Dialog.Description>
            Tu podaj dane do nowego pytania tekstowego
          </Dialog.Description>
          <Input id="pytanie" value={pytanie} setValue={setPytanie}>
            Treść pytania
          </Input>
          <MultiInput value={odpowiedzi} setValue={setOdpowiedzi}>
            Możliwe odpowiedzi:
          </MultiInput>
          <Dialog.Close asChild>
            <Button
              onClick={() => {
                create_question(set_id, pytanie, odpowiedzi, 1);
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
