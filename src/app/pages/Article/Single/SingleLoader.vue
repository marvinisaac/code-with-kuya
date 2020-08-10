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
            dom = await this._embedGithubCode(dom)
            dom = this._linkNewTab(dom)

            // Stringify body of temporary DOM
            return dom.body.innerHTML
        },
        async _embedGithubCode (dom) {
            let githubLinks = dom.getElementsByTagName('code')
            for (let link of githubLinks) {
                if (link.innerText.indexOf('http://') === -1 &&
                    link.innerText.indexOf('https://') === -1) {
                    continue
                }

                link.innerText = await fetch(link.innerText)
                    .then(response => response.text())
                    .then(response => response)
            }

            return dom
        },
        _linkNewTab (dom) {
            let links = dom.getElementsByTagName('a')
            for (let link of links) {
                link.target = '_blank'
            }

            return dom
        }
    }
}
</script>

<style lang="scss" scoped>
.container-article-single-display {
    padding: 1.5rem;
    width: 100%;

    .content {
        /deep/ {
            pre {
                border: 1px solid grey;
                border-radius: 5px 5px 0 0;
                margin-bottom: 0;
                margin-top: 2rem;

                code {
                    font-family: monospace;
                }
            }

            pre + p {
                background: white;
                border: 1px solid grey;
                border-radius: 0 0 5px 5px;
                border-width: 0 1px 1px;
                font-size: 0.75rem;
                margin-top: -1px;
                margin-bottom: 2rem;
                padding: 0.5em 1em;
            }
        }
    }
}
</style>
