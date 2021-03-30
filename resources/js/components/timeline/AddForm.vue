<template>
    <form action="#" class="post__form" @submit.prevent="submit">
        <div class="form-group">
            <md-editor :body="form.body" name="addForm">
                <TextareaAutosize
                    class="form-control"
                    placeholder="Share something"
                    v-model="form.body"
                    :class="{ 'is-invalid': errors && errors.body }"
                    :min-height="100"
                    :max-height="350"
                ></TextareaAutosize>
                <span
                    class="invalid-feedback"
                    role="alert"
                    v-if="errors && errors.body"
                >
                    <strong>{{ errors.body[0] }}</strong>
                </span>
            </md-editor>
            <small class="form-text text-info">
                Markdown and code highlight are supported.
            </small>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Post</button>
    </form>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import MDEditor from './MDEditor.vue';

    export default {
        components: {
            'md-editor': MDEditor,
        },
        data() {
            return {
                form: {
                    body: '',
                },
                errors: null,
            };
        },
        methods: {
            ...mapActions({
                createPost: 'post/createPost',
            }),

            async submit() {
                try {
                    await this.createPost(this.form);
                    this.errors = null;
                    this.form.body = '';
                    toastr.success('Submit successful!', 'Success!');
                } catch (error) {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                }
            },
        },
    };
</script>

<style>
    .post__form .code {
        min-height: 100px;
        max-height: 350px;
        overflow-y: auto;
    }
</style>
