export default {
  state: {
    /**
     * 请求令牌
     */
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6ImFkbWluIiwiUGFzc1dvcmQiOiIxMjM0NTYiLCJQS0VZIjoiYjc2ZjhmMzZiMjU1MjI1OWFmY2UwNWQ4OGY2NGEwOGMiLCJuYmYiOjE1Nzg3MTUxMjAsImV4cCI6MTU3ODcxODcyMCwiaWF0IjoxNTc4NzE1MTIwLCJpc3MiOiJ4a2hpcyIsImF1ZCI6ImlkZW50aXR5In0.NJX9Riv5zzHZC5eA9U3MeYQq7Aqjhhu-z8ClBQrUMa8'
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
      sessionStorage.setItem("info", token);
    }
  },
  getters: {
    token: state => state.token || sessionStorage.getItem("info")
  }
}
