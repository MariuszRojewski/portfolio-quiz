import React from "react";
import StartPage from "./components/StartPage";
import QuestionsAndAnswears from "./components/QuestionsAndAnswears";

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

  return (
    <>
      <div className="wrapper">
        {start ? (
          data.length > 1 ? (
            <QuestionsAndAnswears data={data} />
          ) : (
            ""
          )
        ) : (
          <StartPage onClick={handleStart} />
        )}
      </div>
    </>
  );
}
