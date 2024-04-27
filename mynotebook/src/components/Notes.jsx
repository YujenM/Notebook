import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/Notecontext';
import NoteItem from './NoteItem';
import AddNotes from './AddNotes';

const Notes = () => {
    const { notes, getNotes } = useContext(NoteContext);
    const ref = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line 
    }, []);
    const [note, setNote] = useState({etitle:"",edescription:"",etag: ""});
    const updateNote = (currentnote) => {
        ref.current.click();
        setNote({etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
    };

    const toggleModal = () => {
        if (modalRef.current) {
            const isHidden = modalRef.current.classList.contains('hidden');
            if (isHidden) {
                modalRef.current.classList.remove('hidden');
            } else {
                modalRef.current.classList.add('hidden');
            }
        }
    };


    const handleInputChange = (e) => {
      setNote({...note,[e.target.name]:e.target.value})
  };
    const handleSubmit = (e) => {
      console.log("Updating note",note);
      e.preventDefault();
      // editNote(note.id,note.etitle,note.edescription,note.etag);
  };

    return (
        <div>
            <button ref={ref} onClick={toggleModal} className="hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5">
                Toggle modal
            </button>
            <div
                ref={modalRef}
                className="hidden fixed top-0 left-0 z-50 w-full h-[calc(100%-1rem)] flex items-center justify-center">
                <div className="relative bg-white rounded-lg shadow p-4 w-full max-w-md">
                    <div className="flex justify-between items-center border-b p-4">
                        <h3 className="text-xl font-semibold text-gray-900">Edit Note</h3>
                        <button type="button"  className="text-gray-400 hover:bg-gray-200 rounded-lg w-8 h-8" onClick={toggleModal}>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
                                <path d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-4">
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                                <input type="text" name="etitle" id="etitle" onChange={handleInputChange} value={note.etitle} className="bg-gray-50 border-gray-300 text-gray-900 rounded-lg w-full p-2.5" required/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                <input type="text" name="edescription" id="edescription" onChange={handleInputChange} value={note.edescription} className="bg-gray-50 border-gray-300 text-gray-900 rounded-lg w-full p-2.5" required/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Tag</label>
                                <input type="text" name="etag" id="etag" onChange={handleInputChange} value={note.etag} className="bg-gray-50 border-gray-300 text-gray-900 rounded-lg w-full p-2.5" required/>
                            </div>
                            <button type="submit" onClick={handleSubmit} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4">
                                Edit Note
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <AddNotes />
            {notes.map((note) => (
                <NoteItem key={note._id} updateNote={updateNote} note={note} />
            ))}
        </div>
    );
};

export default Notes;
