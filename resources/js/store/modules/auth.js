import axios from 'axios';
import authApi from '@/api/authApi';

const state = {
    token: null,
    user: null,
};

const getters = {
    authenticated: state => !!(state.token && state.user),
    token: state => state.token,
    user: state => state.user,
};

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token;
    },
    SET_USER(state, data) {
        state.user = data;
    },
    CLEAR_AUTH_DATA(state) {
        state.token = null;
        state.user = null;
    },
};

const actions = {
    async login({ dispatch }, data) {
        let response = await authApi.login(data);
        return dispatch('attempt', response.access_token);
    },

    async register({ dispatch }, data) {
        let response = await authApi.register(data);
        return dispatch('attempt', response.access_token);
    },

    async attempt({ commit }, token) {
        if (!token) return;

        commit('SET_TOKEN', token);

        try {
            let response = await authApi.me(token);
            commit('SET_USER', response.data);
        } catch (error) {
            commit('CLEAR_AUTH_DATA');
        }
    },

    async logout({ commit }) {
        commit('CLEAR_AUTH_DATA');
    },

    async updateProfile({ commit }, data) {
        let response = await authApi.update(data);
        commit('SET_USER', response.data);
    },

    refreshToken({ commit }, token) {
        commit('SET_TOKEN', token);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
