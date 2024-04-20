import React from 'react'
import './index.css'

function NoteItem(props) {
    const {note}=props
return (
    <div>
        <div class="notebook-card">
            <div class="title">{note.title}</div>
            <div class="description">{note.description}</div>
            <div class="date">{note.date}</div>
        
        </div>
    </div>
)
}

export default NoteItem
