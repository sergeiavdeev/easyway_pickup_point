export default {
  actions:{
    async getOrders(context) {
      try {

        //console.log('Api key' + context.rootState.user.apiKey);

        const res = await fetch('http://10.1.27.171:8081/v2/orders?apiKey=' + context.rootState.user.apiKey);
        const data = await res.json();

        if (!data.isError) {
          context.commit('ordersUpdate', data.data); 
          data.data.map(function(el, i) {
            
            fetch('http://10.1.27.171:8081/v2/order?id=' + el.id)
            .then(response => {
              return response.json();
            })
            .then(ob => {              
              context.commit('orderUpdate', {dataName: "common", data: ob.data, i: i});
              fetch('http://10.1.27.171:8081/v2/contact?id=' + ob.data.recieverId)
              .then(response => {
                return response.json();
              })
              .then(ob => {              
                context.commit('orderUpdate', {dataName: "contact", data: ob.data, i: i});
              });
            });            
          });
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
    orderUpdate(state, data) {      
      let newOrders = state.orders.slice();
      newOrders[data.i].[data.dataName] = data.data;
      state.orders = newOrders;
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
      return state.orders;
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
