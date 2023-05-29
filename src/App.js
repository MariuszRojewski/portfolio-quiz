import React from "react";
import StartPage from "./components/StartPage";
import Board from "./components/Board";
import { nanoid } from "nanoid";

// API
//https://opentdb.com/api.php?amount=5&category=20

export default function App() {
  const [start, setStart] = React.useState(false);
  const [data, setData] = React.useState({});
  let newQuestion = [];

  React.useEffect(() => {
    (async () => {
      let response = await fetch(
        "https://opentdb.com/api.php?amount=5&category=20"
      );
      response = await response.json();
      setData(response.results);
    })();
  }, []);

  function handleStart() {
    if (newQuestion) {
      setStart(!start);
    } else {
      console.log("Czekam na dane");
    }
  }

  if (data.length > 1) {
    for (let i = 0; i < data.length; i++) {
      newQuestion.push({
        id: nanoid(),
        question: data[i].question,
        category: data[i].category,
        correct_answer: [data[i].correct_answer].map((correct_value) => {
          return {
            value: correct_value,
            id: nanoid(),
            correct: true,
            select: false,
          };
        }),
        incorrect_answer: [data[i].incorrect_answers].map((all_incorrect) => {
          return all_incorrect.map((incorect_value) => {
            return {
              value: incorect_value,
              id: nanoid(),
              correct: true,
              select: false,
            };
          });
        }),
      });
    }
  } else {
    return;
  }

  return (
    <>
      <div className="wrapper">
        {start ? (
          <Board data={newQuestion} />
        ) : (
          <StartPage onClick={() => handleStart()} />
        )}
      </div>
    </>
  );
}
