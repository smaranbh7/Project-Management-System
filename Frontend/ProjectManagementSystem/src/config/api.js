import axios from 'axios';

export const API_BASE_URL = "http://localhost:5454"   //AWS API URL "http://18.226.4.208:5454"

const api = axios.create({ baseURL: API_BASE_URL });

// Add request interceptor to dynamically set Authorization header
api.interceptors.request.use(
    (config) => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            config.headers.Authorization = `Bearer ${jwt}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.defaults.headers.post["Content-Type"] = "application/json";

export default api;