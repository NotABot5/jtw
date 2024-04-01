"use client";
import StyledDialog from "../styled_dialog";
import Input from "../input";
import { useState } from "react";
import { create_set } from "@/app/actions";
import LoadingScreen from "../loading_screen";

export default function AddSet() {
  const [nazwa, setNazwa] = useState("");
  const [alertUser, setAlertUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {isLoading && <LoadingScreen />}
      {alertUser && (
        <h1 className="text-xs text-red-600">
          Nie podano nazwy zestawu lub nazwa jest za długa
        </h1>
      )}
      <StyledDialog
        title="Nowy zestaw"
        description="Tu podaj dane do nowego zestawu"
        trigger_text="Dodaj zestaw"
        closeButtonAction={() => {
          if (nazwa == "" || nazwa.length > 30) {
            setAlertUser(true);
            return;
          }
          setIsLoading(true);
          create_set(nazwa);
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
