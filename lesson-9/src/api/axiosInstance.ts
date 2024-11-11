import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/',
    timeout: 10000
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
            localStorage.removeItem('token');
            window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);

export const setAuthToken = (token: string): void => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const removeAuthToken = (): void => {
    axiosInstance.defaults.headers.common['Authorization'] = null;
}

export default axiosInstance;
