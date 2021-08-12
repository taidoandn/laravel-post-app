import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';
import posts from './modules/posts';
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
        posts,
    },
});

export default store;
