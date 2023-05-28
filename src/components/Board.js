import React from "react";
import { nanoid } from "nanoid";
import Question from "./Question";

export default function QuestionsAndAnswears({ data }) {
  const [selectedAnswear, setSlectedAnswear] = React.useState([]);

  function sandAnswearUp(newItem) {
    setSlectedAnswear((old) => {
      return [...old, newItem];
    });
  }

  const board = data.map((question) => {
    const mapedIncorrectAnswers = question.incorrect_answers.map(
      (incorrect) => {
        return {
          value: incorrect,
          id: nanoid(),
          correct: false,
          select: false,
        };
      }
    );
    const combinedAnswears = [
      ...mapedIncorrectAnswers,
      {
        value: question.correct_answer,
        id: nanoid(),
        correct: true,
        select: false,
      },
    ];

    return (
      <Question
        key={nanoid()}
        category={question.category}
        question={question.question}
        combinedAnswears={combinedAnswears}
        sandAnswearUp={sandAnswearUp}
      />
    );
  });

  return (
    <div>
      {board}
      <button>Cheack Answears</button>
    </div>
  );
}
