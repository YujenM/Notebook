import React , { useContext }  from 'react'
import contextvalue from '../context/notes/Notecontext'
import NoteItem from './NoteItem';
function Notes() {
    const context=useContext(contextvalue);
    const{notes}=context;
    return (
        <div>
            {notes.map((note)=>{
                return <NoteItem key={note.id} note={note}/>
            })}
        </div>
    )
}

export default Notes
