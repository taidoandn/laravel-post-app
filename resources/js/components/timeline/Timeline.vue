<template>
    <div>
        <add-form />
        <div class="timeline__posts">
            <post v-for="post in posts" :key="post.id" :post="post" />
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapGetters, mapActions } from 'vuex';
    import AddForm from './AddForm.vue';
    import Post from './Post.vue';

    export default {
        components: { AddForm, Post },
        computed: {
            ...mapGetters({
                posts: 'posts',
            }),
        },

        methods: {
            ...mapActions({
                getPosts: 'getPosts',
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
