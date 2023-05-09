import React from "react";
import { nanoid } from "nanoid";

export default function QuestionsAndAnswears({ data }) {
  // const [allQuestions, setAllQuestion] = React.useState();
  let questions = null;

  function selectAnswears(id) {
    console.log(id);
  }

  if (data.length > 1) {
    questions = data.map((item, index) => {
      const allAnswears = [];

      item.incorrect_answers.forEach((incorrect) =>
        allAnswears.push({
          text: incorrect,
          realAnswear: false,
          id: nanoid(),
        })
      );
      allAnswears.push({
        text: item.correct_answer,
        realAnswear: true,
        id: nanoid(),
      });

      const mapedAnswears = allAnswears.map((answear, index) => {
        return (
          <button
            className="question--answear"
            key={index}
            onClick={() => selectAnswears(answear.id)}
          >
            {answear.text}
          </button>
        );
      });

      return (
        <div className="question" key={index}>
          <h2 className="question--header">{item.question}</h2>
          <div className="question--all-answears">{mapedAnswears}</div>
        </div>
      );
    });
  }

  return questions;
}
