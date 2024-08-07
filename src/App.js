import React from 'react';
import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Error from './pages/Error/Error';
import { loginUser, logoutUser } from './redux/store.jsx';
import { isValidDateToken } from './utils/checkEntriesLogin.jsx';
import { getUserData } from './utils/getUserData.jsx';
import { userProfile } from './redux/store.jsx';



export default function App() {
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