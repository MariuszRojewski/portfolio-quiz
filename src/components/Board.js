import React from "react";
import Question from "./Question";

export default function QuestionsAndAnswears({ data }) {
  const [allAnswears, setAllAnswears] = React.useState(data);
  const combinedAnswears = [];
  // const combinedAnswears = allAnswears[0].correct_answer[0].concat(
  //   allAnswears.incorrect_answer[0]
  // );

  for (let i = 0; i < allAnswears.length; i++) {
    // MUSISZ JAKOŚ POŁACZYĆ TE OBIEKTY W CAŁOŚĆ, TAK ABY POWSTAŁ
    // NOWY SCALONY OBIKET combinedAnswears
    let all = [];

    all.push(allAnswears[i].correct_answer);
    allAnswears[i].incorrect_answer.forEach((item) => {
      all.push(item);
    });

    console.log(all);

    // console.log(correct);
    // console.log(incorrect);
  }
  // console.log("Correct: ", allAnswears[0].correct_answer);
  // console.log("Incorrect: ", allAnswears[0].incorrect_answer);

  // console.log(combinedAnswears);

  const board = allAnswears.map((question) => {
    return null;
    // <Question
    //   key={question.id}
    //   id={question.id}
    //   category={question.category}
    //   question={question.question}
    //   combinedAnswears={combinedAnswears}
    // />
  });

  return (
    <div>
      {board}
      <button>Cheack Answears</button>
    </div>
  );
}
