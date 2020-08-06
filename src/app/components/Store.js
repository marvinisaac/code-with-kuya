import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        posts: undefined
    },
    mutations: {
        setPostList (state, postList) {
            state.posts = postList
        }
    }
})

export default store
