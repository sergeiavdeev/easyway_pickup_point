export default {
  actions:{
    async getOrders(context) {
      try {
        const res = await fetch('http://192.168.0.197:8081/orders')
        const data = await res.json();
        context.commit('ordersUpdate', data.value);
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
        let date = new Date(item.Date);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        item.Date = '' + (day < 10 ? '0' + day : day) + '.' + (month < 10 ? '0' + month : month) + '.' + date.getFullYear();
        return item;
      });
    },
    ordersAccept(state) {
      return state.orders.filter((item) => {return item.Number == "010210103" || item.Number == "010214779"});
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
