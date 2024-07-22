import axios from 'axios';

export const getUserData = async (token) => {
    try {
        const response = await axios.post('http://localhost:3001/api/v1/user/profile', {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            const userData = {
                createdAt: response.data.body.createdAt,
                updatedAt: response.data.body.updatedAt,
                id: response.data.body.id,
                email: response.data.body.email,
                firstName: response.data.body.firstName,
                lastName: response.data.body.lastName,
                userName: response.data.body.userName
            }
            return userData
        };
    } catch (error) {
    };
    return false
};