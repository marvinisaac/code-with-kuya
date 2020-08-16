import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleList from './../pages/Article/List/List.vue'
import Login from './../pages/Login.vue'

Vue.use(VueRouter)

const ArticleSingle = () => import('./../pages/Article/Single/Single.vue')

const routes = [
    {
        path: '/',
        component: ArticleList
    }, {
        path: '/login',
        component: Login
    }, {
        path: '/:title?',
        props: true,
        component: ArticleSingle
    }
]

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes
})

export default router
