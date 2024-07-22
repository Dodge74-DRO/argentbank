import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidEmail, isValidPassword } from '../../utils/checkEntriesLogin.jsx';
import { getUserToken } from '../../utils/getUserToken.jsx';
import './loginform.scss';

function LoginForm() {
    /* récupérer les éléments saisis par lk'utilisateur */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    /* indiquer un message en cas d'erreur */
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    /* Asynchronous form function */
    const handleSubmit = async (event) => {
        event.preventDefault();
        /* vérification si format email entré valide ? */
        if (!isValidEmail(email)) {
            setErrorMessage("Invalid email adress");
            return;
        }
        /* vérification si format mot de passe entré valide ? */
        if (!isValidPassword(password)) {
            setErrorMessage("Invalid password");
            return;
        }
        /* soumettre au serveur pour récupération du token */
        const token = await getUserToken(email, password);
        if (token) {
//            dispatch(loginUser(token)); on laisse null pour maj profile dans Header
            sessionStorage.setItem("token", token);
            if (rememberMe) {
                localStorage.setItem("token", token);
            }
            navigate('/profile');
        } else {
            setErrorMessage("Incorrect email/password");
        }
    }


return (
    <section className='sign-in-content'>
        <i className="fa-solid fa-circle-user"></i>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
            <div className='input-wrapper'>
                <label htmlFor='username'>Username</label>
                <input
                    id='username'
                    type='text'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div className='input-wrapper'>
                <label htmlFor='password'>Password</label>
                <input
                    id='password'
                    type='password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <div className='input-remember'>
                <input
                    id='remember-me'
                    type='checkbox'
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                />
                <label htmlFor='remember-me'>Remember me</label>
            </div>
            <button className="sign-in-button">
                Sign In
            </button>
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
        </form>
    </section>
)
}

export default LoginForm