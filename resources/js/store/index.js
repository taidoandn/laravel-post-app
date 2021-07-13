import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';
import post from './modules/post';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [
        createPersistedState({
            paths : ['auth'],
            reducer(val) {
                if (!val.auth.token) {
                    return {};
                }
                return val;
            },
        }),
    ],
    modules: {
        auth,
        post,
    },
});

export default store;
