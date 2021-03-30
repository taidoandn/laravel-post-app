import router from './router';
import store from './store';
import highlight from './directives/highlight';
import TextareaAutosize from 'vue-textarea-autosize';
import App from './layouts/App';

require('./bootstrap');
require('./echo');

window.Vue = require('vue');
window.toastr = require('toastr');
toastr.options = {
    progressBar: true,
    positionClass: 'toast-top-right',
    preventDuplicates: false,
    showDuration: '300',
    hideDuration: '1000',
    timeOut: '3000',
};

Vue.use(TextareaAutosize);
Vue.directive('highlightjs', highlight);

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

axios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401) {
            await store.dispatch('auth/logout');
            router.push({ name: 'home' });
        }
        return Promise.reject(error);
    },
);

axios.interceptors.request.use(
    config => {
        const token = store.getters['auth/token'];
        if (token) {
            config.headers.common = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            };
        }
        return config;
    },
    error => Promise.reject(error),
);
const app = new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});
