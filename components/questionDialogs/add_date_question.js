"use client";
import Input from "../input";
import { useState } from "react";
import { create_question } from "@/app/actions";
import { useRouter } from "next/navigation";
import BasicStyledDialog from "../basic_styled_dialog";
import OptionalTag from "../optional_tag";

export default function AddDateQuestion({ set_id, setAlertUser }) {
  const [pytanie, setPytanie] = useState("");
  const [rok, setRok] = useState("");
  const [miesiac, setMiesiac] = useState("");
  const [dzien, setDzien] = useState("");
  const router = useRouter();
  return (
    <BasicStyledDialog
      title="Nowe pytanie"
      description="Tu podaj dane do pytania o datę"
      trigger_text="Data"
      closeButtonAction={() => {
        let odpowiedzi = [""];
        if (!/^[0-9]*$/.test(rok) || rok == "" || pytanie == "" || rok > 2050) {
          setAlertUser(true);
        } else {
          odpowiedzi[0] = rok;
          if (/^[0-9]*$/.test(miesiac) && miesiac != "" && miesiac <= 12) {
            odpowiedzi.push(miesiac);
            if (/^[0-9]*$/.test(dzien) && dzien != "" && dzien <= 31) {
              odpowiedzi.push(dzien);
            }
          }
          create_question(set_id, pytanie, odpowiedzi, 3);
          setPytanie("");
          setRok("");
          setMiesiac("");
          setDzien("");
          setAlertUser(false);
          router.refresh();
        }
      }}
      closeButtonText="Dodaj pytanie o datę"
    >
      <Input id="pytanie" value={pytanie} setValue={setPytanie}>
        Treść pytania
      </Input>
      <Input value={rok} setValue={setRok}>
        Rok
      </Input>
      <Input value={miesiac} setValue={setMiesiac}>
        Miesiąc
        <OptionalTag />
      </Input>
      <Input value={dzien} setValue={setDzien}>
        Dzień
        <OptionalTag />
      </Input>
    </BasicStyledDialog>
  );
}
