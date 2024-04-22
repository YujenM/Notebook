import React, { useState } from 'react';
import './Css/Addnotes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';

function Model({ closeModel, modelTitle ,addNote}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');

    const handleSubmit = () => {
        addNote(title, description, tag);
        setTitle('');
        setDescription('');
        setTag('');
        closeModel();
    };

    return (
    <div className="ModelBackground" onClick={closeModel}>
        <div className="ModelContent" onClick={(e) => e.stopPropagation()}>
        <div className="ModelHeader">
            <h1 className="ModelTitle">{modelTitle}</h1>
            <button className="CloseButton" onClick={closeModel}>
            <FontAwesomeIcon icon={icon.faTimes} />
            </button>
        </div>
        <div className="ModelBody">
            <label className='titles'>Title</label>
            <input className='modelinput' type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <label className='titles'>Description</label>
            <textarea className='modelinputdes' placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <label className='titles'>Tag</label>
            <input  className='modelinput' type="text" placeholder="Tag" value={tag} onChange={(e) => setTag(e.target.value)}/>
        </div>
        <div className="ModelFooter">
            <button className="SubmitButton" onClick={handleSubmit}>Add Note</button>
        </div>
        </div>
    </div>
    );
}

export default Model;
