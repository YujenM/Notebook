import React , { useContext, useEffect }  from 'react'
import contextvalue from '../context/notes/Notecontext'
import NoteItem from './NoteItem';
import AddNotes from './AddNotes';
function Notes() {
    const context=useContext(contextvalue);
    const{notes,getNotes}=context;
    useEffect(() => {
        getNotes(); 
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div>
            <AddNotes/>
            {notes.map((note)=>{
                return <NoteItem key={note._id} note={note}/>
            })}
        </div>
    )
}

export default Notes
