<template>
    <div class="container-article-list-card">
        <router-link :to="`/${postTitleSlug}`">
            <h1 class="title">
                {{ post.title }}
            </h1>
        </router-link>
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
}
</style>
