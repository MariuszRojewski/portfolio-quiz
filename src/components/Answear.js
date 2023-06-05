import React from "react";

export default function Answear({
  onClick,
  answear,
  userCheckAnswers,
  userPoints,
}) {
  if (userCheckAnswers) {
    if (answear.select === answear.correct) {
      return (
        <button
          className={`question--answear ${
            answear.select ? "saved-select" : ""
          }`}
        >
          {answear.value}
        </button>
      );
    } else {
      return (
        <button
          className={`question--answear ${
            answear.select ? "select" : "correct-answear"
          }`}
        >
          {answear.value}
        </button>
      );
    }
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
