<template>
    <div class="box">
        <article class="media">
            <div class="media-left">
                <figure class="image">
                    <img class="is-rounded"
                        src="https://cdn.halohalolabs.com/marvinisaac-com/me.jpg">
                </figure>
            </div>
            <div class="media-content">
                <div class="content">
                    <p>
                        <strong>About Marvin Isaac</strong>
                    </p>
                    <p>
                        Kuya Marvin wants to share the little he knows about web development in these blog posts. His goal is to help aspiring developers learn faster using project-based learning.
                    </p>
                    <p>
                        <a href="https://github.com/marvinisaac" target="_blank">
                            GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/marvinisaac/" target="_blank">
                            LinkedIn
                        </a>
                        <a href="https://wakatime.com/@marvinisaac" target="_blank">
                            WakaTime
                        </a>
                    </p>
                </div>
            </div>
        </article>
    </div>
</template>

<style lang="scss" scoped>
.box {
    line-height: 2em;
    margin: 3rem 0;

    .image {
        max-width: 64px;
    }

    .content {
        a + a {
            margin-left: 0.5rem;
        }
    }
}

@media (min-width: 481px) {
.box {
    .image {
        max-width: 128px;
    }

    .content {
        a + a {
            margin-left: 1rem;
        }
    }
}}
</style>
