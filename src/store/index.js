import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import navBar from "./modules/navbar";
import orders from "./modules/orders";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    navBar,
    orders
  }
});
