import React from "react";
import { nanoid } from "nanoid";
import Answear from "./Answear";

export default function Question({
  questionAreaId,
  category,
  question,
  combinedAnswears,
  userSelect,
}) {
  const [answears, setAnswears] = React.useState(combinedAnswears);

  function handleSelect(id) {
    const correctParamId = answears.map((param) => {
      if (param.correct) {
        return param.id;
      } else {
        return null;
      }
    });
    setAnswears((oldAnswear) => {
      return oldAnswear.map((answear) => {
        if (answear.id === id) {
          userSelect({
            rowId: questionAreaId,
            selectedParamId: answear.id,
            selectedParamCorrect: answear.correct ? true : false,
            correctParamId: correctParamId,
            paramValue: answear.value,
          });
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
