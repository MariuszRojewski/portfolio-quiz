import React from "react";
import StartPage from "./components/StartPage";
import Board from "./components/Board";
import { nanoid } from "nanoid";

// API
//https://opentdb.com/api.php?amount=5&category=20

export default function App() {
  const [start, setStart] = React.useState(false);
  const [data, setData] = React.useState({});
  // Używam useState z pustą tablicą jako wartością początkową
  const [newQuestion, setNewQuestion] = React.useState([]);

  React.useEffect(() => {
    askApi("https://opentdb.com/api.php?amount=2&category=20");
  }, []);

  React.useEffect(() => {
    if (data.length > 1) {
      let tempQuestion = [];
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

        tempQuestion.push({
          id: nanoid(),
          question: data[i].question,
          category: data[i].category,
          combined_answers: combined_answers,
        });
      }
      setNewQuestion(tempQuestion);
    }
  }, [data]);

  function askApi(url) {
    (async () => {
      let response = await fetch(url);
      response = await response.json();
      setData(response.results);
    })();
  }

  function handleStart() {
    if (newQuestion) {
      setStart(!start);
    } else {
      console.log("Czekam na dane");
    }
  }

  return (
    <>
      <div className="wrapper">
        {start ? (
          <Board data={newQuestion} askApi={askApi} />
        ) : (
          <StartPage onClick={() => handleStart()} />
        )}
      </div>
    </>
  );
}
