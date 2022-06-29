import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AlertMessage from './components/AlertMessage';
import Nav from './components/Nav';
import CreatePost from './views/CreatePost';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import SinglePost from './views/SinglePost';

export default function App() {
    const [message, setMessage] = useState(null);
    const [category, setCategory] = useState(null);
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false)

    const flashMessage = (message, category) => {
        setMessage(message);
        setCategory(category);
    }

    const logUserIn = () => setLoggedIn(true);
    const logUserOut = () => {
        flashMessage('You have successfully logged out', 'warning');
        localStorage.removeItem('token');
        setLoggedIn(false)
    };

    return (
        <>
            <Nav loggedIn={loggedIn} logUserOut={logUserOut} />
            <div className='container'>
                {message ? <AlertMessage message={message} category={category} flashMessage={flashMessage} /> : null}
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/register' element={<Register flashMessage={flashMessage} />} />
                    <Route path='/login' element={<Login flashMessage={flashMessage} logUserIn={logUserIn} />} />
                    <Route path='/create' element={<CreatePost flashMessage={flashMessage} loggedIn={loggedIn} />} />
                    <Route path='/posts/:postId' element={<SinglePost flashMessage={flashMessage} loggedIn={loggedIn} />} />
                </Routes>
            </div>
        </>
    )
}