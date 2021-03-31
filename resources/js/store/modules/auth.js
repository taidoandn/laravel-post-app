import axios from 'axios';
import authApi from '@/api/authApi';

const state = {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
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
        dispatch('attempt', response.access_token);
    },

    async attempt({ commit }, token) {
        if (!token) {
            return;
        }
        localStorage.setItem('token', token);
        commit('SET_TOKEN', token);
        try {
            let response = await authApi.me(token);
            localStorage.setItem('user', JSON.stringify(response.data));
            commit('SET_USER', response.data);
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            commit('CLEAR_AUTH_DATA');
        }
    },

    async logout({ commit }) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        commit('CLEAR_AUTH_DATA');
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
