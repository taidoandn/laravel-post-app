import app from '@/app';
import axios from 'axios';
import store from '@/store';
import router from '@/router';

const axiosClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

axiosClient.interceptors.request.use(
    config => {
        NProgress.start();

        const token = store.getters['auth/token'];
        const authenticated = store.getters['auth/authenticated'];

        if (authenticated) {
            config.headers.common['Authorization'] = `Bearer ${token}`;
        }
        config.headers['X-Socket-ID'] = window.Echo.socketId();
        return config;
    },
    error => {
        NProgress.done();
        Promise.reject(error);
    },
);

axiosClient.interceptors.response.use(
    response => {
        NProgress.done();

        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    async error => {
        const config = error.config;
        if (error.response.status === 401 && !error.config._isRetry) {
            error.config._isRetry = true;

            const newToken = error.response.data.access_token;
            store.dispatch('auth/refreshToken', newToken);

            config.headers['Authorization'] = `Bearer ${newToken}`;

            return axiosClient(config);
        }
        if (error.response.status === 401 && error.config._isRetry) {
            await store.dispatch('auth/logout');
            router.push({ name: 'login' });
        }

        NProgress.done();
        return Promise.reject(error);
    },
);

export default axiosClient;
