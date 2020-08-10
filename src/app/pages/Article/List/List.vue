<template>
    <div class="container-article-list">
        <div class="container">
            <loading v-if="this.postList === undefined"
                :message="`Wait lang...`">
            </loading>

            <article-list-card
                v-for="(post, index) in postList"
                :key="index"
                :post="post"
                :postTitleSlug="index">
            </article-list-card>
        </div>
    </div>
</template>

<script>
import ArticleListCard from './ListCard.vue'
import Loading from './../../../partials/Loading.vue'

export default {
    components: {
        ArticleListCard,
        Loading
    },
    computed: {
        postList: function () {
            return this.$store.state.posts || undefined
        }
    }
}
</script>

<style lang="scss" scoped>
.container-article-list {
    margin-bottom: auto;
    padding: 1.5rem;
    width: 100%;
}
</style>
