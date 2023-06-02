import React from "react";

export default function Answear({ onClick, answear, userCheckAnswers }) {
  console.log("answear: ", answear);
  if (userCheckAnswers) {
    return (
      <button
        className={`question--answear ${
          answear.correct ? "correct-answear" : ""
        }`}
        onClick={() => {
          onClick(answear.id);
        }}
      >
        {answear.value}
      </button>
    );
  } else {
    return (
      <button
        className={`question--answear ${answear.select ? "select" : ""}`}
        onClick={() => {
          onClick(answear.id);
        }}
      >
        {answear.value}
      </button>
    );
  }
}
