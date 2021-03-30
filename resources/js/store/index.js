import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';
import post from './modules/post';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
        post,
    },
});

export default store;
