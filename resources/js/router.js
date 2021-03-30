import Vue from 'vue';
import store from './store';
import Router from 'vue-router';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Post from './pages/post/index';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import Profile from './pages/auth/Profile';
import Register from './pages/auth/Register';

Vue.use(Router);

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            requiresGuest: true,
        },
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            requiresGuest: true,
        },
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/',
        name: 'home',
        alias: '/home',
        component: Home,
    },
    {
        path: '/about',
        name: 'about',
        component: About,
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/posts',
        name: 'posts',
        component: Post,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '*',
        name: 'notfound',
        component: NotFound,
    },
];

const router = new Router({
    linkExactActiveClass: 'active',
    routes,
    mode: 'history',
});

router.beforeEach((to, from, next) => {
    const isAuthticated = store.getters['auth/authenticated'];
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiresGuest = to.matched.some(record => record.meta.requiresGuest);

    if (requiresAuth) {
        if (!isAuthticated) {
            next({
                path: '/login',
                query: { redirect: to.path },
            });
        } else {
            next();
        }
    } else if (requiresGuest) {
        if (isAuthticated) {
            next({ name: 'posts' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
