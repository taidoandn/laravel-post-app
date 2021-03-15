<template>
    <form action="#" @submit.prevent="submit">
        <div class="form-group">
            <markdown :body="form.body">
                <textarea
                    class="form-control"
                    placeholder="Share something"
                    rows="3"
                    v-model="form.body"
                    v-bind:class="{ 'is-invalid': errors && errors.body }"
                ></textarea>
                <span
                    class="invalid-feedback"
                    role="alert"
                    v-if="errors && errors.body"
                >
                    <strong>{{ errors.body[0] }}</strong>
                </span>
            </markdown>
            <small class="form-text text-muted">
                Markdown and code highlight are supported.
            </small>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Post</button>
    </form>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        data() {
            return {
                form: {
                    body: '',
                },
            };
        },
        methods: {
            ...mapActions({
                createPost: 'createPost',
            }),

            async submit() {
                await this.createPost(this.form);
                this.form.body = '';
            },
        },
        computed: {
            ...mapGetters({
                errors: 'errors',
            }),
        },
    };
</script>

<style></style>
