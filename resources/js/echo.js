import store from './store';

Echo.channel('posts')
    .listen('PostCreated', e => {
        console.log(e);
        store.dispatch('post/getPost', e.post.id);
    })
    .listen('PostUpdated', e => {
        console.log(e);
        store.dispatch('post/refreshPost', e.post.id);
    })
    .listen('PostDeleted', e => {
        console.log(e);
        store.commit('post/REMOVE_POST', e.post.id);
    })
    .listen('PostLiked', e => {
        console.log(e);
        store.dispatch('post/refreshPost', e.post.id);
    });
