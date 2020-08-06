import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleList from './../pages/Article/ArticleList.vue'
import ArticleSingle from './../pages/Article/ArticleSingle.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: ArticleList
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
