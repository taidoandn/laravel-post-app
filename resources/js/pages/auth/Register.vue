<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Register</div>

                <div class="card-body">
                    <form
                        method="POST"
                        action="#"
                        @submit.prevent="handleSubmit"
                    >
                        <div class="form-group row">
                            <label
                                for="name"
                                class="col-md-4 col-form-label text-md-right"
                            >
                                Name
                            </label>

                            <div class="col-md-6">
                                <input
                                    id="name"
                                    type="text"
                                    class="form-control"
                                    name="name"
                                    v-model="form.name"
                                    :class="{
                                        'is-invalid': errors && errors.name,
                                    }"
                                    required
                                    autocomplete="name"
                                    autofocus
                                />

                                <span
                                    class="invalid-feedback"
                                    role="alert"
                                    v-if="errors && errors.name"
                                >
                                    <strong>{{ errors.name[0] }}</strong>
                                </span>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label
                                for="email"
                                class="col-md-4 col-form-label text-md-right"
                            >
                                E-Mail Address
                            </label>

                            <div class="col-md-6">
                                <input
                                    id="email"
                                    type="email"
                                    class="form-control"
                                    name="email"
                                    v-model="form.email"
                                    :class="{
                                        'is-invalid': errors && errors.email,
                                    }"
                                    required
                                    autocomplete="email"
                                />

                                <span
                                    class="invalid-feedback"
                                    role="alert"
                                    v-if="errors && errors.email"
                                >
                                    <strong>{{ errors.email[0] }}</strong>
                                </span>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label
                                for="password"
                                class="col-md-4 col-form-label text-md-right"
                            >
                                Password
                            </label>

                            <div class="col-md-6">
                                <input
                                    id="password"
                                    type="password"
                                    class="form-control"
                                    v-model="form.password"
                                    :class="{
                                        'is-invalid': errors && errors.password,
                                    }"
                                    required
                                    autocomplete="new-password"
                                />

                                <span
                                    class="invalid-feedback"
                                    role="alert"
                                    v-if="errors && errors.password"
                                >
                                    <strong>{{ errors.password[0] }}</strong>
                                </span>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label
                                for="password-confirm"
                                class="col-md-4 col-form-label text-md-right"
                            >
                                Confirm Password
                            </label>

                            <div class="col-md-6">
                                <input
                                    id="password-confirm"
                                    type="password"
                                    class="form-control"
                                    v-model="form.password_confirmation"
                                    required
                                    autocomplete="new-password"
                                />
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    export default {
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
                register: 'auth/register',
            }),
            handleSubmit() {
                this.register(this.form)
                    .then(() => {
                        this.$router.push({ name: 'home' });
                        toastr.success('Register successful !', 'Success!');
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors;
                    });
            },
        },
    };
</script>
