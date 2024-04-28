import React, { useState, useContext } from 'react';
import './Css/Addnotes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icon from '@fortawesome/free-solid-svg-icons';
import notecontext from '../context/notes/Notecontext';

function AddNotes() {
    const context = useContext(notecontext);
    const { addNote } = context;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [note, setNote] = useState({title:"",description:"",tag: ""});

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNote((prevNote) => ({
        ...prevNote,
        [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await addNote(note.title,note.description,note.tag);
            handleCloseModal();
        } catch (error) {
            console.error("Error adding note:", error);
            // Display the error message to the user
            alert("Failed to add note: " + error.message);
        }
    };
    

    return (
        <div className="AddNotes">
            <button className="addnotesbtn" onClick={handleOpenModal}>
                Add your Notes <FontAwesomeIcon icon={icon.faPlus} className="Addicon ml-3" />
            </button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Add a Note</h2>
                        <form >
                            <div className="form-group">
                                <label htmlFor="title">Title:</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description:</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="tag">Tag:</label>
                                <input
                                    type="text"
                                    id="tag"
                                    name="tag"
                                    onChange={handleInputChange}
                                />
                            </div>

                            <button type="submit" onClick={handleSubmit}>Add Note</button>
                            <button type="button" onClick={handleCloseModal}>
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddNotes;
