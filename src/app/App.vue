<template>
    <div class="hero is-fullheight">
        <main class="hero-body">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import DirectusSDK from '@directus/sdk-js'
import slugify from 'slugify'

export default {
    data: () => ({
        api: undefined,
        cdnUrl: process.env.VUE_APP_CDN_URL,
        cmsUrl: process.env.VUE_APP_CMS_URL,
        collection: process.env.VUE_APP_CMS_PROJECT_COLLECTION,
        project: process.env.VUE_APP_CMS_PROJECT
    }),
    async created () {
        this.api = new DirectusSDK({
            url: this.cmsUrl,
            project: this.project
        })
        await this.getPostList()
    },
    methods: {
        async getPostList () {
            const options = {
                fields: [
                    'id',
                    'title',
                    'featured_image.filename_disk'
                ],
                sort: '-published_on'
            }
            return this.api.getItems(this.collection, options)
                .then((posts) => {
                    let postList = this._buildTitleMap(posts.data)
                    this.$store.commit('setPostList', postList)
                })
        },
        _buildTitleMap (posts) {
            let slugOptions = {
                lower: true,
                strict: true
            }
            let titleMap = {}

            posts.forEach(post => {
                let title = slugify(post.title, slugOptions)
                titleMap[title] = {
                    id: post.id,
                    featuredImage: this._getCdnLink(post.featured_image),
                    title: post.title
                }
            })

            return titleMap
        },
        _getCdnLink (file) {
            if (file === null) {
                const imageDefault = 'marvinisaac-com/facebook-share.jpg'
                return `${this.cdnUrl}/${imageDefault}`
            }

            return `${this.cdnUrl}/cms/${this.project}/originals/${file.filename_disk}`
        }
    }
}
</script>

<style lang="scss" scoped>
.hero-body {
    padding: 0;
}
</style>