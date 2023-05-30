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

  // if (data.length > 1) {
  //   for (let i = 0; i < data.length; i++) {
  //     newQuestion.push({
  //       id: nanoid(),
  //       question: data[i].question,
  //       category: data[i].category,
  //       correct_answer: {
  //         value: data[i].correct_answer,
  //         id: nanoid(),
  //         correct: true,
  //         select: false,
  //       },
  //       incorrect_answer: data[i].incorrect_answers.map((incorrect) => {
  //         return {
  //           value: incorrect,
  //           id: nanoid(),
  //           correct: false,
  //           select: false,
  //         };
  //       }),
  //     });
  //   }
  // } else {
  //   return;
  // }

  if (data.length > 1) {
    for (let i = 0; i < data.length; i++) {
      const correct_answer = {
        value: data[i].correct_answer,
        id: nanoid(),
        correct: true,
        select: false,
      };
      const incorrect_answer = data[i].incorrect_answers.map((incorrect) => {
        return {
          value: incorrect,
          id: nanoid(),
          correct: false,
          select: false,
        };
      });

      const combined_answers = [...incorrect_answer, correct_answer];

      newQuestion.push({
        id: nanoid(),
        question: data[i].question,
        category: data[i].category,
        combined_answers: combined_answers,
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
