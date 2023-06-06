import React from "react";

export default function Answear({ onClick, answear, userCheckAnswers }) {
  function decodeHTMLEntities(text) {
    var textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }

  if (userCheckAnswers) {
    if (answear.select === answear.correct) {
      return (
        <button
          className={`question--answear ${
            answear.select ? "saved-select" : ""
          }`}
        >
          {decodeHTMLEntities(answear.value)}
        </button>
      );
    } else {
      return (
        <button
          className={`question--answear ${
            answear.select ? "select" : "correct-answear"
          }`}
        >
          {decodeHTMLEntities(answear.value)}
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
        {decodeHTMLEntities(answear.value)}
      </button>
    );
  }
}
