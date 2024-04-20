import React , { useContext }  from 'react'
import contextvalue from '../context/notes/Notecontext'
import NoteItem from './NoteItem';
function Notes() {
    const context=useContext(contextvalue);
    const{notes,setnotes}=context;
    return (
        <div>
            {notes.map((note)=>{
                return <NoteItem note={note}/>
            })}
        </div>
    )
}

export default Notes
