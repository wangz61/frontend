import axios from 'axios';

const client = axios.create({
    // baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
    baseURL: 'https://backend-v9ow.onrender.com',

});

export default client;
