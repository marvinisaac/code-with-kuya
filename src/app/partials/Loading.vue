<template>
    <div class="loading-container has-text-centered">
        <div class="button is-loading is-white is-size-1"></div>
        <span>{{ message }}</span>
    </div>
</template>

<script>
export default {
    props: {
        message: String
    }
}
</script>

<style lang="scss" scoped>
.loading-container {
    background: transparent;
    display: flex;
    flex-direction: column;

    .is-white {
        background: transparent;
    }
}
</style>
