import store from './store';

Echo.channel('posts')
    .listen('PostCreated', e => {
        store.dispatch('getPost', e.post.id);
    })
    .listen('PostUpdated', e => {
        store.dispatch('refreshPost', e.post.id);
    })
    .listen('PostDeleted', e => {
        store.commit('REMOVE_POST', e.post.id);
    })
    .listen('PostLiked', e => {
        store.dispatch('refreshPost', e.post.id);
    });
