import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        selectedPostId: null,
        posts: [],
    },

    getters: {
        selectedPostId(state) {
            return state.selectedPostId;
        },
        posts(state) {
            return state.posts;
        },
    },
    mutations: {
        SET_SELECTED_POST_ID(state, id) {
            state.selectedPostId = id;
        },
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

        createPost({ commit }, data) {
            return axios.post('api/posts', data).then((res) => {
                commit('PREPEND_POST', res.data.data);
            });
        },

        updatePost({ commit }, post) {
            return axios
                .put(`api/posts/${post.id}`, {
                    body: post.body,
                })
                .then((res) => {
                    commit('UPDATE_POST', res.data.data);
                });
        },

        deletePost({ commit }, id) {
            return axios
                .delete(`api/posts/${id}`)
                .then((res) => {
                    commit('REMOVE_POST', id);
                })
                .catch((error) => console.log(error));
        },

        setSelectedPostId({ commit }, id) {
            commit('SET_SELECTED_POST_ID', id);
        },

        async likePost({ commit }, id) {
            let post = await axios.post(`api/posts/${id}/likes`);
            commit('UPDATE_POST', post.data.data);
        },
    },
});
