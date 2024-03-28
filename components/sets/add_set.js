"use client";
import StyledDialog from "../styled_dialog";
import Input from "../input";
import { useState } from "react";
import { create_set } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function AddSet() {
  //Add verification
  const [nazwa, setNazwa] = useState("");
  const router = useRouter();
  return (
    <StyledDialog
      title="Nowy zestaw"
      description="Tu podaj dane do nowego zestawu"
      trigger_text="Dodaj zestaw"
      closeButtonAction={() => {
        create_set(nazwa);
        router.refresh();
      }}
      closeButtonText="Dodaj zestaw"
    >
      <Input id="zestaw" value={nazwa} setValue={setNazwa}>
        Nazwa zestawu
      </Input>
    </StyledDialog>
  );
}
