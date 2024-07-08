import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { produce } from 'immer';

const BookmarkRows = ({ bookmark, onCancelClick, onDeleteBookmark, onEditClick, isEditing, loadBookmarks, onUpdateClick}) => {

    const [editTitle, setEditTitle] = useState('');

    useEffect(() => {
        setEditTitle(bookmark.title)
    }, []);

    const onTitleChange = e => {
        setEditTitle(e.target.value);
    }

    const onCancel = () => {
        onCancelClick();
        setEditTitle(bookmark.title);
    }

    const onUpdate = async () => {
        onUpdateClick(bookmark.id, editTitle);
        setEditTitle(bookmark.title);
    }

    return (
        <tr>
            {isEditing && <td>
                <input type="text" className='form-control' name='title' value={editTitle} onChange={onTitleChange} />
            </td>}
            {isEditing || <td>{bookmark.title}</td>}
            <td>
                <a href={bookmark.url}>{bookmark.url}</a>
            </td>
            {isEditing ||
                <td>
                    <button onClick={onEditClick} className="btn btn-outline-warning">Edit</button>
                    <button onClick={onDeleteBookmark} className="btn btn-outline-danger">Delete</button>
                </td>}

            {isEditing &&
                <td>
                    <button onClick={onUpdate} className="btn btn-outline-success">Update</button>
                    <button onClick={onCancel} className="btn btn-outline-warning">Cancel</button>
                </td>}
        </tr>
    )
}

export default BookmarkRows;