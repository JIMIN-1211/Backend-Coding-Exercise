import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(note) {
    setNotes((prevNotes)=>{
      return [...prevNotes, note]
    });
    console.log(notes);
  }

  function deleteNote(id) {
    console.log(id);
    setNotes((prevNotes)=>{
      const newNote = prevNotes.filter((prevNote, index)=>{ 
        return index !== id //return 빼먹지 말것!!!
      });
      console.log(newNote);
      return newNote;
    });
  }

  return (
    <div>
      <Header />
      <CreateArea add={addNote}/>
      {notes.map((note, index)=>(
        <Note key={index} id={index} title={note.title} content={note.content} delete={deleteNote}/>
      ))}
      <Footer />
    </div>
  );
}

export default App;
