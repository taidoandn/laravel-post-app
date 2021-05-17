<template>
    <small>{{ fromNow }}</small>
</template>

<script>
    import dayjs from 'dayjs';
    var relativeTime = require('dayjs/plugin/relativeTime');
    dayjs.extend(relativeTime);

    export default {
        props: {
            timestamp: {
                required: true,
            },
        },
        data() {
            return {
                parsedTime: null,
            };
        },
        computed: {
            fromNow() {
                return this.parsedTime.fromNow();
            },
        },

        methods: {
            parse() {
                this.parsedTime = dayjs(this.timestamp);
            },
        },
        created() {
            this.parse();
            setInterval(() => {
                this.parse();
            }, 1000 * 60);
        },
    };
</script>

<style></style>
