import Notecontext from './Notecontext';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; 

const Notestate = (props) => {
    const notesInitial = [
        {
            "_id": "661e10db6387122917ef0a06",
            "user": "661c8dca452dc8a36c564624",
            "title": "Batman1",
            "description": "The tale of Batman, protector of Gotham",
            "tag": "personal",
            "date": "2024-04-16T05:47:07.902Z",
            "__v": 0,
        },
        {
            "_id": "661e10e56387122917ef0a08",
            "user": "661c8dca452dc8a36c564624",
            "title": "Superman1",
            "description": "I am Superman",
            "tag": "public",
            "date": "2024-04-16T05:47:17.409Z",
            "__v": 0,
        },
    ];

    const [notes, setNotes] = useState(notesInitial);

    const addNote = (title, description, tag) => {
        console.log("Adding a new note");
        const note = {
            "_id": uuidv4(),
            "user": "661c8dca452dc8a36c564629",
            "title": title,
            "description": description,
            "tag": tag,
            "date": new Date().toISOString(),
            "__v": 0,
        };
        setNotes(notes.concat(note))
    };
    // Delete a Note
    const deletenote=(id)=>{
        console.log("Deleting the note" +id)
        const newnotes=notes.filter((note)=>{return note._id!==id})
        setNotes(newnotes)
    }
    // Edit a Note
    const editnote=(id)=>{
        console.log("Editing the note" +id)
    }

    return (
        <Notecontext.Provider value={{ notes, addNote,deletenote ,editnote}}>
            {props.children}
        </Notecontext.Provider>
    );
};

export default Notestate;
