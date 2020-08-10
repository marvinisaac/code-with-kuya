<template>
    <div class="container-article-single">
        <loading v-if="this.postList === undefined"
            :message="`Wait lang...`">
        </loading>

        <not-found v-if="isPostNotFound"
            :page="title">
        </not-found>

        <article-content v-if="isPostFound"
            :post-id="post.id"
            :post-title="post.title">
        </article-content>
    </div>
</template>

<script>
import Loading from './../../../partials/Loading.vue'
import NotFound from './../../../partials/NotFound.vue'
import ArticleContent from './SingleLoader.vue'

export default {
    components: {
        Loading,
        NotFound,
        ArticleContent
    },
    props: {
        title: String
    },
    computed: {
        post: function () {
            return this.postList[this.title] || undefined
        },
        postList: function () {
            return this.$store.state.posts || undefined
        },
        isPostFound: function () {
            return this.postList !== undefined &&
                this.postList[this.title] !== undefined
        },
        isPostNotFound: function () {
            return this.postList !== undefined &&
                this.postList[this.title] === undefined
        }
    }
}
</script>

<style lang="scss" scoped>
.container-article-single {
    margin-bottom: auto;
    width: 100%;
}
</style>
