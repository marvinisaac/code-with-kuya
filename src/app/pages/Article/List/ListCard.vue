<template>
    <div class="container-article-list-card">
        <div class="box">
            <router-link :to="`/${postTitleSlug}`">
                <figure class="image">
                    <img :src="post.featuredImage">
                </figure>
                <div class="content">
                    <h1 class="title">
                        {{ post.title }}
                    </h1>
                    <h3 class="subtitle">
                        {{ post.blurb }}
                    </h3>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        post: Object,
        postTitleSlug: String
    }
}
</script>

<style lang="scss" scoped>
.container-article-list-card {
    margin-bottom: auto;
    width: 100%;

    .box {
        overflow: hidden;
        padding: 0;

        .content {
            padding: 1rem;
        }
    }
}

@media (max-width: 360px) {
.container-article-list-card {
    font-size: 10px;
}}
</style>
