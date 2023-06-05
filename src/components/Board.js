import React from "react";
import Question from "./Question";

export default function QuestionsAndAnswears({ data, askApi }) {
  // coś tu nie działa jak trzeba, teraz jak dane są przesyłane do
  // się wszystko odświeża, ale nie tak jak trzeba. jest opóźnienie
  // i zmieniony stan, dalej trzyma zablokowane wcześniej elememty
  const dataAnswears = data;
  const [userSelectedAnswears, setUserSelectedAnswears] = React.useState([]);
  const [checkAnswear, setCheckAnswear] = React.useState(false);
  const [userSelectedData, setUserSelectedData] = React.useState([]);
  const [points, setPoints] = React.useState(0);

  console.log("DATA: ", data);

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
    } else {
      if (userSelectedAnswears.length === dataAnswears.length) {
        setCheckAnswear(true);
      }
    }
  }

  function resetQuiz() {
    console.log("Reset game");
    askApi("https://opentdb.com/api.php?amount=2&category=20");
  }

  const board = dataAnswears.map((question) => {
    return (
      <Question
        key={question.id}
        questionAreaId={question.id}
        category={question.category}
        question={question.question}
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
