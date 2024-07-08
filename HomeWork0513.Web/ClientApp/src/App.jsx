import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import MyBookmarks from './Pages/MyBookmarks';
import { AuthContextComponent } from './AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Logout from './Pages/Logout';
import AddBookmark from './Pages/AddBookmark';

const App = () => {
    return (
        <AuthContextComponent>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/Login' element={<Login />} />
                    <Route path='/mybookmarks' element={
                        <PrivateRoute>
                            <MyBookmarks />
                        </PrivateRoute>
                    } />
                    <Route path='/addbookmark' element={
                        <PrivateRoute>
                            <AddBookmark />
                        </PrivateRoute>
                    } />
                    <Route path='/logout' element={
                        <PrivateRoute>
                            <Logout />
                        </PrivateRoute>
                    } />
                </Routes>
            </Layout>
        </AuthContextComponent>
    );
}

export default App;