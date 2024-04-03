"use client";

import TextFileUpload from "../txt_upload";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BasicStyledDialog from "../basic_styled_dialog";
import { create_question } from "@/app/actions";

export default function AddFromFile({ set_id, setAlertUser }) {
  const [value, setValue] = useState("");
  const router = useRouter();
  return (
    <BasicStyledDialog
      title="Pytania z pliku"
      description="Tu wrzuć odpowiednio sformatowany plik .txt z zestawem pytań i odpowiedzi"
      trigger_text="Z pliku"
      closeButtonAction={() => {
        value.split(/\r?\n/).forEach((toAdd) => {
          let data = toAdd.split(" ");
          if (
            data.find((v) => {
              return v == "|";
            }) == undefined
          ) {
            setAlertUser(true);
            return;
          }
          if (data[0] == "D") {
            let answer = [];
            let question = "";
            let curr = 1;
            while (data[curr] != "|") {
              if (!/^[0-9]*$/.test(data[curr])) {
                setAlertUser(true);
                return;
              }
              answer.push(data[curr]);
              curr++;
            }
            curr++;
            while (curr < data.length) {
              question += data[curr];
              question += " ";
              curr++;
            }
            if (answer.length > 3 || answer.length == 0 || question == "") {
              setAlertUser(true);
              return;
            }

            create_question(set_id, question, answer, 3);
          }
          if (data[0] == "T") {
            let answer = [""];
            let question = "";
            let curr = 1;
            while (data[curr] != "|") {
              while (data[curr] != "," && data[curr] != "|") {
                answer[answer.length - 1] += data[curr];
                answer[answer.length - 1] += " ";
                curr++;
              }
              answer.push("");
              if (data[curr] == "|") {
                break;
              }
              curr++;
            }
            answer.pop();
            curr++;
            while (curr < data.length) {
              question += data[curr];
              question += " ";
              curr++;
            }
            create_question(set_id, question, answer, 1);
          }
          if (data[0] == "W") {
            let answer = [""];
            let question = "";
            let curr = 1;
            while (data[curr] != "|") {
              while (data[curr] != "," && data[curr] != "|") {
                answer[answer.length - 1] += data[curr];
                answer[answer.length - 1] += " ";
                curr++;
              }
              answer.push("");
              if (data[curr] == "|") {
                break;
              }
              curr++;
            }
            answer.pop();
            curr++;
            while (curr < data.length) {
              question += data[curr];
              question += " ";
              curr++;
            }
            create_question(set_id, question, answer, 2);
          }
        });
        setAlertUser(false);
        router.refresh();
      }}
      closeButtonText="Dodaj pytania z pliku"
    >
      <TextFileUpload setValue={setValue} />
    </BasicStyledDialog>
  );
}
