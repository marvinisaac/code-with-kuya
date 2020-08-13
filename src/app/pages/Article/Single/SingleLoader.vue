<template>
    <div class="container-article-single-loader">
        <div class="post-head"
            v-if="post !== undefined"
            :style="`background-image: url('${post.featuredImage}')`">
        </div>

        <div class="container">
            <loading v-if="post === undefined"
                :message="`Loading ${postTitle}...`">
            </loading>

            <div class="post-body" v-if="post !== undefined">
                <h1 class="title">
                    {{ post.title }}
                </h1>

                <p class="subtitle">
                    {{ post.blurb }}
                    <br/>
                    <span class="is-size-7"
                        v-if="isUpdated">
                        Updated: {{ post.modified_on }}
                    </span>

                    <span class="is-size-7">
                        Published: {{ post.published_on }}
                    </span>
                </p>

                <div class="content"
                    v-html="post.body">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from './../../../partials/Loading.vue'
import marked from 'marked'
import highlighter from 'highlight.js'
import moment from 'moment'

export default {
    components: {
        Loading
    },
    props: {
        postId: Number,
        postTitle: String
    },
    data: () => ({
        api: undefined,
        cdnUrl: process.env.VUE_APP_CDN_URL,
        cmsUrl: process.env.VUE_APP_CMS_URL,
        collection: process.env.VUE_APP_CMS_PROJECT_COLLECTION,
        domParser: new DOMParser(),
        post: undefined,
        project: process.env.VUE_APP_CMS_PROJECT
    }),
    computed: {
        isUpdated () {
            return moment(this.post.modified_on) > moment(this.post.published_on)
        }
    },
    async created () {
        await this.getPost()
    },
    methods: {
        async getPost () {
            const options = {
                fields: [
                    'id',
                    'title',
                    'featured_image.filename_disk',
                    'body',
                    'published_on',
                    'modified_on',
                    'blurb'
                ],
                filter: {
                    id: this.postId
                }
            }
            return this.$cms.getItems(this.collection, options)
                .then(async (post) => {
                    post = post.data[0]
                    let body = await this._formatBody(post.body)
                    this.post = post
                    this.post.body = body
                    this.post.published_on = moment(post.published_on).format('YYYY MMM DD')
                    this.post.modified_on = moment(post.modified_on).format('YYYY MMM DD')
                    this.post.featuredImage = `${this.cdnUrl}/cms/${this.project}/originals/${post.featured_image.filename_disk}`
                })
        },
        async _formatBody (body) {
            const markdown = marked(body)

            let dom = this.domParser.parseFromString(markdown, 'text/html')
            dom = this._imageFromCdn(dom)
            dom = this._highlightCode(dom)
            dom = this._linkNewTab(dom)

            // Stringify body of temporary DOM
            return dom.body.innerHTML
        },
        _linkNewTab (dom) {
            let links = dom.getElementsByTagName('a')
            for (let link of links) {
                link.target = '_blank'
            }

            return dom
        },
        _highlightCode (dom) {
            let codes = dom.getElementsByTagName('code')
            for (let code of codes) {
                const highlighted = highlighter.highlightAuto(code.innerText).value
                let dom = this.domParser.parseFromString(highlighted, 'text/html')
                code.innerHTML = dom.body.innerHTML
            }

            return dom
        },
        _imageFromCdn (dom) {
            let images = dom.getElementsByTagName('img')
            for (let image of images) {
                image.src = image.src.replace('cdn://', `${this.cdnUrl}/cms/${this.project}/originals/`)
            }

            return dom
        }
    }
}
</script>

<style lang="scss" scoped>
$solarized-light: #fff9eb;

.container-article-single-loader {
    width: 100%;

    .post-head {
        background-attachment: fixed;
        background-position: top center;
        background-repeat: no-repeat;
        background-size: cover;
        margin-bottom: 1.5rem;
        padding-top: 56.25%;
        width: 100%;
    }

    .container {
        padding: 0 1.5rem 1.5rem;

        .post-body {
            max-width: 720px;

            .title {
                line-height: 1.25em;
            }

            .subtitle {
                line-height: 1.25em;

                span + span {
                    border-left: 1px solid grey;
                    margin-left: 0.75rem;
                    padding-left: 0.75rem;
                }
            }

            .content {
                /deep/ {
                    img {
                        border: 1px solid rgba(10, 10, 10, 0.1);
                        border-radius: 5px;
                    }

                    pre {
                        background: $solarized-light;
                        border-radius: 5px;
                    }

                    ul {
                        margin-left: 1em;
                    }
                }
            }
        }
    }
}

@media (min-width: 769px) {
.container-article-single-loader {
    .post-head {
        padding-top: 33.33vh;
    }
}}
</style>
