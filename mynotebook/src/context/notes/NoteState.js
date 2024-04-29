import Notecontext from './Notecontext';
import { useState } from 'react'; 

const Notestate = (props) => {
    const host="http://localhost:2000"
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

// Get all Notes
const getNotes =async()  => {
    try{
        const response=await fetch(`${host}/api/notes/fetchallnotes`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxYzhkY2E0NTJkYzhhMzZjNTY0NjI0In0sImlhdCI6MTcxMzE0NzMzOH0.V3sNyThi07fG6UiSobuTaRytVPqKbXesiNEChHHV8aQ',
            },
        })
        const json= await response.json();
        console.log(json);
        setNotes(json);
    }catch(err){
        console.log("Error:"+err)
    }
};





// add notes
const addNote =async(title,description,tag)  => {
    const response= await fetch(`${host}/api/notes/addnote`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxYzhkY2E0NTJkYzhhMzZjNTY0NjI0In0sImlhdCI6MTcxMzE1MDI3Nn0.jkBQLPPi6M-1WMoqjGVs_XZRadaVBslsS270H5fU2o0',
        },
        body: JSON.stringify({title,description,tag})
    })
    const note= await response.json();
    setNotes(notes.concat(note))
};

// Delete a Note
const deletenote=async (id)=>{
    const response = await fetch(`${host}/api/notes/deletenode/${id}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxYzhkY2E0NTJkYzhhMzZjNTY0NjI0In0sImlhdCI6MTcxMzE0NzMzOH0.V3sNyThi07fG6UiSobuTaRytVPqKbXesiNEChHHV8aQ',
        }, 
    });
    const json=response.json();
    console.log(json)
    console.log("Deleting the note" +id)
    const newnotes=notes.filter((note)=>{return note._id!==id})
    setNotes(newnotes)
}
// Edit a Note
const editnote = async (id, title, description, tag) => {
    // console.log(`Editing the note with id: ${id}`);

    // API call to update the note
    const response = await fetch(`${host}/api/notes/updatenode/${id}`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxYzhkY2E0NTJkYzhhMzZjNTY0NjI0In0sImlhdCI6MTcxMzE0NzMzOH0.V3sNyThi07fG6UiSobuTaRytVPqKbXesiNEChHHV8aQ',
        },
        body: JSON.stringify({ title, description, tag }), 
    });

    const responseJson = await response.json(); 
    console.log('Edit response:', responseJson);
    // edit a note
    let newnote=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++){
        const element = notes[index];
        if (element._id === id){
            newnote[index].title=title;
            newnote[index].description=description;
            newnote[index].tag=tag;
            break;
        }
        
    }
    // console.log(newnote);
    setNotes(newnote);
};

return (
    <Notecontext.Provider value={{ notes, addNote, deletenote, editnote,getNotes }}>
        {props.children}
    </Notecontext.Provider>
);
};

export default Notestate;
