export default {
    namespaced: true,
    state: {
        message: '',
        isCollapse: true,   // 是否为折叠模式
        isMobile: false     // 是否为移动模型
    },
    getters: {
        getMessage(state) {
            return state.message;
        },
        getCollapse(state) {
            return state.isCollapse;
        },
        getMobile(state) {
            return state.isMobile;
        },
    },
    mutations: {
        SET_MESSAGE(state, payload) {
            state.message = payload;
        },
        SET_COLLAPSE(state, payload) {
            state.isCollapse = payload;
        },
        SET_MOBILE(state, payload) {
            state.isMobile = payload;
        },
    },
    actions: {
        setMessage({ commit }, payload) {
            commit('SET_MESSAGE', payload)
        },
        setCollapse({ commit }, payload) {
            commit('SET_COLLAPSE', payload)
        },
        setMobile({ commit }, payload) {
            commit('SET_MOBILE', payload)
        },
    }
}