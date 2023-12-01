// Tasks.jsx
import React, { useState } from 'react';
import './Tasks.css';

const Tasks = ({ name, completed, onCheckboxChange, onDelete, onRename }) => {
    const handleCheckboxChange = () => {
        onCheckboxChange();
    };

    const handleDelete = () => {
        onDelete();
    };

    const [editMode, setEditMode] = useState(false);
    const [editedTaskName, setEditedTaskName] = useState(name);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveEdit = () => {
        onRename(editedTaskName);
        setEditMode(false);
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setEditedTaskName(name);
    };

    return (
        <>
            {!editMode && (
                <div className='section-task'>
                    <div className={`taskname ${completed ? 'completed' : ''}`}>
                        <div className="check-task">
                            <input
                                type="checkbox"
                                checked={completed}
                                onChange={handleCheckboxChange}
                                className="taskbox"
                            />
                            <span>{name}</span>
                        </div>
                        <div className="icons">
                            <button className='edit' onClick={handleEditClick}>
                                <i className="fa-regular fa-pen-to-square"></i>
                            </button>
                            <button className="delete" onClick={handleDelete}>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>

            )}
            {editMode && (
                <form className='taskname editform' onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
                    <div className="newinput ">
                        <div className="check-task">
                            <input
                                type="text"
                                value={editedTaskName}
                                onChange={(e) => setEditedTaskName(e.target.value)}
                            /></div>

                        <div className="icons">
                            <button type="submit" className='save'>
                                <i className="fa-regular fa-save"></i>
                            </button>
                            <button type="button" className='cancel' onClick={handleCancelEdit}>
                            <i class="fa-solid fa-delete-left"></i>
                            </button>
                        </div>
                    </div>

                </form>
            )}
        </>
    );
};

export default Tasks;
