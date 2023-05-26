import React from "react";

export default function Answear({ onClick, answear, checkUserSelected }) {
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
