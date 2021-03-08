<template>
    <div class="timeline__post media">
        <img
            :src="post.author.data.avatar"
            alt=""
            class="timeline__avatar mr-3 rounded"
        />
        <div class="media-body">
            <div class="font-weight-bold">
                {{ post.author.data.name }}
            </div>
            <p>
                {{ post.body }}
            </p>
            <timeline-post-likes :post="post" />
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            post: {
                type: Object,
                required: true,
            },
        },
    }
</script>

<style>
    .timeline__post {
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 20px;
    }

    .timeline__avatar {
        width: 60px;
    }
</style>
