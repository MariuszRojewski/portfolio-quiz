import React from "react";
import { nanoid } from "nanoid";
import Answear from "./Answear";

export default function Question({
  questionAreaId,
  category,
  question,
  combinedAnswears,
  userSelect,
  userSelectedAnswears,
}) {
  const [answears, setAnswears] = React.useState(combinedAnswears);
  console.log(userSelectedAnswears);

  function handleSelect(id) {
    setAnswears((oldAnswear) => {
      return oldAnswear.map((answear) => {
        if (answear.id === id) {
          if (answear.correct) {
            userSelect({
              questionAreaId: questionAreaId,
              // answearId: answear.id,
              correctStatus: true,
            });
          } else {
            userSelect({
              questionAreaId: questionAreaId,
              // answearId: answear.id,
              correctStatus: false,
            });
          }
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
