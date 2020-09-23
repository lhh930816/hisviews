export default {
    state: {
        /**
         * 楚雄三级联动
         */
        linkAge:[]
    },
    namespaced: true,
    actions: {
        /**
         * 设置三级联动
         * @param {any} context 
         * @param {string} linkAge 
         */
        setLinkAge(context, linkAge) {
            context.commit('setLinkAge', linkAge);
        }
    },
    mutations: {
        /**
         * 设置三级联动
         * @param {any} state 
         * @param {string} linkAge 
         */
        setLinkAge(state, linkAge) {
            state.linkAge = linkAge;
        }
    },
    getters: {
        linkAge: state => state.linkAge
    }
}