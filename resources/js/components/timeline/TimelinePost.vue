<template>
    <div class="timeline__post media">
        <img src="" alt="" class="timeline__avatar mr-3 rounded">
        <div class="media-body">
            <div class="font-weight-bold">
                Alex
            </div>
            <p>
                Post body
            </p>
            <timeline-post-likes/> 
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.timeline__post {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
}

.timeline__avatar{
    width: 60px;
}
</style>