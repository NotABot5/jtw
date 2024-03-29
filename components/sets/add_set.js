"use client";
import StyledDialog from "../styled_dialog";
import Input from "../input";
import { useState } from "react";
import { create_set } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function AddSet() {
  const [nazwa, setNazwa] = useState("");
  const [alertUser, setAlertUser] = useState(false);
  const router = useRouter();
  return (
    <>
      {alertUser && <h1>Nie podano nazwy zestawu</h1>}
      <StyledDialog
        title="Nowy zestaw"
        description="Tu podaj dane do nowego zestawu"
        trigger_text="Dodaj zestaw"
        closeButtonAction={() => {
          if (nazwa == "") {
            setAlertUser(true);
            return;
          }
          create_set(nazwa);
          setAlertUser(false);
          router.refresh();
        }}
        closeButtonText="Dodaj zestaw"
      >
        <Input id="zestaw" value={nazwa} setValue={setNazwa}>
          Nazwa zestawu
        </Input>
      </StyledDialog>
    </>
  );
}
