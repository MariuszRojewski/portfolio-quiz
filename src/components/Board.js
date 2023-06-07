import React from "react";
import Question from "./Question";

export default function QuestionsAndAnswears({ data, askApi }) {
  const dataAnswears = data;

  const [userSelectedAnswears, setUserSelectedAnswears] = React.useState([]);
  const [checkAnswear, setCheckAnswear] = React.useState(false);
  const [userSelectedData, setUserSelectedData] = React.useState([]);
  const [points, setPoints] = React.useState(0);
  const [board, setBoard] = React.useState([]);

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

    function decodeHTMLEntities(text) {
      var textarea = document.createElement("textarea");
      textarea.innerHTML = text;
      return textarea.value;
    }

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

    setBoard(
      dataAnswears.map((question) => {
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
      })
    );
  }, [checkAnswear, userSelectedAnswears, userSelectedData, dataAnswears]);

  function compareAnswers() {
    if (checkAnswear) {
      setCheckAnswear(false);
    } else if (userSelectedAnswears.length === dataAnswears.length) {
      setCheckAnswear(true);
    } else {
      console.log("Error in Compare Answers");
      return;
    }
  }

  function resetQuiz() {
    setUserSelectedAnswears([]);
    setCheckAnswear(false);
    setUserSelectedData([]);
    setPoints(0);
    askApi("https://opentdb.com/api.php?amount=5&category=20");
  }

  return (
    <div className="board">
      <div className="top_blob"></div>
      {board ? board : ""}
      <div className="question--cockpit">
        {checkAnswear ? (
          <div>
            <span className="question--cockpit-points">
              Points: {points ? points : "0"}
            </span>
            <button className="question--cockpit-button" onClick={resetQuiz}>
              Reset Quiz
            </button>
          </div>
        ) : (
          <button className="question--cockpit-button" onClick={compareAnswers}>
            Cheack Answears
          </button>
        )}
      </div>
      {/* <div className="bottom_blob"></div> */}
    </div>
  );
}
