import React from "react";
import { nanoid } from "nanoid";
import Answear from "./Answear";

// Musimy teraz jkoś podać wyniki zaznaczenia do Board.js

export default function Question({
  category,
  question,
  correctAnswear,
  incorrectAnswers,
}) {
  const mapedIncorrectAnswers = incorrectAnswers.map((incorrect) => {
    return {
      value: incorrect,
      id: nanoid(),
      status: false,
      select: false,
    };
  });
  const combinedAnswears = [
    ...mapedIncorrectAnswers,
    { value: correctAnswear, id: nanoid(), status: true, select: false },
  ];

  const [allAnswears, setAllAnswears] = React.useState(combinedAnswears);

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
