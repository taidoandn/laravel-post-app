import store from './store';

Echo.channel('posts')
    .listen('PostCreated', e => {
        console.log(e);
        store.dispatch('posts/getPost', e.post.id);
    })
    .listen('PostUpdated', e => {
        console.log(e);
        store.dispatch('posts/refreshPost', e.post.id);
    })
    .listen('PostDeleted', e => {
        console.log(e);
        store.commit('posts/REMOVE_POST', e.post.id);
    })
    .listen('PostLiked', e => {
        console.log(e);
        store.dispatch('posts/refreshPost', e.post.id);
    });
