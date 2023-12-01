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
                <div className={`taskname ${completed ? 'completed' : ''}`}>
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={handleCheckboxChange}
                        className="taskbox"
                    />
                    {name}
                    <button className='edit' onClick={handleEditClick}>
                        <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button className="delete" onClick={handleDelete}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            )}
            {editMode && (
                <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
                    <input
                        type="text"
                        value={editedTaskName}
                        onChange={(e) => setEditedTaskName(e.target.value)}
                    />
                    <button type="submit" className='save'>
                        <i className="fa-regular fa-save"></i>
                    </button>
                    <button type="button" className='cancel' onClick={handleCancelEdit}>
                        <i className="fa-regular fa-times"></i>
                    </button>
                </form>
            )}
        </>
    );
};

export default Tasks;
