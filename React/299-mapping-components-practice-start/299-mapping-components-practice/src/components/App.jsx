import React from "react";
import emojipedia from "../emojipedia";
import Entry from "./Entry";

function createEntry(emoji) {
  return(
    <Entry 
      id={emoji.id}
      key={emoji.key}
      emoji={emoji.emoji}
      name={emoji.name}
      meaning={emoji.meaning}
    />
  );
}

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">
        {emojipedia.map(createEntry)}
      </dl>
    </div>
  );
}

export default App;
