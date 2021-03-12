<template>
    <div v-html="markdownText"></div>
</template>

<script>
    import marked from 'marked';
    import hljs from 'highlight.js';
    import 'highlight.js/styles/github.css';

    export default {
        props: ['markdown'],
        computed: {
            markdownText() {
                return marked(this.markdown, {
                    highlight(md) {
                        return hljs.highlightAuto(md).value;
                    },
                });
            },
        },
    };
</script>

<style></style>
