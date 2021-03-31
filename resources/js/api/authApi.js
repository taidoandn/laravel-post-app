import axiosClient from './axiosClient';

const authApi = {
    login(data) {
        const url = '/auth/login';
        return axiosClient.post(url, data);
    },

    register(data) {
        const url = '/auth/register';
        return axiosClient.post(url, data);
    },

    me(token) {
        const url = '/auth/me';
        return axiosClient.get(url, {
            headers: { Authorization: 'Bearer ' + token },
        });
    },
};

export default authApi;
