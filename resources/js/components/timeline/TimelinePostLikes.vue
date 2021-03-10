<template>
    <div>
        <span class="text-secondary" v-if="post.likes">
            {{ pluralize('like', post.likes, true) }} from
            {{ pluralize('person', post.likers.data.length, true) }}
            <template v-if="post.user.data.liked">
                (including you)
            </template>
        </span>
        <ul class="list-inline mb-0">
            <li class="list-inline-item" v-if="canLike">
                <a href="#" @click.prevent="like">Like it</a>
            </li>
        </ul>
    </div>
</template>

<script>
    import pluralize from 'pluralize'
    import { mapActions } from 'vuex'
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
                    this.post.user.data.owner ||
                    this.post.user.data.likes_remaining <= 0
                ) {
                    return false
                }
                return true
            },
        },

        methods: {
            pluralize,

            ...mapActions({
                likePost: 'likePost',
            }),

            like() {
                this.likePost(this.post.id)
            },
        },
    }
</script>

<style></style>
