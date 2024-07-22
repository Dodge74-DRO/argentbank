import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { loginUser, logoutUser } from '../../redux/store';
import { userProfile } from '../../redux/store.jsx';
import { useEffect } from 'react';
import { isValidDateToken } from '../../utils/checkEntriesLogin.jsx';
import { getUserData } from '../../utils/getUserData.jsx';

import Logo from '../../assets/images/argentBankLogo.png';
import './header.scss';

function Header() {

    /* voir si l'utilisateur est connecté avec selector redux */
    const isConnected = useSelector((state) => state.authentification.token);
    /* voir si nom utilisateur récupéré selector redux */
    const userName = useSelector((state) => state.user.userData.userName);


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.authentification.token);
    /* si remember me on a un token en local */
    let localToken = localStorage.getItem("token");
    /* si rafraichissement de la page on a un token en session */
    const sessionToken = sessionStorage.getItem("token");
    /* si PAS remember me token local reprend token session */
    if (!localToken && sessionToken) { localToken = sessionToken };
    const location = useLocation();
    
    useEffect(() => {
        async function reconnectUser(localToken) {
            // vérifier la validité du token
            if (localToken !== null && localToken !== undefined) {
                if (!isValidDateToken(localToken)) {
                    console.log("jeton périmé");
                    dispatch(logoutUser("jeton périmé"));
                    navigate('/'); /* retour page accueil */
                } else {
                    if (token === null || token === undefined || userName === null || userName === undefined) {
                        let token = localToken;
                        dispatch(loginUser(token));
                        const userData = await getUserData(token);
                        if (userData) {
                            dispatch(userProfile(userData));
                        } else {
                            console.log("récupération de votre profile impossible");
                        };
                    };
                };
            };
        }; reconnectUser(localToken);
    }, [dispatch, localToken, location, navigate, token, userName]);


    /* déconnexion de l'utilisateur  */
    const logoutHandler = () => {
        //sessionStorage.clear();
        //localStorage.clear();
        dispatch(logoutUser("demande de déconnexion"));
//        console.log("utilisateur déconnecté")
        navigate('/'); /* retour page accueil */
    };

    return (
        <header>
            <h1 className='sr-only'>Argent Bank</h1>
            <nav>
                <Link to="/">
                    <img src={Logo} alt="Bank Logo" />
                </Link>
                {isConnected ? (
                    <div className='connected'>
                        <Link to='/profile'>
                            <i className='fa-solid fa-2x fa-circle-user' />
                            <p>{userName}</p>
                        </Link>
                        <Link to='/' onClick={logoutHandler}>
                            <i className='fa-solid fa-arrow-right-from-bracket' />
                            <p> Sign out </p>
                        </Link>
                    </div>
                ) : (
                    <div className='not-connected'>
                        <Link to='/login' >
                            <i className="fa-solid fa-circle-user"></i>
                            <p>Sign In</p>
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    )
};

export default Header