import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        posts: [],
    },

    getters: {
        posts(state) {
            return state.posts;
        },
    },
    mutations: {
        SET_POSTS(state, posts) {
            state.posts = posts;
        },

        UPDATE_POST(state, post) {
            let index = state.posts.findIndex((p) => p.id === post.id);
            if (index !== -1) {
                state.posts.splice(index, 1, post);
            }
        },

        REMOVE_POST(state, id) {
            state.posts = state.posts.filter((p) => p.id !== id);
        },

        PREPEND_POST(state, post) {
            state.posts.unshift(post);
        },
    },

    actions: {
        async getPosts({ commit }) {
            let posts = await axios.get('api/posts');
            commit('SET_POSTS', posts.data.data);
        },

        async getPost({ commit }, id) {
            let post = await axios.get(`api/posts/${id}`);
            commit('PREPEND_POST', post.data.data);
        },

        async refreshPost({ commit }, id) {
            let post = await axios.get(`api/posts/${id}`);
            commit('UPDATE_POST', post.data.data);
        },

        async createPost({ commit }, data) {
            let post = await axios.post('api/posts', data);
            commit('PREPEND_POST', post.data.data);
        },

        async updatePost({ commit }, data) {
            let post = await axios.put(`api/posts/${data.id}`, {
                body: data.body,
            });
            commit('UPDATE_POST', post.data.data);
        },

        async deletePost({ commit }, id) {
            let post = await axios.delete(`api/posts/${id}`);
            commit('REMOVE_POST', id);
        },

        async likePost({ commit }, id) {
            let post = await axios.post(`api/posts/${id}/likes`);
            commit('UPDATE_POST', post.data.data);
        },

        async unLikePost({ commit }, id) {
            let post = await axios.delete(`api/posts/${id}/likes`);
            commit('UPDATE_POST', post.data.data);
        },
    },
});
