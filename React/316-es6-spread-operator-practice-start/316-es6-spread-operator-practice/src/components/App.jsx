import React, {useState} from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  function handleChange(event) {
    setTodo(event.target.value);
  }

  function handleClick() {
    setTodoList([
      ...todoList, 
      todo
    ]);
    setTodo("");
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={todo}/>
        <button onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {todoList.map((todo)=>{
            console.log(todo);
            return(
              <li>{todo}</li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
