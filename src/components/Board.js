import React from "react";
import Question from "./Question";

export default function QuestionsAndAnswears({ data }) {
  const [dataAnswears, setDataAnswears] = React.useState(data);
  const [userSelectedAnswears, setUserSelectedAnswears] = React.useState([]);

  function userSelect(rowParams) {
    const index = userSelectedAnswears.findIndex(
      (element) => element.rowId === rowParams.rowId
    );
    console.log(index);
    if (index !== -1) {
      const updatedArray = [...userSelectedAnswears];
      updatedArray[index] = rowParams;
      setUserSelectedAnswears(updatedArray);
    } else {
      setUserSelectedAnswears((old) => [...old, rowParams]);
    }
  }

  function compareAnswers() {
    console.log(userSelectedAnswears);
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
