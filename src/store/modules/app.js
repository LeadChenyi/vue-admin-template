export default {
    namespaced: true,
    state: {
        message: '',
        isCollapse: false,
    },
    getters: {
        getMessage(state) {
            return state.message;
        },
        getCollapse(state) {
            return state.isCollapse;
        },
    },
    mutations: {
        SET_MESSAGE(state, payload) {
            state.message = payload;
        },
        SET_COLLAPSE(state, payload) {
            state.isCollapse = payload;
        },
    },
    actions: {
        setMessage({ commit }, payload) {
            commit('SET_MESSAGE', payload)
        },
        setCollapse({ commit }, payload) {
            commit('SET_COLLAPSE', payload)
        },
    }
}