import { jwtDecode } from 'jwt-decode';


export const isValidName = (name) => {
    const formatName = /^[a-zA-Z]+(?:[-']?[a-zA-Z]+)*$/;
    return formatName.test(name);
};


export const isValidEmail = (email) => {
    const formatEmail = /^\S+@\S+\.\S+$/;
    return formatEmail.test(email);
};

export const isValidPassword = (password) => {
    const formatPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/;
    return formatPassword.test(password);
};

export const isValidDateToken = (token) => {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Le temps actuel en secondes
    // Vérifier si le token est expiré
    let isValid = true
    /*console.log(decoded.exp,currentTime)*/
    if (decoded.exp < currentTime) {
        isValid = false
    };
    return (isValid);
};