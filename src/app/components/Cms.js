import Directus from '@directus/sdk-js'

const project = process.env.VUE_APP_CMS_PROJECT
const url = process.env.VUE_APP_CMS_URL

const cms = new Directus({
    url,
    project
})

export default cms
