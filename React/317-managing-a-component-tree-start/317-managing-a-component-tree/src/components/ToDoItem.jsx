import React from "react";

function ToDoItem(props) {
  function handelClick() {}
  console.log(props.id);
  return (
    <li
      onClick={() => {
        console.log("id:", props.id);
        props.onChecked(props.id);
      }}
    >
      {props.text}
    </li>
  );
}

export default ToDoItem;
