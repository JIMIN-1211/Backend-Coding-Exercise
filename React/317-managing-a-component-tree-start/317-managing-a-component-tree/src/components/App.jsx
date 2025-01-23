import React, { useState } from "react";
import ToDoItem from "./ToDoItem";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem() {
    setItems((prevItems) => {
      return [...prevItems, inputText];
    });
    setInputText("");
  }

  function deleteItem(index) {
    setItems((prev) => {
      return prev.filter((item, itemIndex) => itemIndex !== index);
      // const newItems = [...prev];
      // newItems.splice(index, 1);
      // return newItems;
      //splice()함수는 반환값이 없지만 배열에 직접 수정한다. 
      //반면 filter()는 배열에 직접 수정할 순 없지만 걸러낸 배열을 반환한다. (새로운 배열)
    });
    console.log(items);
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={inputText} />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <ToDoItem
              text={todoItem}
              onChecked={deleteItem}
              key={index}
              id={index}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
