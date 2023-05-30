import React from "react";
import Question from "./Question";

// Wszystko zaczęło działać jak trzeba, trzeba teraz napisac
// logikę w jaki sposób sprawdzić, czy zaznaczone element
// są poprawne, a które nie. Jeśli użytkownik popełnił błąd
// to powinna się zaznaczyć poprawana odpowedź , a jego
// powinna się zmienić na kolor czerwony

export default function QuestionsAndAnswears({ data }) {
  const [allAnswears, setAllAnswears] = React.useState(data);
  const [userSelectedAnswears, setUserSelectedAnswears] = React.useState(null);

  function userSelect() {
    setUserSelectedAnswears();
  }

  const board = allAnswears.map((question) => {
    return (
      <Question
        key={question.id}
        id={question.id}
        category={question.category}
        question={question.question}
        combinedAnswears={question.combined_answers}
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
