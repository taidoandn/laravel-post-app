<template>
    <div class="card">
        <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                    <a
                        class="nav-link active"
                        data-toggle="tab"
                        :href="tabId('write', '#')"
                        >Write</a
                    >
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link"
                        data-toggle="tab"
                        :href="tabId('preview', '#')"
                        >Preview</a
                    >
                </li>
            </ul>
        </div>
        <div class="card-body tab-content">
            <div class="tab-pane active" :id="tabId('write')">
                <slot></slot>
            </div>
            <div class="tab-pane" :id="tabId('preview')">
                <markdown-display :markdown="body" />
            </div>
        </div>
    </div>
</template>

<script>
    import MarkdownDisplay from './MarkdownDisplay.vue';

    export default {
        components: { MarkdownDisplay },
        props: {
            body: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
        },
        methods: {
            tabId(tabName, hash = '') {
                return `${hash}${tabName}${this.name}`;
            },
        },
    };
</script>
