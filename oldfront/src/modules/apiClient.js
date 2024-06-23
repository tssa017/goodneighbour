import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true, // To include cookies with requests
});

// Attach JWT token to headers if available
const attachToken = () => {
    const token = localStorage.getItem('jwt_token'); // Replace with your token storage method
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
};

// Intercept requests and attach token
apiClient.interceptors.request.use(
    (config) => {
        attachToken();
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
