import axiosClient from './axiosClient';

const postApi = {
    getAll(params) {
        const url = '/posts';
        return axiosClient.get(url, { params });
    },

    get(id) {
        const url = `/posts/${id}`;
        return axiosClient.get(url);
    },

    create(data) {
        const url = '/posts';
        return axiosClient.post(url, data);
    },

    update(data) {
        const url = `/posts/${data.id}`;
        return axiosClient.put(url, data);
    },

    remove(id) {
        const url = `/posts/${id}`;
        return axiosClient.delete(url);
    },

    like(id) {
        const url = `/posts/${id}/likes`;
        return axiosClient.post(url);
    },

    unlike(id) {
        const url = `/posts/${id}/likes`;
        return axiosClient.delete(url);
    },
};

export default postApi;
