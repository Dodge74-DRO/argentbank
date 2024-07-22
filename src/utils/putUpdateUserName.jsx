import axios from 'axios';

export const putUpdateUserName = async (token, userName) => {
    try {
        const response = await axios.put('http://localhost:3001/api/v1/user/profile', 
            {
                userName: userName
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        if (response.status === 200) {
            return true;
        } else {
            console.log(response.status)
        }
    } catch (error) {
        console.error(error);
    };
    return false
}
