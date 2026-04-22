import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080"
})

apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        return config;
    },
    error => Promise.reject(error)
);

apiClient.interceptors.response.use(
    // since axios only returns successful responses, just return the response
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.clear();
            window.location.href = '/login';
        }
        console.error("API Error:", error.response?.data);
        return Promise.reject(error);
    }
);

export default apiClient;
