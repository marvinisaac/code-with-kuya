import Vue from 'vue'
import App from './app/App.vue'
import './app/AppStyle.scss'
import router from './app/components/Router'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
