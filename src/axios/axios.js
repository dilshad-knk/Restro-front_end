import axios from 'axios';

const instance = axios.create({
    baseURL:'https://restro-backend-nxpz.onrender.com'
});

export default instance;
