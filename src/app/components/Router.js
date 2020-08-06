import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './../pages/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Home
    }
]

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes
})

export default router
