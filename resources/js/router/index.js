import Vue from 'vue';
import store from '@/store';
import Router from 'vue-router';
import Login from '@/views/auth/Login';
import Register from '@/views/auth/Register';
import Home from '@/views/home/index';

Vue.use(Router);

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        beforeEnter: (to, from, next) => {
            console.log(store.getters['auth/authenticated']);
            if (!store.getters['auth/authenticated']) {
                return next('/login');
            }
            next();
        },
    },
];

export default new Router({
    routes,
    mode: 'history',
});
