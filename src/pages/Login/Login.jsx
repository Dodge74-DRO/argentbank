import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import './login.scss';

/* Login page */
function Login() {
    return (
        <div className='loginPage'>
            <main className='bg-dark'>
                {/* Returns form component */}
                < LoginForm />
            </main>
        </div>

    )
}

export default Login;