<template>
    <div>
        <span class="text-secondary" v-if="post.likes_count">
            {{ pluralize('like', post.likes_count, true) }} from
            {{ pluralize('person', post.likers.length, true) }}
            <template v-if="post.user.liked">
                (including you)
            </template>
        </span>
        <div>
            <button
                class="btn btn-primary btn-sm"
                @click.prevent="like"
                v-if="canLike"
            >
                <i class="fa fa-thumbs-up"></i> Like
            </button>
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
            canLike() {
                if (
                    this.post.user.owner ||
                    this.post.user.likes_remaining <= 0
                ) {
                    return false;
                }
                return true;
            },
        },

        methods: {
            pluralize,

            ...mapActions({
                likePost: 'likePost',
            }),

            like() {
                this.likePost(this.post.id);
            },
        },
    };
</script>

<style></style>
