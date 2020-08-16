import Vue from 'vue'
import App from './app/App.vue'
import './app/AppStyle.scss'
import router from './app/components/Router'
import store from './app/components/Store'
import cms from './app/components/Cms'
import VueMeta from 'vue-meta'
import VueMatomo from 'vue-matomo'

Vue.config.productionTip = false

Vue.prototype.$cms = cms

Vue.use(VueMeta)
Vue.use(VueMatomo, {
    host: 'https://analytics.halohalolabs.com',
    siteId: process.env.VUE_APP_MATOMO_SITE_ID,
    router,
    debug: process.env.VUE_APP_ENVIRONMENT !== 'PRODUCTION'
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
