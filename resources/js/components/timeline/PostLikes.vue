<template>
    <div>
        <span class="text-primary" v-if="post.likes_count">
            {{ pluralize('like', post.likes_count, true) }}
            <template v-if="post.user.liked">
                (including you)
            </template>
        </span>
        <div v-if="canLikeOrUnLike">
            <a
                href="#"
                class="btn btn-sm btn-primary"
                :class="{
                    'btn-primary': !post.user.liked,
                    'btn-danger': post.user.liked,
                }"
                @click.prevent="toggleLike"
            >
                <i
                    class="fa"
                    :class="{
                        'fa-thumbs-up': !post.user.liked,
                        'fa-thumbs-down': post.user.liked,
                    }"
                ></i>
                Like
            </a>
        </div>
    </div>
</template>

<script>
    import pluralize from 'pluralize';
    import { mapActions } from 'vuex';
    export default {
        props: {
            post: {
                type: Object,
                required: true,
            },
        },

        computed: {
            canLikeOrUnLike() {
                if (this.post.user.owner) {
                    return false;
                }
                return true;
            },
        },

        methods: {
            pluralize,

            ...mapActions({
                likePost: 'likePost',
                unLikePost: 'unLikePost',
            }),

            async toggleLike() {
                if (this.post.user.liked) {
                    await this.unLikePost(this.post.id);
                } else {
                    await this.likePost(this.post.id);
                }
            },
        },
    };
</script>

<style></style>
