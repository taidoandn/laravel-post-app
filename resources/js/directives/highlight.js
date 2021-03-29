import hljs from 'highlight.js';

export default {
    deep: true,
    bind: (el, binding) => {
        // on first bind, highlight all targets
        let targets = el.querySelectorAll('code');
        targets.forEach(target => {
            hljs.highlightBlock(target);
        });
    },
    componentUpdated: (el, binding) => {
        // after an update, re-fill the content and then highlight
        let targets = el.querySelectorAll('code');
        targets.forEach(target => {
            hljs.highlightBlock(target);
        });
    },
};
