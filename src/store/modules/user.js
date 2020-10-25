export default {
  actions: {
    async auth(context, authData) {
      const login = authData.login;
      const password = authData.password;
      console.log("login: " + login);
      console.log("password: " + password);
      context.commit('updateUser', {isAuth: true, apiKey: "kjhsdfkjh"});
    },

    async exit(context) {
      context.commit('updateUser', {isAuth: false, apiKey: ""})
    }
  },
  mutations: {
    updateUser(state, user) {
      state.isAuth = user.isAuth;
      state.apiKey = user.apiKey;
    }
  },
  state: {
    isAuth: true,
    apiKey: ""
  },
  getters: {
    isAuth(state) {
      return state.isAuth;
    }
  }
}