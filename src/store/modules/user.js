export default {
  state: {
    /**
     * 请求令牌
     */
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6ImFkbWluIiwiUGFzc1dvcmQiOiIxMjM0NTYiLCJQS0VZIjoiYjc2ZjhmMzZiMjU1MjI1OWFmY2UwNWQ4OGY2NGEwOGMiLCJuYmYiOjE1Nzg2Mjk1MDEsImV4cCI6MTU3ODYzMzEwMSwiaWF0IjoxNTc4NjI5NTAxLCJpc3MiOiJ4a2hpcyIsImF1ZCI6ImlkZW50aXR5In0.hu13xuSLp4tzBH0BI5QDrcZSszNKhjFdvqwNB2EkjaM'
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
