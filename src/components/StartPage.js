import React from "react";

export default function StartPage({ onClick }) {
  return (
    <div className="start_page">
      <h1 className="start_page--header">Mythology Quiz</h1>
      <p className="start_page--info">
        Test your knowledge of mythology. <br />
        Fill out the quiz and find out what your level of knowledge is!
      </p>
      <button className="start_page--start-button" onClick={onClick}>
        Start
      </button>
    </div>
  );
}
