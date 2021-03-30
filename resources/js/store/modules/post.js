import axios from 'axios';
import postApi from '@/api/postApi';

const state = {
    posts: [],
};

const getters = {
    posts: state => state.posts,
};

const mutations = {
    SET_POSTS(state, posts) {
        state.posts = posts;
    },

    UPDATE_POST(state, post) {
        let index = state.posts.findIndex(p => p.id === post.id);
        if (index !== -1) {
            state.posts.splice(index, 1, post);
        }
    },

    REMOVE_POST(state, id) {
        state.posts = state.posts.filter(p => p.id !== id);
    },

    PREPEND_POST(state, post) {
        state.posts.unshift(post);
    },
};

const actions = {
    async getPosts({ commit }) {
        let posts = await postApi.getAll();
        commit('SET_POSTS', posts.data.data);
    },

    async getPost({ commit }, id) {
        console.log(id);
        let post = await postApi.get(id);
        commit('PREPEND_POST', post.data.data);
    },

    async refreshPost({ commit }, id) {
        let post = await postApi.get(id);
        commit('UPDATE_POST', post.data.data);
    },

    async createPost({ commit }, data) {
        let post = await postApi.create(data);
        commit('PREPEND_POST', post.data.data);
    },

    async updatePost({ commit }, data) {
        let post = await postApi.update(data);
        commit('UPDATE_POST', post.data.data);
    },

    async deletePost({ commit }, id) {
        let post = await postApi.remove(id);
        commit('REMOVE_POST', id);
    },

    async likePost({ commit }, id) {
        let post = await postApi.like(id);
        commit('UPDATE_POST', post.data.data);
    },

    async unLikePost({ commit }, id) {
        let post = await postApi.unlike(id);
        commit('UPDATE_POST', post.data.data);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
