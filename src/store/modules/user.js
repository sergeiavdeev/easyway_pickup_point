export default {
  actions: {
    async auth(context, authData) {
      const login = authData.login;
      const password = authData.password;
      console.log("login: " + login);
      console.log("password: " + password);
      context.commit('updateUser', {isAuth: true, apiKey: "aa87e391-9650-11e9-8109-00155d032908"});
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
    apiKey: "aa87e391-9650-11e9-8109-00155d032908"
  },
  getters: {
    isAuth(state) {
      return state.isAuth;
    }
  }
}
