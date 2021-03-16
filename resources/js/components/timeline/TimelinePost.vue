<template>
    <div class="timeline__post media">
        <img
            :src="post.author.avatar"
            alt=""
            class="timeline__avatar mr-3 rounded"
        />
        <div class="media-body">
            <div class="font-weight-bold">
                {{ post.author.name }}
            </div>

            <template v-if="!isEditing">
                <markdown-display :markdown="post.body" />
                <timeline-post-likes :post="post" />
                <div v-if="post.user.owner">
                    <button
                        class="btn btn-outline-info btn-sm"
                        @click.prevent="edit"
                    >
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button
                        class="btn btn-outline-danger btn-sm"
                        @click.prevent="remove(post.id)"
                    >
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </template>

            <edit-form
                v-else
                :post="post"
                @post-updated="editing = false"
                @cancel-update="cancel"
            />
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import EditForm from './EditForm.vue';
    import MarkdownDisplay from './MarkdownDisplay.vue';
    import TimelinePostLikes from './TimelinePostLikes.vue';

    export default {
        components: { EditForm, MarkdownDisplay, TimelinePostLikes },
        props: {
            post: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                editing: false,
                tempBody: null,
            };
        },
        methods: {
            ...mapActions({
                setSelectedPostId: 'setSelectedPostId',
                deletePost: 'deletePost',
            }),
            edit() {
                this.tempBody = this.body;
                this.editing = true;
                this.setSelectedPostId(this.post.id);
            },
            remove(id) {
                this.deletePost(id).then(() => {
                    toastr.success('Delete successful!', 'Success!');
                });
            },
            cancel() {
                this.body = this.tempBody;
                this.editing = false;
                this.setSelectedPostId(null);
            },
        },
        computed: {
            ...mapGetters({
                selectedPostId: 'selectedPostId',
            }),
            isEditing() {
                return this.selectedPostId === this.post.id && this.editing;
            },
        },
    };
</script>

<style>
    .timeline__post {
        background-color: #fff;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: 10px;
        margin-bottom: 20px;
    }

    .timeline__avatar {
        width: 60px;
    }
    .card-body {
        min-height: 145px;
        max-height: 390px;
        overflow-y: auto;
    }
</style>
