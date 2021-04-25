import axios from 'axios';
import postApi from '@/api/postApi';

const state = {
    posts: [],
};

const getters = {
    posts: state => state.posts,
};

const mutations = {
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
        state.posts = [post, ...state.posts];
    },

    PUSH_POSTS(state, posts) {
        let filteredPosts = [...posts].filter(post => {
            return !state.posts.map(p => p.id).includes(post.id);
        });

        state.posts = [...state.posts, ...filteredPosts];
    },
};

const actions = {
    async getPosts({ commit, state }, page) {
        let response = await postApi.getAll({ page });
        commit('PUSH_POSTS', response.data);

        return response;
    },

    async getPost({ commit }, id) {
        let post = await postApi.get(id);
        commit('PREPEND_POST', post.data);
    },

    async refreshPost({ commit }, id) {
        let post = await postApi.get(id);
        commit('UPDATE_POST', post.data);
    },

    async createPost({ commit }, data) {
        let post = await postApi.create(data);
        commit('PREPEND_POST', post.data);
    },

    async updatePost({ commit }, data) {
        let post = await postApi.update(data);
        commit('UPDATE_POST', post.data);
    },

    async deletePost({ commit }, id) {
        let post = await postApi.remove(id);
        commit('REMOVE_POST', id);
    },

    async likePost({ commit }, id) {
        let post = await postApi.like(id);
        commit('UPDATE_POST', post.data);
    },

    async unLikePost({ commit }, id) {
        let post = await postApi.unlike(id);
        commit('UPDATE_POST', post.data);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
