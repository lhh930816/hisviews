export default {
  state: {
    /**
     * 请求令牌
     */
    token: ''
  },
  namespaced: true,
  actions: {
    /**
     * 设置令牌
     * @param {any} context 
     * @param {string} token 
     */
    setToken(context, token) {
      context.commit('setToken', token);
    }
  },
  mutations: {
    /**
     * 设置令牌
     * @param {any} state 
     * @param {string} token 
     */
    setToken(state, token) {
      state.token = token;
    }
  },
  getters: {
    token: state => state.token
  }
}
