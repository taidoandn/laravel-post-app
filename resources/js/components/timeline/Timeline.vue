<template>
    <div>
        <add-form />
        <div class="timeline__posts">
            <post v-for="post in posts" :key="post.id" :post="post" />
            <div
                v-if="posts.length"
                v-observe-visibility="visibilityChanged"
            ></div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import Post from './Post.vue';
    import AddForm from './AddForm.vue';

    export default {
        components: { AddForm, Post },
        data() {
            return {
                page: 1,
                lastPage: 1,
            };
        },
        computed: {
            ...mapGetters({
                posts: 'posts/items',
            }),
        },

        methods: {
            ...mapActions({
                getPosts: 'posts/getPosts',
            }),

            loadPosts() {
                this.getPosts(this.page).then(res => {
                    this.lastPage = res.meta.last_page;
                });
            },

            visibilityChanged(isVisible) {
                if (!isVisible) {
                    return;
                }

                if (this.page == this.lastPage) {
                    return;
                }

                this.page++;
                this.loadPosts();
            },
        },

        mounted() {
            this.loadPosts();
        },
    };
</script>

<style>
    .timeline__posts {
        margin-top: 40px;
    }
</style>
