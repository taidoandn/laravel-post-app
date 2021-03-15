import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        errors: null,
        posts: [],
    },

    getters: {
        errors(state) {
            return state.errors;
        },
        posts(state) {
            return state.posts;
        },
    },
    mutations: {
        SET_ERRORS(state, errors) {
            state.errors = errors;
        },
        SET_POSTS(state, posts) {
            state.posts = posts;
        },

        UPDATE_POST(state, post) {
            state.posts = state.posts.map((p) => {
                if (p.id === post.id) {
                    return post;
                }
                return p;
            });
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
            try {
                let post = await axios.post('api/posts', data);
                commit('PREPEND_POST', post.data.data);
            } catch (error) {
                commit('SET_ERRORS', error.response.data.errors);
            }
        },

        async likePost({ commit }, id) {
            let post = await axios.post(`api/posts/${id}/likes`);
            commit('UPDATE_POST', post.data.data);
        },
    },
});
