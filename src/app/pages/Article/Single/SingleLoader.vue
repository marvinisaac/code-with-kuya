<template>
    <div class="container-article-single-display">
        <div class="container">
            <loading v-if="post === undefined"
                :message="`Loading ${postTitle}...`">
            </loading>

            <div class="content"
                v-if="post !== undefined"
                v-html="post.body">
            </div>
        </div>
    </div>
</template>

<script>
import DirectusSDK from '@directus/sdk-js'
import Loading from './../../../partials/Loading.vue'
import marked from 'marked'
import highlighter from 'highlight.js'

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
        post: undefined,
        project: process.env.VUE_APP_CMS_PROJECT
    }),
    async created () {
        this.api = new DirectusSDK({
            url: this.cmsUrl,
            project: this.project
        })
        await this.getPost()
    },
    methods: {
        async getPost () {
            const options = {
                fields: [
                    'id',
                    'title',
                    'featured_image.filename_disk',
                    'body'
                ],
                filter: {
                    id: this.postId
                }
            }
            return this.api.getItems(this.collection, options)
                .then(async (post) => {
                    post = post.data[0]
                    let body = await this._formatBody(post.body)
                    this.post = post
                    this.post.body = body
                })
        },
        async _formatBody (body) {
            const markdown = marked(body)

            const domParser = new DOMParser()
            let dom = domParser.parseFromString(markdown, 'text/html')
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
                const domParser = new DOMParser()
                console.log(code.innerText)
                const highlighted = highlighter.highlightAuto(code.innerText).value
                let dom = domParser.parseFromString(highlighted, 'text/html')
                code.innerHTML = dom.body.innerHTML
            }

            return dom
        }
    }
}
</script>

<style lang="scss" scoped>
$solarized-light: #fff9eb;

.container-article-single-loader {
    padding: 1.5rem;
    width: 100%;

    .content {
        max-width: 720px;

        /deep/ {
            pre {
                background: $solarized-light;
                border-radius: 5px;
                margin-bottom: 2rem;
                margin-top: 2rem;

                code {
                    font-family: monospace;
                }
            }
        }
    }
}
</style>
