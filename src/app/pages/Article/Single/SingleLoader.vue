<template>
    <div class="container-article-single-loader"
        :class="{
            'is-transparent': post === undefined
        }">
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
import slugify from 'slugify'

export default {
    metaInfo () {
        const post = this.post

        if (post === undefined) {
            return {}
        }

        const slugOptions = {
            lower: true,
            strict: true
        }
        const postTitleSlug = slugify(this.post.title, slugOptions)
        const featuredImage = this.featuredImage
        return {
            title: post.title,
            meta: [
                {
                    property: 'og:url',
                    vmid: 'og:url',
                    content: `https://${process.env.VUE_APP_PUBLIC_URL}/${postTitleSlug}`
                }, {
                    property: 'og:title',
                    vmid: 'og:title',
                    content: post.title
                }, {
                    property: 'og:description',
                    vmid: 'og:description',
                    content: post.blurb
                }, {
                    property: 'og:image',
                    vmid: 'og:image',
                    content: featuredImage
                }
            ]
        }
    },
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
        },
        featuredImage () {
            let post = this.post
            if (post.featured_image === null) {
                const imageDefault = 'marvinisaac-com/facebook-share.jpg'
                return `${this.cdnUrl}/${imageDefault}`
            }

            return `${this.cdnUrl}/cms/${this.project}/originals/${post.featured_image.filename_disk}`
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
                    this.post.featuredImage = this.featuredImage
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
            let codes = dom.getElementsByTagName('pre')
            for (let code of codes) {
                let language = this._getLanguage(code)
                const highlighted = highlighter.highlight(language, code.firstChild.innerText).value
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
        },
        _getLanguage (code) {
            const languageContainer = code.previousSibling.previousSibling
            const language = languageContainer.firstChild.nextSibling.innerText
            languageContainer.remove()
            return language
        }
    }
}
</script>

<style lang="scss" scoped>
$solarized-light: #fff9eb;
$dark-grey: #dbdbdb;

.container-article-single-loader {
    background: white;
    font-size: 14px;
    width: 100%;

    &.is-transparent {
        background: transparent !important;
    }

    .container {
        padding: 1.5rem;

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
                    blockquote {
                        border: 1px solid $dark-grey;
                        border-radius: 5px;
                        font-size: 0.875em;
                        overflow: hidden;
                        padding-top: 0;

                        p:first-of-type {
                            background: $dark-grey;
                            font-weight: bolder;
                            margin-left: -1.75em;
                            margin-right: -1.75em;
                            padding: 0.5em 1.75em;
                            text-transform: uppercase;
                        }

                        p {
                            code {
                                background: white;
                                border-color: $dark-grey;
                            }
                        }

                        ul {
                            margin-left: 2em;
                        }
                    }

                    hr {
                        background-color: $dark-grey;
                    }

                    h3 {
                        font-weight: normal;
                    }

                    img {
                        border: 1px solid $dark-grey;
                        border-radius: 5px;
                        display: block;
                        margin: 0 auto;
                    }

                    p {
                        code {
                            background: $solarized-light;
                            border: 1px solid darken($solarized-light, 10%);
                            border-radius: 3px;
                            color: black;
                            padding: 0 0.25em;
                        }
                    }

                    pre {
                        background: $solarized-light;
                        border: 1px solid darken($solarized-light, 10%);
                        border-radius: 5px;
                    }

                    ul {
                        margin-left: 2em;
                    }
                }
            }
        }
    }
}

@media (min-width: 1024px) {
.container-article-single-loader {
    font-size: 16px;
}}
</style>
