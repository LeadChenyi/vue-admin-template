import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const files = require.context('./modules', true, /\.js$/)
const modules = files.keys().reduce((total, item) => {
    let fileName = item.replace(/^\.\/(.*)\.\w+$/, '$1')
    total[fileName] = files(item).default
    return total
}, {})

const store = new Vuex.Store({
    modules
})

export default store;