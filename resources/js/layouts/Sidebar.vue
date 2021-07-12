<template>
    <div class="col-md-3">
        <ul class="list-group">
            <router-link class="list-group-item" :to="{ name: 'profile' }">
                Profile
            </router-link>
            <router-link class="list-group-item" :to="{ name: 'home' }">
                Logout
            </router-link>
        </ul>
    </div>
</template>

<script>
    export default {};
</script>

<style></style>
