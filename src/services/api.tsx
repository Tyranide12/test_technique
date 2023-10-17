import axios from 'axios';

const API = axios.create({ withCredentials: false, baseURL: "http://localhost:8000" });

export default API;