<template>
    <div class="code" v-html="markdownText" v-highlightjs></div>
</template>

<script>
    import marked from 'marked';

    export default {
        props: ['markdown'],
        computed: {
            markdownText() {
                return marked(this.markdown);
            },
        },
    };
</script>
