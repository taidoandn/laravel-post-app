<template>
    <form action="#" @submit.prevent="submit">
        <div class="form-group">
            <markdown :body="form.body">
                <textarea
                    class="form-control"
                    placeholder="Share something"
                    rows="3"
                    v-model="form.body"
                ></textarea>
            </markdown>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Post</button>
    </form>
</template>

<script>
    import { mapActions } from 'vuex';

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
    };
</script>

<style></style>
