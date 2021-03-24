import Vue from 'vue';
import Router from 'vue-router';
import Login from './../views/auth/Login';
import Register from './../views/auth/Register';
import Home from './../views/home/index';

Vue.use(Router);

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            guest: true,
            needsAuth: false,
        },
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            guest: true,
            needsAuth: false,
        },
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            guest: false,
            needsAuth: true,
        },
    },
];

export default new Router({
    routes,
    mode: 'history',
});
