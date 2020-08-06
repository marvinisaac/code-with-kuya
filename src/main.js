import Vue from 'vue'
import App from './app/App.vue'
import './app/AppStyle.scss'
import router from './app/components/Router'
import store from './app/components/Store'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
