import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BookmarkRows from '../components/BookmarkRows';

const MyBookmarks = () => {
    const { user } = useAuth();
    const [bookmarks, setBookmarks] = useState([]);
    const [editIds, setEditIds] = useState([])

    useEffect(() => {
        loadBookmarks();
    }, []);

    const onUpdateClick = async (id, title) => {
        await axios.post('/api/bookmark/updatetitle', { id, title});
        setEditIds(editIds.filter(Bid => Bid !== id));
        await loadBookmarks();
    }

    const loadBookmarks = async () => {
        const { data } = await axios.get('/api/bookmark/getmybookmarks');
        setBookmarks(data);
    }
    

    const onDeleteBookmark = async (id) => {
        await axios.post('/api/bookmark/deletebookmark', { id });
        await loadBookmarks();

    }

    const onEditClick = (id) => {
        setEditIds([...editIds, id])

    }

    const onCancelClick = (id) => {
        setEditIds(editIds.filter(Bid => Bid !== id));

    }

    return (
        <div style={{ marginTop: 70 }}>
            <div className="row">
                <div className="col-md-12">
                    <h1>Welcome back {user.firstName} {user.lastName}</h1>
                    <Link to='/addbookmark' className="btn btn-primary btn-block">
                        Add Bookmark
                    </Link>
                </div>
            </div>
            <div className="row" style={{ marginTop: 20 }}>
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Url</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookmarks.map(b => <BookmarkRows key={b.id}
                            bookmark={b}
                            onCancelClick={() => onCancelClick(b.id)}
                            onDeleteBookmark={() => onDeleteBookmark(b.id)}
                            onEditClick={() => onEditClick(b.id)}
                            isEditing={editIds.includes(b.id)}
                            loadBookmarks={loadBookmarks}
                            onUpdateClick={onUpdateClick}
                        />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default MyBookmarks;