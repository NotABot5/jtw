"use client";
import Input from "../input";
import { useState } from "react";
import { create_question } from "@/app/actions";
import { useRouter } from "next/navigation";
import StyledDialog from "../styled_dialog";

export default function AddDateQuestion({ set_id, setAlertUser }) {
  const [pytanie, setPytanie] = useState("");
  const [rok, setRok] = useState("");
  const [miesiac, setMiesiac] = useState("");
  const [dzien, setDzien] = useState("");
  const router = useRouter();
  return (
    <StyledDialog
      title="Nowe pytanie"
      description="Tu podaj dane do pytania o datę"
      trigger_text="Dodaj pytanie o datę"
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
        Miesiąc {"(opcjonalnie)"}
      </Input>
      <Input value={dzien} setValue={setDzien}>
        Dzień {"(opcjonalnie)"}
      </Input>
    </StyledDialog>
  );
}
