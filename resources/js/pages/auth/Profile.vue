<template>
    <div class="row justify-content-center">
        <sidebar />

        <div class="col-md-9">
            <div class="card">
                <div class="card-header">Update profile</div>
                <div class="card-body">
                    <form
                        action="#"
                        method="POST"
                        @submit.prevent="handleSubmit"
                    >
                        <div class="form-group">
                            <label
                                for="coupon"
                                class="col-form-label text-md-right"
                            >
                                Name:
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                v-model="form.name"
                                :class="{
                                    'is-invalid': errors && errors.name,
                                }"
                                class="form-control"
                            />
                            <span
                                class="invalid-feedback"
                                role="alert"
                                v-if="errors && errors.name"
                            >
                                <strong>{{ errors.name[0] }}</strong>
                            </span>
                        </div>
                        <div class="form-group">
                            <label
                                for="coupon"
                                class="col-form-label text-md-right"
                            >
                                Email:
                            </label>

                            <input
                                type="text"
                                name="email"
                                id="email"
                                v-model="form.email"
                                :class="{
                                    'is-invalid': errors && errors.email,
                                }"
                                class="form-control"
                            />
                            <span
                                class="invalid-feedback"
                                role="alert"
                                v-if="errors && errors.email"
                            >
                                <strong>{{ errors.email[0] }}</strong>
                            </span>
                        </div>

                        <div class="form-group">
                            <label for="password" class="col-form-label">
                                Password:
                            </label>

                            <input
                                id="password"
                                type="password"
                                class="form-control"
                                v-model="form.password"
                                :class="{
                                    'is-invalid': errors && errors.password,
                                }"
                            />

                            <span
                                class="invalid-feedback"
                                role="alert"
                                v-if="errors && errors.password"
                            >
                                <strong>{{ errors.password[0] }}</strong>
                            </span>
                        </div>

                        <div class="form-group">
                            <label
                                for="password-confirm"
                                class="col-form-label"
                            >
                                Confirm Password:
                            </label>

                            <input
                                id="password-confirm"
                                type="password"
                                class="form-control"
                                :class="{
                                    'is-invalid':
                                        errors && errors.password_confirmation,
                                }"
                                v-model="form.password_confirmation"
                            />
                        </div>

                        <button
                            type="submit"
                            class="btn btn-primary float-right"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Sidebar from '@/layouts/Sidebar';
    import { mapActions, mapGetters } from 'vuex';
    export default {
        components: { Sidebar },
        computed: {
            ...mapGetters({
                user: 'auth/user',
            }),
        },
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                },
                errors: null,
            };
        },
        methods: {
            ...mapActions({
                updateProfile: 'auth/updateProfile',
            }),
            handleSubmit() {
                this.updateProfile(this.form)
                    .then(() => {
                        toastr.success('Updated successful !', 'Success!');
                        this.errors = null;
                        this.form.password = '';
                        this.form.password_confirmation = '';
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors;
                    });
            },
        },
        mounted() {
            if (this.user) {
                const { name, email } = this.user;
                this.form.name = name;
                this.form.email = email;
            }
        },
    };
</script>

<style></style>
