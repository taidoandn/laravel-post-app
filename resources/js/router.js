import Vue from 'vue';
import store from './store';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "routes/login" */ './pages/auth/Login'),
        meta: {
            requiresGuest: true,
        },
    },
    {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "routes/register" */ './pages/auth/Register'),
        meta: {
            requiresGuest: true,
        },
    },
    {
        path: '/',
        name: 'home',
        alias: '/home',
        component: () => import(/* webpackChunkName: "routes/home" */ './pages/Home'),
    },
    {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "routes/about" */ './pages/About'),
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "routes/profile" */ './pages/auth/Profile'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/posts',
        name: 'posts',
        component: () => import(/* webpackChunkName: "routes/posts" */ './pages/post/Index'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '*',
        name: 'notfound',
        component: () => import(/* webpackChunkName: "routes/notfound" */ './pages/NotFound'),
    },
];

const router = new Router({
    linkExactActiveClass: 'active',
    routes,
    mode: 'history',
});

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        NProgress.start();
    }
    next();
});

router.afterEach((to, from) => {
    // Complete the animation of the route progress bar.
    NProgress.done();
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
