import React from "react";
import StartPage from "./components/StartPage";

// API
//https://opentdb.com/api.php?amount=5&category=20

export default function App() {
  const [start, setStart] = React.useState(false);
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    (async () => {
      let response = await fetch(
        "https://opentdb.com/api.php?amount=5&category=20"
      );
      response = await response.json();
      setData(response.results);
    })();
  }, []);

  function handleStart() {
    setStart(!start);
  }

  let questions = null;

  if (data.length > 1) {
    questions = data.map((item, index) => {
      return (
        <div className="question" key={index}>
          <h2>{item.question}</h2>
        </div>
      );
    });
  }

  return (
    <>
      <div className="wrapper">
        {start ? (
          questions === null ? (
            ""
          ) : (
            questions
          )
        ) : (
          <StartPage onClick={handleStart} />
        )}
      </div>
    </>
  );
}
