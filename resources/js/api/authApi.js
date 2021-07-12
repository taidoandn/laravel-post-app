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

    update(data){
        const url = '/auth/profile';
        return axiosClient.put(url, data);
    }
};

export default authApi;
