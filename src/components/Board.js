import React from "react";
import Question from "./Question";

export default function QuestionsAndAnswears({ data }) {
  const [dataAnswears, setDataAnswears] = React.useState(data);
  const [userSelectedAnswears, setUserSelectedAnswears] = React.useState([]);
  const [checkAnswear, setCheckAnswear] = React.useState(false);
  const [userSelectedData, setUserSelectedData] = React.useState([]);

  React.useEffect(() => {
    if (checkAnswear) {
      setUserSelectedData(userSelectedAnswears);
    }
  }, [checkAnswear, userSelectedAnswears]);

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
      <button onClick={compareAnswers}>Cheack Answears</button>
    </div>
  );
}
