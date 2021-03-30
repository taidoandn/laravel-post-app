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
                :class="classes"
                @click.prevent="toggleLike"
            >
                <i :class="icon_classes"></i>
                {{ this.post.user.liked ? 'Unlike' : 'Like' }}
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
            icon_classes() {
                return [
                    'fa',
                    this.post.user.liked ? 'fa-thumbs-down' : 'fa-thumbs-up',
                ];
            },
            classes() {
                return [
                    'btn',
                    'btn-sm',
                    this.post.user.liked ? 'btn-danger' : 'btn-primary',
                ];
            },
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
                likePost: 'post/likePost',
                unLikePost: 'post/unLikePost',
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
