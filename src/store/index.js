import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import overview from '@/store/modules/overview'
import search from '@/store/modules/search'
import getters from '@/store/getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        user,
        overview,
        search
    },
    getters
})

export default store
