import databse from "./db";
import api from "./api";

export default {
  
  actions:{
    async getOrders(context) {
      
      try {
                        
        let orders = await databse.getOrders();

        if (orders.length > 0) {
          context.commit('ordersUpdate', orders);  
        } 

        orders = await api.getOrders(context.rootState.user.apiKey);
        context.commit('ordersUpdate', orders);

        orders.map(el =>{
          databse.saveOrder(el);
        });
        
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
      return state.orders.sort((a, b) => {
        return a.common.ewaId - b.common.ewaId;  
      });
    },
    ordersAccept(state) {
      return state.orders.filter((item) => {return item.statusName == "В пути"}).sort((a, b) => {
        return a.common.ewaId - b.common.ewaId;   
      });
    },
    ordersGiveOut(state) {
      return state.orders.filter((item) => {return item.statusName == "На терминале (ПВЗ)"}).sort((a, b) => {
        return a.common.ewaId - b.common.ewaId;   
      });
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
