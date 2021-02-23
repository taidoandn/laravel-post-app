<template>
    <div>
        <timeline-form />
        <div class="timeline__posts">
            <timeline-post
                v-for="x in 10"
                :key="x"
            />
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.timeline__posts{
    margin-top: 40px;
}
</style>