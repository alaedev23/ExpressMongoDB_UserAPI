import React, { useState, forwardRef, useCallback } from 'react';
import Button from './Button.jsx';
import "./Note.css";

const Note = forwardRef(({ note, index, onUpdateNote, onDeleteNote }, ref) => {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [status, setStatus] = useState(note.status);
    const [show, setShow] = useState(false);

    const handleUpdateNote = useCallback(() => {
        onUpdateNote({ _id: note._id, title, content, status, author : note.author });
    }, [onUpdateNote, note._id, title, content, status, note.author]);

    const handleDeleteNote = useCallback(() => {
        setShow(true);
    }, []);

    const handleClose = useCallback(() => setShow(false), []);
    const handleConfirm = useCallback(() => {
        onDeleteNote(note._id);
        setShow(false);
    }, [onDeleteNote, note._id]);

    return (
        <div ref={ref} className="row justify-content-center">
            <div className="col-md-8">
                <div className="card bg-dark text-white mt-3">
                    <div className="card-body p-5">
                        <h3 className="text-light">Note {index + 1}:</h3>
                        <div className="mb-3">
                            <label htmlFor={`title${index}`} className="form-label text-light">Title:</label>
                            <input type="text" className="form-control" id={`title${index}`} value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={`text${index}`} className="form-label text-light">Text:</label>
                            <textarea className="form-control" id={`text${index}`} value={content} onChange={e => setContent(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={`status${index}`} className="form-label text-light">Status:</label>
                            <select className="form-select" id={`status${index}`} value={status} onChange={e => setStatus(e.target.value)}>
                                <option value="1">Pending</option>
                                <option value="2">Completed</option>
                            </select>
                        </div>
                        <div className="text-center">
                            <Button onClick={handleUpdateNote} className="btn btn-outline-light me-2">Update</Button>
                            <Button onClick={handleDeleteNote} className="btn btn-outline-danger">Delete</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: show ? 'rgba(0, 0, 0, 0.5)' : 'transparent' }}>
                <div className="modal-dialog">
                    <div className="modal-content bg-dark text-light">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirmación</h5>
                            <button type="button" className="btn-close text-light" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            <p>¿Estás seguro de que quieres borrar esta nota?</p>
                        </div>
                        <div className="modal-footer">
                            <Button onClick={handleClose} className="btn btn-secondary">Cancelar</Button>
                            <Button onClick={handleConfirm} className="btn btn-danger">Borrar</Button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
});

export default React.memo(Note);
