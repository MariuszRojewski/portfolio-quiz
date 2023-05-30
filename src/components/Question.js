import React from "react";
import { nanoid } from "nanoid";
import Answear from "./Answear";

export default function Question({ category, question, combinedAnswears }) {
  const [answears, setAnswears] = React.useState(combinedAnswears);

  function handleSelect(id) {
    setAnswears((oldAnswear) => {
      return oldAnswear.map((answear) => {
        if (answear.id === id) {
          return { ...answear, select: true };
        } else {
          return { ...answear, select: false };
        }
      });
    });
  }

  const mapedAnswears = answears.map((answear) => {
    return <Answear key={nanoid()} onClick={handleSelect} answear={answear} />;
  });

  return (
    <div className="question">
      <h1 className="question--header">{question}</h1>
      <h2 className="question--category">Category: {category}</h2>
      <div className="question--all-answears">{mapedAnswears}</div>
    </div>
  );
}
