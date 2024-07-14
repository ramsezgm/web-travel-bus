import apiClient from './apiClient';

export const getUserById = async (userId) => {
    try {
        const response = await apiClient.get(`/user/get-user/${userId}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const getUsers = async () => {
    try {
        const response = await apiClient.get('/user/get-users');
        return response.data.data;
    } catch (error) {
        throw error;
    }
};