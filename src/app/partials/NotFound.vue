<template>
    <div class="not-found-container has-text-centered">
        <h1 class="title">
            Halaaa!
        </h1>
        <div class="content">
            <p>Hindi ko alam yung page o article na <span>"{{ pageMissing }}"</span> e, sorry!</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        page: String
    },
    computed: {
        pageMissing () {
            return this.page.replace(/-/g, ' ')
        }
    }
}
</script>

<style lang="scss" scoped>
.not-found-container {
    padding: 1.5rem;

    .content {
        span {
            font-weight: bolder;
            text-transform: capitalize;
        }
    }
}
</style>
