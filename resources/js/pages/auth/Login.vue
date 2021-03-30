<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Login</div>

                <div class="card-body">
                    <form
                        method="POST"
                        action="#"
                        @submit.prevent="handleSubmit"
                    >
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
                                    required
                                    autocomplete="email"
                                    autofocus
                                    :class="{
                                        'is-invalid': errors && errors.email,
                                    }"
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
                                    name="password"
                                    v-model="form.password"
                                    required
                                    autocomplete="current-password"
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
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    Login
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
                    email: '',
                    password: '',
                },
                errors: null,
            };
        },
        methods: {
            ...mapActions({
                login: 'auth/login',
            }),
            handleSubmit() {
                this.login(this.form)
                    .then(() => {
                        let redirectUrl = this.$route.query.redirect || '/home';
                        this.$router.replace(redirectUrl);
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors;
                    });
            },
        },
    };
</script>

<style></style>
