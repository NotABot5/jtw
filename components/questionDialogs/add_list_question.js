"use client";
import Input from "../input";
import MultiInput from "../multi_input";
import { useState } from "react";
import { create_question } from "@/app/actions";
import { useRouter } from "next/navigation";
import StyledDialog from "../styled_dialog";

export default function AddListQuestion({ set_id, setAlertUser }) {
  const [pytanie, setPytanie] = useState("");
  const [odpowiedzi, setOdpowiedzi] = useState([""]);
  const router = useRouter();
  return (
    <StyledDialog
      title="Nowe pytanie"
      description="Tu podaj dane do pytania typu 'wymień'"
      trigger_text="Dodaj pytanie typu 'wymień'"
      closeButtonAction={() => {
        if (odpowiedzi.length < 1 || odpowiedzi.includes("") || pytanie == "") {
          setAlertUser(true);
        } else {
          setAlertUser(false);
          setPytanie("");
          setOdpowiedzi([""]);
          create_question(set_id, pytanie, odpowiedzi, 2);
          router.refresh();
        }
      }}
      closeButtonText="Dodaj pytanie typu 'wymień'"
    >
      <Input id="pytanie" value={pytanie} setValue={setPytanie}>
        Treść pytania
      </Input>
      <MultiInput value={odpowiedzi} setValue={setOdpowiedzi}>
        Do wymienienia
      </MultiInput>
    </StyledDialog>
  );
}
