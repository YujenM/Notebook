import Notecontext from './Notecontext'
import { useState } from 'react';
const  Notestate=(props)=>{
    const notesInitial= [
        {
        "_id": "661e10db6387122917ef0a06",
        "user": "661c8dca452dc8a36c564624",
        "title": "Batman1",
        "description": "The tale of Batman protecter of gotham 1",
        "tag": "personal",
        "date": "2024-04-16T05:47:07.902Z",
        "__v": 0
        },
        {
        "_id": "661e10e56387122917ef0a08",
        "user": "661c8dca452dc8a36c564624",
        "title": "Superman1",
        "description": "i am superman",
        "tag": "public",
        "date": "2024-04-16T05:47:17.409Z",
        "__v": 0
        }
    ]
    const [notes,setnotes]=useState(notesInitial);
    return(
        <Notecontext.Provider value={{notes,setnotes}}>
            {props.children}
        </Notecontext.Provider>
    )
}
    
    
export  default Notestate;