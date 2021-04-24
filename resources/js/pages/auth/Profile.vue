<template>
    <div class="row justify-content-center">
        <sidebar />

        <div class="col-md-9">
            <div class="card">
                <div class="card-header">Update profile</div>
                <div class="card-body">
                    <form action="#" method="POST" id="card-form">
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
                                class="form-control"
                            />
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
                                class="form-control"
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
    export default {
        components: { Sidebar },
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                },
            };
        },
    };
</script>

<style></style>
