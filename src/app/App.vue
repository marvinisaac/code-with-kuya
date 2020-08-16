<template>
    <div class="hero is-fullheight">
        <navigation class="hero-head"></navigation>
        <main class="hero-body">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import slugify from 'slugify'
import Navigation from './components/Navigation.vue'

export default {
    metaInfo: {
        title: 'Home',
        titleTemplate: '%s | Code with Kuya Marvin',
        meta: [
            {
                property: 'og:url',
                vmid: 'og:url',
                content: `https://${process.env.VUE_APP_PUBLIC_URL}`,
                template: '%s'
            }, {
                property: 'og:title',
                vmid: 'og:title',
                content: 'Home',
                template: '%s | Code with Kuya Marvin'
            }, {
                property: 'og:description',
                vmid: 'og:description',
                content: 'Para sa mga Filipino na nahihirapan mag-code, gusto pang matuto, o gusto lang ng makakausap tungkol sa web development at iba pa.',
                template: '%s'
            }, {
                property: 'og:image',
                vmid: 'og:image',
                content: `${process.env.VUE_APP_CDN_URL}/marvinisaac-com/facebook-share.jpg`,
                template: '%s'
            }
        ]
    },
    components: {
        Navigation
    },
    data: () => ({
        api: undefined,
        cdnUrl: process.env.VUE_APP_CDN_URL,
        cmsUrl: process.env.VUE_APP_CMS_URL,
        collection: process.env.VUE_APP_CMS_PROJECT_COLLECTION,
        project: process.env.VUE_APP_CMS_PROJECT
    }),
    async created () {
        await this.getPostList()
    },
    methods: {
        async getPostList () {
            const options = {
                fields: [
                    'id',
                    'title',
                    'featured_image.filename_disk',
                    'blurb'
                ],
                filter: {
                    published_on: {
                        lte: 'now'
                    }
                },
                sort: '-published_on'
            }
            return this.$cms.getItems(this.collection, options)
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
                    title: post.title,
                    blurb: post.blurb
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
    padding: 3.25rem 0 0;
}
</style>
