<template> </template>

<script>
    import { mapActions } from 'vuex';
    export default {
        methods: {
            ...mapActions({ logout: 'auth/logout' }),
        },
        created() {
            this.logout().then(() => {
                this.$router.push({ name: 'login' });
            });
        },
    };
</script>

<style></style>
