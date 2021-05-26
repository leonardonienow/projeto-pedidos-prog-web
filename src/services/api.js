import axios from 'axios';

const api = axios.create({
    //producao
    //baseURL: 'https://gerenciadorapi.vercel.app'
    //teste
    baseURL: 'http://localhost:3306'
});

api.defaults.timeout = 5000;

export default api;