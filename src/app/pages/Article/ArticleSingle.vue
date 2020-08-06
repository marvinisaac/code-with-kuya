<template>
    <div class="container-home">
        <div class="container">
            <h1 class="title">
                {{ title }}
            </h1>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>

<style lang="scss" scoped>
.container-home {
    width: 100%;
}
</style>
