import React from "react";
import { nanoid } from "nanoid";
import Answear from "./Answear";

// Musimy teraz jkoś podać wyniki zaznaczenia do Board.js

export default function Question({
  category,
  question,
  combinedAnswears,
  sandAnswearUp,
}) {
  const [allAnswears, setAllAnswears] = React.useState(combinedAnswears);

  React.useEffect(() => {
    console.log("ABC");
    sandAnswearUp(allAnswears);
  }, [allAnswears]);

  function handleSelect(id) {
    setAllAnswears((oldAnswear) => {
      return oldAnswear.map((answear) => {
        if (answear.id === id) {
          return { ...answear, select: true };
        } else {
          return { ...answear, select: false };
        }
      });
    });
    // Jak to zostawiam, to ustawiam stan userSelected wyżej na true
    // ale blokuje zaznaczanie przyciski na true...
  }

  const answears = allAnswears.map((answear) => {
    return <Answear key={nanoid()} onClick={handleSelect} answear={answear} />;
  });

  return (
    <div className="question">
      <h1 className="question--header">{question}</h1>
      <h2 className="question--category">Category: {category}</h2>
      <div className="question--all-answears">{answears}</div>
    </div>
  );
}
