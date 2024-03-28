"use client";
import Input from "../input";
import MultiInput from "../multi_input";
import { useState } from "react";
import { create_question } from "@/app/actions";
import { useRouter } from "next/navigation";
import StyledDialog from "../styled_dialog";

export default function AddTextQuestion({ set_id, setAlertUser }) {
  //add user alerts
  const [pytanie, setPytanie] = useState("");
  const [odpowiedzi, setOdpowiedzi] = useState([""]);
  const router = useRouter();
  return (
    <StyledDialog
      title="Nowe pytanie"
      description="Tu podaj dane do nowego pytania tekstowego"
      trigger_text="Dodaj pytanie tekstowe"
      closeButtonAction={() => {
        if (odpowiedzi.length < 1 || odpowiedzi.includes("") || pytanie == "") {
          setAlertUser(true);
        } else {
          setAlertUser(false);
          setPytanie("");
          setOdpowiedzi([""]);
          create_question(set_id, pytanie, odpowiedzi, 1);
          router.refresh();
        }
      }}
      closeButtonText="Dodaj pytanie tekstowe"
    >
      <Input id="pytanie" value={pytanie} setValue={setPytanie}>
        Treść pytania
      </Input>
      <MultiInput value={odpowiedzi} setValue={setOdpowiedzi}>
        Możliwe odpowiedzi:
      </MultiInput>
    </StyledDialog>
  );
}
