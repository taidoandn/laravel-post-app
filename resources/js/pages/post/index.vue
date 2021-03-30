<template>
    <div class="row justify-content-center">
        <div class="col-md-12">
            <timeline></timeline>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import Timeline from '@/components/timeline/Timeline.vue';
    export default {
        components: { Timeline },
    };
</script>
