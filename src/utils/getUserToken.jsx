import axios from 'axios';

export const getUserToken = async (email,password) => {
    try {
        const response = await axios.post("http://localhost:3001/api/v1/user/login", {
            email,
            password
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (response.status === 200) {
            const data = response.data;
            const token = data.body.token;
            return token;
        } else {
            console.log(response.status)
        }
    } catch (error) {
    };
    return false
};
