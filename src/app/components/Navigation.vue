<template>
    <div class="container-navigation">
        <nav class="navbar is-fixed-top">
            <div class="container">
                <div class="navbar-brand">
                    <a class="navbar-item has-text-weight" href="/">
                        <img id="logo" src="/assets/images/logo.png" alt="Marvin Isaac Logo">
                    </a>
                </div>
            </div>
        </nav>
    </div>
</template>

<style lang="scss" scoped>
.container-navigation {
    padding: 0 0.5rem;
    width: 100%;

    .navbar {
        background: white !important;
        box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
            0 0px 0 1px rgba(10, 10, 10, 0.02);

        .container {
            padding: 0 1.5rem;

            .navbar-brand {
                margin-left: 0;

                .navbar-item {
                    padding: 0.5rem 0;
                }
            }
        }
    }
}
</style>
