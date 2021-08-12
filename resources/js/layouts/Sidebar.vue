<template>
    <div class="col-md-3">
        <ul class="list-group">
            <router-link class="list-group-item" :to="{ name: 'profile' }">
                Profile
            </router-link>
            <a href="#" class="list-group-item" @click.prevent="handeLogout">
                Logout
            </a>
        </ul>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        methods: {
            ...mapActions({
                logout: 'auth/logout',
            }),
            handeLogout() {
                this.logout().then(() => {
                    this.$router.push({ name: 'login' });
                });
            },
        },
    };
</script>

<style></style>
