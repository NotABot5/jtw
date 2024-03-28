"use client";

import AddTextQuestion from "./add_text_question";
import AddListQuestion from "./add_list_question";
import AddDateQuestion from "./add_date_question";
import { useState } from "react";

export default function AddQuestionsBox({ set_id }) {
  const [alertUser, setAlertUser] = useState(false);
  return (
    <div>
      <AddTextQuestion set_id={set_id} setAlertUser={setAlertUser} />
      <AddListQuestion set_id={set_id} setAlertUser={setAlertUser} />
      <AddDateQuestion set_id={set_id} setAlertUser={setAlertUser} />
      {alertUser && (
        <h3>
          Nie można było dodać pytania, ponieważ wejście było źle sformatowane
        </h3>
      )}
    </div>
  );
}
