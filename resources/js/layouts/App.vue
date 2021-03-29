<template>
    <div>
        <navigation />

        <main class="py-4">
            <div class="container">
                <router-view></router-view>
            </div>
        </main>
    </div>
</template>

<script>
    import Navigation from './Navigation.vue';
    export default {
        components: {
            Navigation,
        },
    };
</script>

<style lang="scss" scoped></style>
