export default {
  actions:{
    async getOrders(context) {
      try {

        console.log('Api key' + context.rootState.user.apiKey);

        const res = await fetch('http://10.1.27.171:8081/v2/orders?apiKey=' + context.rootState.user.apiKey);
        const data = await res.json();

        if (!data.isError) {
          context.commit('ordersUpdate', data.data); 
        } else {
          context.commit('setError', data.errors);
        }
      } catch (e) {
        context.commit('setError', e);
      }
    },

    ordersSetTab(context, index) {
      context.commit('updateTabIndex', index);
    }
  },
  mutations: {
    ordersUpdate(state, orders) {
      state.orders = orders;
      state.isError = false;
      state.error = "";
    },
    updateTabIndex(state, index) {
      state.tabIndex = index;
    },
    setError(state, error) {
      state.isError = true;
      state.error = error;
    }
  },
  state: {
    orders: [],
    tabIndex: 0,
    isError: false,
    error: ""
  },
  getters: {
    ordersAll(state){
      return state.orders.map((item) => {
        //let date = new Date(item.Date);
        //let day = date.getDate();
        //let month = date.getMonth() + 1;
        //item.Date = '' + (day < 10 ? '0' + day : day) + '.' + (month < 10 ? '0' + month : month) + '.' + date.getFullYear();
        return item;
      });
    },
    ordersAccept(state) {
      return state.orders.filter((item) => {return item.statusName == "В пути"});
    },
    ordersGiveOut(state) {
      return state.orders.filter((item) => {return item.statusName == "На терминале (ПВЗ)"});
    },
    ordersTab(state) {
      return state.tabIndex;
    },
    ordersError(state) {
      return state.isError;
    },
    ordersErrorObject(state) {
      return state.error;
    }
  }
}
