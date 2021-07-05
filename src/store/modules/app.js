export default {
    namespaced: true,
    state: {
        message: '',
        isCollapse: false,
        isMobile: false
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