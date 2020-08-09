<template>
    <div class="container-article-single">
        <div class="container">
            <loading v-if="this.postList === undefined"
                :message="`Wait lang...`">
            </loading>

            <not-found v-if="isPostNotFound" />

            <loading v-if="isPostFound"
                :message="`Loading ${post.title}...`">
            </loading>
        </div>
    </div>
</template>

<script>
import Loading from './../../../partials/Loading.vue'
import NotFound from './../../../partials/NotFound.vue'

export default {
    components: {
        Loading,
        NotFound
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
    width: 100%;
}
</style>
