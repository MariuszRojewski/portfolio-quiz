import React from "react";
import { nanoid } from "nanoid";
import Answear from "./Answear";

export default function Question({
  questionAreaId,
  category,
  question,
  combinedAnswears,
  userSelect,
  userSelectedData,
  userPoints,
}) {
  const [answears, setAnswears] = React.useState(combinedAnswears);
  // Jeśli userMarked jest true, to znaczy, że przycisk Check Answears został odpalony
  const [userMarked, setUserMarked] = React.useState(null);
  // console.log("userMarked: ", userMarked);

  React.useEffect(() => {
    if (userSelectedData.length !== 0) {
      setUserMarked(userSelectedData);
    }
  }, [userSelectedData]);

  function handleSelect(id) {
    let correctParamId = null;
    answears.forEach((param) => {
      if (param.correct) {
        correctParamId = param.id;
      } else {
        return;
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
    return (
      <Answear
        key={nanoid()}
        onClick={handleSelect}
        answear={answear}
        userCheckAnswers={userMarked !== null ? true : false}
        userPoints={userPoints}
      />
    );
  });

  return (
    <div className="question">
      <h1 className="question--header">{question}</h1>
      <h2 className="question--category">Category: {category}</h2>
      <div className="question--all-answears">{mapedAnswears}</div>
    </div>
  );
}
