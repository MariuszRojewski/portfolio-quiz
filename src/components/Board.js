import React from "react";
import { nanoid } from "nanoid";
import Question from "./Question";

export default function QuestionsAndAnswears({ data }) {
  const board = data.map((question) => {
    const combinedAnswears = [
      ...question.incorrect_answers,
      question.correct_answer,
    ];

    return (
      <Question
        key={nanoid()}
        category={question.category}
        question={question.question}
        correctAnswear={question.correct_answer}
        incorrectAnswers={question.incorrect_answers}
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
