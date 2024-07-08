import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddBookmark = () => {

    const navigate = useNavigate();
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');

    const onSubmitClick = async () => {
        await axios.post('/api/bookmark/addbookmark', { url, title});
        navigate('/');
    }

    return (
        <div style={{ minHeight: 1000, paddingTop: 200 }}>
            <div className="row">
                <div className='col-md-6 offset-md-3 card bg-light p-4'>
                    <h2>Add Bookmark</h2>
                    <input type="text" className='form-control' name='url' value={url} onChange={e => setUrl(e.target.value)} placeholder="Link" />
                    <br />
                    <input type="text" className='form-control' name='title' value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
                    <br />
                    <button className='btn btn-primary btn-lg btn-block' onClick={onSubmitClick}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default AddBookmark;