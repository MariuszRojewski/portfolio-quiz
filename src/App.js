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

  // zwraca kliknięte id, trzeba teraz jakoś smienić stan
  // albo trzeba ddoać stata w środku, nie wiem... - ale się dowiem :)
  function selectAnswears(id) {
    console.log(id);
  }

  return (
    <>
      <div className="wrapper">
        {start ? (
          data.length > 1 ? (
            <QuestionsAndAnswears data={data} selectAnswears={selectAnswears} />
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
