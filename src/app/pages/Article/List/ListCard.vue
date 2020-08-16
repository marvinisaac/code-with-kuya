<template>
    <div class="box">
        <router-link :to="`/${postTitleSlug}`">
            <figure class="image">
                <img loading="lazy"
                    :src="post.featuredImage"
                    :alt="`${post.title} Image`">
            </figure>
            <div class="content">
                <h1 class="title">
                    {{ post.title }}
                </h1>
                <h3 class="subtitle has-text-weight-normal is-size-6">
                    {{ post.blurb }}
                </h3>
            </div>
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
.box {
    overflow: hidden;
    padding: 0;

    .content {
        padding: 1rem;
    }
}

@media (max-width: 360px) {
.box {
    font-size: 10px;
}}
</style>
