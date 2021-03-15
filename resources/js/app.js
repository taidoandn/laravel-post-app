import store from './store';
import highlight from './directives/highlight';
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
require('./echo');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component(
    'timeline',
    require('./components/timeline/Timeline.vue').default,
);
Vue.component(
    'timeline-form',
    require('./components/timeline/TimelineForm.vue').default,
);
Vue.component(
    'timeline-post',
    require('./components/timeline/TimelinePost.vue').default,
);
Vue.component(
    'timeline-post-likes',
    require('./components/timeline/TimelinePostLikes.vue').default,
);
Vue.component(
    'markdown',
    require('./components/timeline/MDEditor.vue').default,
);
Vue.component(
    'markdown-display',
    require('./components/timeline/MarkdownDisplay.vue').default,
);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//

Vue.directive('highlightjs', highlight);

const app = new Vue({
    el: '#app',
    store,
});
