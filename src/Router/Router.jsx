import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import Home from '../pages/Home/Home.jsx';
import Login from '../pages/Login/Login.jsx';
import Profile from '../pages/Profile/Profile.jsx';
import Error from '../pages/Error/Error.jsx';

export default function DefaultRouter() {

    /* voir si l'utilisateur est connecté avec selector redux */
    const isConnected = useSelector((state) => state.authentification.token);

    return (
        <div>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='login' element={<Login />} />
                <Route   /* attention si on vient suite click sur icone user-circle soit LOGIN soit PROPFILE */
                    path={isConnected ? 'profile' : 'login'}
                    element={isConnected ? <Profile /> : <Navigate to="/login" />}
                />
                <Route path='*' element={<Error />} />
            </Routes>
            <Footer />
        </div>
    )
}