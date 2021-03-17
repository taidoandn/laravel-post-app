<template>
    <form action="#">
        <div class="form-group">
            <TextareaAutosize
                class="form-control"
                placeholder="Share something"
                :min-height="100"
                :max-height="350"
                v-model="form.body"
                :class="{ 'is-invalid': errors && errors.body }"
            ></TextareaAutosize>
            <span
                class="invalid-feedback"
                role="alert"
                v-if="errors && errors.body"
            >
                <strong>{{ errors.body[0] }}</strong>
            </span>
        </div>
        <button
            type="button"
            @click.prevent="handleUpdate"
            class="btn btn-primary btn-sm"
        >
            Update
        </button>
        <button
            type="button"
            class="btn btn-outline-secondary btn-sm"
            @click.prevent="$emit('cancel-update')"
        >
            Cancel
        </button>
    </form>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    export default {
        props: {
            post: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                form: {
                    id: this.post.id,
                    body: this.post.body,
                },
                errors: null,
            };
        },
        methods: {
            ...mapActions({
                updatePost: 'updatePost',
            }),
            async handleUpdate() {
                this.updatePost(this.form)
                    .then((res) => {
                        this.$emit('post-updated');
                        toastr.success('Updated successful!', 'Success');
                    })
                    .catch((error) => {
                        if (error.response.status === 422) {
                            this.errors = error.response.data.errors;
                        }
                    });
            },
        },
    };
</script>

<style></style>
