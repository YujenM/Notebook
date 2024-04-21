import React from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';

function NoteItem(props) {
    const { note } = props;

    return (
        <div className="notebook-card">
            <div className="notebook-card-header">
                <div className="title">{note.title}</div>
                <div className="icons">
                    <FontAwesomeIcon icon={icon.faTrash} className="icon" />
                    <FontAwesomeIcon icon={icon.faPenToSquare} className="icon" />
                </div>
            </div>
            <div className="description">{note.description}</div>
            <div className="date">{note.date}</div>
        </div>
    );
}

export default NoteItem;
