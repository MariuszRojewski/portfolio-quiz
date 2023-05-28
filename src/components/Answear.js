import React from "react";

export default function Answear({ onClick, answear }) {
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
