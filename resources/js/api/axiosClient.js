import axios from 'axios';
import store from '@/store';
import router from '@/router';

const axiosClient = axios.create({
    baseURL: 'http://localhost/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

axiosClient.interceptors.response.use(
    response => response.data,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401) {
            await store.dispatch('auth/logout');
            router.push({ name: 'login' });
        }
        return Promise.reject(error);
    },
);

axiosClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.common['Authorization'] = `Bearer ${token}`;
        }
        config.headers['X-Socket-ID'] = window.Echo.socketId();
        return config;
    },
    error => Promise.reject(error),
);

export default axiosClient;
