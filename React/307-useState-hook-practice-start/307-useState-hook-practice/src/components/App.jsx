import React, {useState} from "react";

let currentTime = new Date().toLocaleTimeString();
console.log(currentTime);

function App() {
  setInterval(getTime, 1000);

  const [time, setTime] = useState(currentTime);

  function getTime() {
      setTime(new Date().toLocaleTimeString())
  }
  
  return (
    <div className="container">
      <h1>{time}</h1>
      <button onClick={getTime}>Get Time</button>
    </div>
  );
}

export default App;
