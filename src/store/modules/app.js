export default {
    namespaced: true,
    state: {
        message: '',            // 消息通知
        isCollapse: true,       // 是否为折叠模式
        isMobile: false,        // 是否为移动模型
        userInfo: null,         // 用户信息
        routers: null,          // 动态路由
        userPathWhiteList: [
            "/404"
        ],
        enums: {},              // 枚举

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
        getUserInfo(state) {
            return state.userInfo;
        },
        getRouters(state) {
            return state.routers;
        },
        getEnums(state) {
            return state.enums;
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
        SET_USER_INFO(state, payload) {
            state.userInfo = payload;
        },
        SET_ROUTERS(state, payload) {
            state.routers = payload;
        },
        SET_ENUMS(state, payload) {
            state.enums = payload;
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
        setUserInfo({ commit }, payload) {
            commit('SET_USER_INFO', payload)
        },
        setRouters({ commit }, payload) {
            commit('SET_ROUTERS', payload)
        },
        setEnums({ commit }, payload) {
            commit('SET_ENUMS', payload)
        },
    }
}