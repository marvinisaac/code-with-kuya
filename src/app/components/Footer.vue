<template>
    <footer class="footer">
        <div class="content has-text-centered is-size-7">
            <p>
                <span>© 2020</span>
                <a id="logo"
                    href="https://marvinisaac.com" target="_blank">
                    Marvin Isaac
                </a>
                <br/>
                All Rights Reserved
            </p>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
$black: #363636;

@import url('https://fonts.googleapis.com/css2?family=Alata&display=swap');

.footer {
    background: $black;
    border-top: 1px solid darken(whitesmoke, 10%);
    color: white;
    padding: 1.5rem;

    .content {
        p {
            margin-bottom: 0;
        }

        #logo {
            color: inherit;
            font-family: 'Alata', sans-serif;
        }
    }

}
</style>
