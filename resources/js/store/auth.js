import axios from 'axios';

export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('token') || null,
        user: JSON.parse(localStorage.getItem('user')) || null,
    },
    getters: {
        authenticated(state) {
            return !!(state.token && state.user);
        },
        token(state) {
            return state.token;
        },
        user(state) {
            return state.user;
        },
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_USER(state, data) {
            state.user = data;
        },
    },
    actions: {
        async login({ dispatch }, data) {
            let response = await axios.post('api/auth/login', data);
            dispatch('attemp', response.data.access_token);
        },

        async attemp({ commit }, token) {
            if (!token) {
                return;
            }
            localStorage.setItem('token', token);
            commit('SET_TOKEN', token);
            try {
                let response = await axios.get('api/auth/me', {
                    headers: { Authorization: 'Bearer ' + token },
                });
                localStorage.setItem('user', JSON.stringify(response.data));
                commit('SET_USER', response.data);
            } catch (error) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                commit('SET_USER', null);
                commit('SET_TOKEN', null);
            }
        },

        async logout({ commit }) {
            try {
                await axios.post('/api/auth/logout');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                commit('SET_USER', null);
                commit('SET_TOKEN', null);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
