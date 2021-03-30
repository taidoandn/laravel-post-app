import axios from 'axios';

const postApi = {
    getAll(params) {
        const url = 'api/posts';
        return axios.get(url, { params });
    },

    get(id) {
        const url = `api/posts/${id}`;
        return axios.get(url);
    },

    create(data) {
        const url = 'api/posts';
        return axios.post(url, data);
    },

    update(data) {
        const url = `api/posts/${data.id}`;
        return axios.put(url, data);
    },

    remove(id) {
        const url = `api/posts/${id}`;
        return axios.delete(url);
    },

    like(id) {
        const url = `api/posts/${id}/likes`;
        return axios.post(url);
    },

    unlike(id) {
        const url = `api/posts/${id}/likes`;
        return axios.delete(url);
    },
};

export default postApi;
