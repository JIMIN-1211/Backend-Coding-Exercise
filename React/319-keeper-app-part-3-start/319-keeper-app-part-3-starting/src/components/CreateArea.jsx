import React, {useState} from "react";

function CreateArea(props) {
  const [input, setInput] = useState({
    title : "", 
    content : ""
  });

  function saveInput(event) {
    setInput((prev)=>{
      return ({
        ...prev, 
        [event.target.name] : event.target.value
        // title : event.target.title, 
        // content : event.target.content
      });
    })
  }

  function addNewNote(event) {
    props.add(input);
    setInput(()=>{
      return ({
        title : "", 
        content : ""
      });
    });
    event.preventDefault();
  }
  
  return (
    <div>
      <form>
        <input name="title" placeholder="Title" onChange={saveInput} value={input.title}/>
        <textarea name="content" placeholder="Take a note..." rows="3" onChange={saveInput} value={input.content}/>
        <button onClick={addNewNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
