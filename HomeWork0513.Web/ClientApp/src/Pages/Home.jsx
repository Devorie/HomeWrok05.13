import React, {  useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const Home = () => {

    const [bookmarks, setBookmarks] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const getBookmarks = async () => {
            const { data } = await axios.get('/api/bookmark/gettopfive');
            setBookmarks(data);
        }

        getBookmarks();
    }, []);

    return (
        <div style={{ backgroundColor: 'white', minHeight: 1000, paddingTop: 10 }}>
            <div className='mt-5'>
                {user && <h2>Welcome back {user.firstName} {user.lastName} to the Bookmark Application</h2>}
                {user || <h2>Welcome to the Bookmark Application</h2>}
            <h3>Top Five most bookmarked items</h3>
            </div>

            <table className="table table-hover table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Url</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {bookmarks.map(b => (
                        <tr key={b.url} style={{ backgroundColor: "#f8f9fa", borderRadius: "15px" }}>
                            <td>
                                <a href={b.url}>{b.url}</a>
                                </td>
                            <td>{b.count}</td>
                        </tr>
                    ))}
                    )
                </tbody>
            </table>
        </div>
    );
};

export default Home;