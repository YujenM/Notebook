import React, { useState, useContext } from 'react';
import './Css/Addnotes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import Model from './Model';
import notecontext from '../context/notes/Notecontext';


function AddNotes() {
    const context=new useContext(notecontext);
    const{addNote }=context;
    const [isModelOpen, setModelOpen] = useState(false);

    const toggleModel = () => {
    setModelOpen(!isModelOpen);
    };

    return (
    <div className='AddNotes'>
        <button className='addnotesbtn' onClick={toggleModel}> Add your Notes <FontAwesomeIcon icon={icon.faPlus} className='Addicon ml-3' />
        </button>
        {isModelOpen && (
        <Model closeModel={toggleModel} modelTitle={"Add New Note"}  addNote={addNote}/>
        )}
    </div>
    );
    }

export default AddNotes;
