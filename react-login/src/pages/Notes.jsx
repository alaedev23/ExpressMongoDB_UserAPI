import React, { useContext, useState, useRef, useCallback } from 'react';
import Note from '../components/Note.jsx';
import UserContext from '../context/UserContext.jsx';

const Notes = () => {
    const { user, userNotes, setUserNotes } = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);
    const [newNote, setNewNote] = useState({ title: '', content: '', status: '1', author: user.id});
    const noteRefs = useRef([]);

    const handleUpdateNote = useCallback(async (updatedNote) => {
        try {
            const { _id, title, content, status } = updatedNote;
            const response = await fetch(`http://0.0.0.0:8081/nota/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': user.token
                },
                body: JSON.stringify({ _id, title, content, status, author: user.id})
            });
    
            if (response.ok) {
                const updatedNotes = userNotes.map(note => {
                    if (note._id === updatedNote._id) {
                        return updatedNote;
                    }
                    return note;
                });
                setUserNotes(updatedNotes);
            } else {
                throw new Error('Failed to update note');
            }
        } catch (error) {
            console.error('Error updating note:', error);
        }
    }, [user.token, userNotes, setUserNotes]);
    
    const handleDeleteNote = useCallback(async (noteId) => {
        try {
            const response = await fetch(`http://0.0.0.0:8081/nota/delete/${noteId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': user.token
                },
                body: JSON.stringify({ author: user.id })
            });

            if (response.ok) {
                const updatedNotes = userNotes.filter(note => note._id !== noteId);
                setUserNotes(updatedNotes);
            } else {
                throw new Error('Failed to delete note');
            }
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    }, [user.token, userNotes, setUserNotes]);

    const handleCreateNote = async () => {
        try {
            const response = await fetch(`http://0.0.0.0:8081/nota/create`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': user.token
                },
                body: JSON.stringify(newNote)
            });

            if (response.ok) {
                const note = await response.json();
                setUserNotes([...userNotes, note]);
                setNewNote({ title: '', content: '', status: '1', author: user.id });
                setShowModal(false);
            }

        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

    return (
        <div className="container py-5" style={{ minHeight: '910px' }}>
            <h1 className="text-light">User Notes</h1>
            <button className="btn btn-outline-light btn-lg px-5" onClick={() => setShowModal(true)}>Create Note</button>
            <section id="Notes">
                {userNotes.length > 0 ? (
                    userNotes.map((note, index) => {
                        noteRefs.current[index] = noteRefs.current[index] || React.createRef();
                        return (
                            <Note
                                key={index}
                                ref={noteRefs.current[index]}
                                note={note}
                                index={index}
                                onUpdateNote={handleUpdateNote}
                                onDeleteNote={handleDeleteNote}
                            />
                        );
                    })
                ) : (
                    <h3 className='text-light mt-2'>No notes available.</h3>
                )}
            </section>

            {showModal && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark">
                            <div className="modal-header">
                                <h5 className="modal-title text-light">Create Note</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label text-light">Title:</label>
                                    <input type="text" className="form-control" id="title" value={newNote.title} onChange={e => setNewNote({ ...newNote, title: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="content" className="form-label text-light">Text:</label>
                                    <textarea className="form-control" id="content" value={newNote.content} onChange={e => setNewNote({ ...newNote, content: e.target.value })} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleCreateNote}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notes;
