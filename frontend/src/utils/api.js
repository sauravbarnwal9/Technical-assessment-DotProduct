// utils/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Change this to your backend URL

const api = axios.create({
    baseURL: API_URL,
});

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        api.defaults.headers.common['Accept-Language'] = `en`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};


export default api;
