<template>
    <div>
        <add-form />
        <div class="timeline__posts">
            <post v-for="post in posts" :key="post.id" :post="post" />
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import axios from 'axios';
    import Post from './Post.vue';
    import AddForm from './AddForm.vue';

    export default {
        components: { AddForm, Post },
        computed: {
            ...mapGetters({
                posts: 'post/posts',
            }),
        },

        methods: {
            ...mapActions({
                getPosts: 'post/getPosts',
            }),
        },

        mounted() {
            this.getPosts();
        },
    };
</script>

<style>
    .timeline__posts {
        margin-top: 40px;
    }
</style>
