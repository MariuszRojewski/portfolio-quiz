import React from "react";
import Question from "./Question";

export default function QuestionsAndAnswears({ data, askApi }) {
  // Trzeba jeszcze zrobić pomieszanie odpowedzi np. poprzez taką funkcję

  const dataAnswears = data;
  console.log("dataAnswears: ", dataAnswears);

  const [userSelectedAnswears, setUserSelectedAnswears] = React.useState([]);
  const [checkAnswear, setCheckAnswear] = React.useState(false);
  const [userSelectedData, setUserSelectedData] = React.useState([]);
  const [points, setPoints] = React.useState(0);

  React.useEffect(() => {
    if (checkAnswear) {
      setUserSelectedData(userSelectedAnswears);
    }
    if (userSelectedData) {
      userSelectedData.forEach((item) => {
        if (item.selectedParamCorrect) {
          setPoints((prevPoints) => prevPoints + 1);
        }
      });
    }
  }, [checkAnswear, userSelectedAnswears, userSelectedData]);

  function userSelect(rowParams) {
    const index = userSelectedAnswears.findIndex(
      (element) => element.rowId === rowParams.rowId
    );
    if (index !== -1) {
      const updatedArray = [...userSelectedAnswears];
      updatedArray[index] = rowParams;
      setUserSelectedAnswears(updatedArray);
    } else {
      setUserSelectedAnswears((old) => [...old, rowParams]);
    }
  }

  function compareAnswers() {
    if (checkAnswear) {
      setCheckAnswear(false);
    } else if (userSelectedAnswears.length === dataAnswears.length) {
      setCheckAnswear(true);
    } else {
      console.log("Coś poszło nie tak");
      return;
    }
  }

  function resetQuiz() {
    console.log("Reset game");
    setUserSelectedAnswears([]);
    setCheckAnswear(false);
    setUserSelectedData([]);
    setPoints(0);
    askApi("https://opentdb.com/api.php?amount=2&category=20");
  }

  function decodeHTMLEntities(text) {
    var textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }

  const board = dataAnswears.map((question) => {
    return (
      <Question
        key={question.id}
        questionAreaId={question.id}
        category={question.category}
        question={decodeHTMLEntities(question.question)}
        combinedAnswears={question.combined_answers}
        userSelect={userSelect}
        userSelectedData={userSelectedData}
      />
    );
  });

  return (
    <div>
      {board}
      {checkAnswear ? (
        <div>
          Points: {points ? points : "0"}
          <button onClick={resetQuiz}>Reset Quiz</button>
        </div>
      ) : (
        <button onClick={compareAnswers}>Cheack Answears</button>
      )}
    </div>
  );
}
