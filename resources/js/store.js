import Vuex from "vuex"
import Vue from "vue"
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        posts: []
    },

    getters: {
        posts(state) {
            return state.posts;
        }
    },
    mutations: {
        SET_POSTS(state, posts) {
            state.posts = posts;
        },
        PREPEND_POST(state, post) {
            state.posts.unshift(post);
        },
    },

    actions: {
        async getPosts({ commit }) {
            let posts = await axios.get('api/posts')
            commit('SET_POSTS', posts.data.data)
        },

        async createPost({ commit }, data) {
            let post = await axios.post('api/posts', data)
            commit('PREPEND_POST', post.data.data)
        }
    }

})