import databse from "./db";
import api from "./api";

export default {
  actions: {
    async auth(context, authData) {
      const login = authData.login;
      const password = authData.password;
      
      context.commit('setIsWaiting', true);

      let result = await api.auth(login, password);
      
      context.commit('setIsWaiting', false);

      if (result.isError || result.data.addressId == null || result.data.addressId == "") {

        context.commit('updateUser', {isAuth: false, apiKey: ""});
      } else {

        context.commit('updateUser', {isAuth: !result.isError, apiKey: result.data.addressId});
      }      
    },

    async exit(context) {
      await databse.clearAll();
      context.commit('updateUser', {isAuth: false, apiKey: ""});
    }
  },
  mutations: {
    updateUser(state, user) {
      state.isAuth = user.isAuth;
      state.apiKey = user.apiKey;
    },
    setIsWaiting(state, isWaiting) {
      state.isWaiting = isWaiting;
    }
  },
  state: {
    isAuth: true,
    apiKey: "",
    isWaiting: false
  },
  getters: {
    isAuth(state) {
      return state.isAuth && state.apiKey !="";
    },
    userIsWaiting(state) {
      return state.isWaiting;
    }
  }
}
