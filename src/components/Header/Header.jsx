import React from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/argentBankLogo.webp';
import './header.scss';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /* voir si l'utilisateur est connecté avec selector redux */
    const isConnected = useSelector((state) => state.authentification.token);
    /* voir si nom utilisateur récupéré selector redux */
    const userName = useSelector((state) => state.user.userData.userName);


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