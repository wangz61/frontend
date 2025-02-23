import axios from 'axios';

const client = axios.create({
    baseURL: import.meta.env.API_URL || 'http://localhost:4000',

});

export default client;
