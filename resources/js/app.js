import store from './store';
import router from './router';
import App from './layouts/App';
import highlight from './directives/highlight';
import TextareaAutosize from 'vue-textarea-autosize';
import VueObserveVisibility from 'vue-observe-visibility';

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

window.NProgress = require('nprogress');

Vue.use(TextareaAutosize);
Vue.use(VueObserveVisibility);
Vue.directive('highlightjs', highlight);

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

const app = new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});
