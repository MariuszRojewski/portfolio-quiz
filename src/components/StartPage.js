import React from "react";

export default function StartPage({ onClick }) {
  return (
    <div className="start_page">
      <h1 className="start_page--header">Start Quiz</h1>
      <p className="start_page--info">
        Witaj w naszym quize z wiedzy ogólnej :)
        <br /> Sprawdź swoją wiedzę!
      </p>
      <button className="start_page--start-button" onClick={onClick}>
        Start
      </button>
    </div>
  );
}
