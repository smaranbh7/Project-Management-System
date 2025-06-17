import axios from 'axios';

export const API_BASE_URL = "http://ec2-18-226-4-208.us-east-2.compute.amazonaws.com:5454"

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