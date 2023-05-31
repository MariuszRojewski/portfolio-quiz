import React from "react";
import Question from "./Question";

// Wszystko zaczęło działać jak trzeba, trzeba teraz napisac
// logikę w jaki sposób sprawdzić, czy zaznaczone element
// są poprawne, a które nie. Jeśli użytkownik popełnił błąd
// to powinna się zaznaczyć poprawana odpowedź , a jego
// powinna się zmienić na kolor czerwony

export default function QuestionsAndAnswears({ data }) {
  const [dataAnswears, setDataAnswears] = React.useState(data);
  const [userSelectedAnswears, setUserSelectedAnswears] = React.useState([]);

  // console.log("userSelectedAnswears: ", userSelectedAnswears);

  function userSelect(correct_or_incorrect) {
    setUserSelectedAnswears((old) => [...old, correct_or_incorrect]);
  }

  function compareAnswers() {
    dataAnswears.forEach((dataItem) => {
      // console.log(element.id);
      let userSelectedItemCorrectStatus = null;
      userSelectedAnswears.forEach((userSelectedItem) => {
        // console.log(item.questionAreaId);
        if (userSelectedItem.questionAreaId === dataItem.id) {
          // console.log("mamy tą samą sekcje, można porówna zawartości");
          // console.log("ID SEKCJI A: ", item.questionAreaId);
          // console.log("ID SEKCJI B: ", element.id);

          // TRZEBA TERAZ NAPISAĆ PORÓWNANIE ELEMENTÓW,
          // TE SAME SEKCJE JUŻ MAMY

          userSelectedItemCorrectStatus = userSelectedItem.correctStatus;
        }
      });

      // console.log("dataItem: ", dataItem);
      dataItem.combined_answers.forEach((combinedAnswer) => {
        if (combinedAnswer.correct === userSelectedItemCorrectStatus) {
          console.log("Poprawna odpowedź");
          console.log(combinedAnswer.value);
        }
      });
    });
  }

  const board = dataAnswears.map((question) => {
    return (
      <Question
        key={question.id}
        questionAreaId={question.id}
        category={question.category}
        question={question.question}
        combinedAnswears={question.combined_answers}
        userSelectedAnswears={userSelectedAnswears}
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
