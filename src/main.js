import Vue from 'vue'
import App from './app/App.vue'
import './app/AppStyle.scss'
import router from './app/components/Router'
import store from './app/components/Store'
import cms from './app/components/Cms'
import VueMeta from 'vue-meta'

Vue.config.productionTip = false

Vue.prototype.$cms = cms

Vue.use(VueMeta)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
