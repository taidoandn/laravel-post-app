<template>
    <div class="row justify-content-center">
        <div class="col-md-12 text-center">
            <span class="display-1 d-block">404</span>
            <div class="mb-4 lead">
                The page you are looking for was not found.
            </div>
            <router-link :to="{ name: 'home' }" class="btn btn-link">
                Back to Home
            </router-link>
        </div>
    </div>
</template>

<style scoped>
    .error-template {
        padding: 40px 15px;
        text-align: center;
    }
    .error-actions {
        margin-top: 15px;
        margin-bottom: 15px;
    }
    .error-actions .btn {
        margin-right: 10px;
    }
</style>
