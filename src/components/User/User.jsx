import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from '../../redux/store.jsx';
import { isValidName } from "../../utils/checkEntriesLogin.jsx";
import { putUpdateUserName} from '../../utils/putUpdateUserName.jsx'
import './user.scss';

function User () {
    /* récupérer le token */
    const token = useSelector((state) => state.authentification.token);
    /* récupérer le profiler */
    const userData = useSelector((state) => state.user.userData);
    const [displayForm, setDisplayForm] = useState(true);
    const [userName, setUserName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();

    /* si demande modification profile */
    const handleSubmitUsername = async (event) => {
        event.preventDefault();
        if (!isValidName(userName)) {
            setErrorMessage("Invalid username");
            return;
        } else {
            setErrorMessage("");
        }
        const response = await putUpdateUserName(token, userName)
            if (response) {
                /* tout est ok, envoyer la notification de changement */
                dispatch(updateUsername(userName));
                setDisplayForm(!displayForm);
            } else {
                console.log("Invalid Update Username")
            }

    }
    
    return (
        <div className="header">
            { displayForm ? 
                <div>
                    <h2>Welcome back 
                        <br />
                        {userData.userName} !
                    </h2>
                    <button className="edit-button" onClick={() => setDisplayForm(!displayForm)}>Edit Name</button>
                </div>
                :
                <div>
                    <h2>Edit user info</h2>
                    <form>
                        <div className="edit-input">
                            <label htmlFor="username">User name:</label>
                            <input
                                type="text"
                                id="username"
                                defaultValue={userData.userName}
                                onChange={(event) => setUserName(event.target.value)}
                            />
                        </div>
                        <div className="edit-input">
                            <label htmlFor="firstname">First name:</label>
                            <input
                                type="text"
                                id="firstname" 
                                defaultValue={userData.firstName}
                                disabled={true}
                            />
                        </div>
                        <div className="edit-input">
                            <label htmlFor="lastname">Last name:</label>
                            <input
                                type="text"
                                id="lastname" 
                                defaultValue={userData.lastName}
                                disabled={true}
                            />
                        </div>
                        <div className="buttons">
                            <button className="edit-username-button" onClick={handleSubmitUsername}>Save</button>
                            <button className="edit-username-button" onClick={() => setDisplayForm(!displayForm)}>Cancel</button>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
            }
        </div>
    )
}

export default User