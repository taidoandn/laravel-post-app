<template>
    <div>
        <timeline-form />
        <div class="timeline__posts">
            <timeline-post v-for="post in posts" :key="post.id" :post="post" />
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapGetters, mapActions } from 'vuex';
    import TimelineForm from './TimelineForm.vue';
    import TimelinePost from './TimelinePost.vue';

    export default {
        components: { TimelineForm, TimelinePost },
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
