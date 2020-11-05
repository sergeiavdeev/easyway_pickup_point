export default {
  actions: {
    navSetPage(context, number) {
      context.commit('updatePage', number);
    },
    navSetSearchText(context, event) {
      context.commit('setSearchText', event.target.value);
    }
  },
  mutations: {
    updatePage(state, number) {
      state.pageNumber = number;
    },
    setSearchText(state, text) {
      state.searchText = text;
    }
  },
  state: {
    pageNumber: 0, 
    searchText: ""
  },
  getters: {
    navPage(state) {
      return state.pageNumber;
    },
    navSearchText(state) {
      return state.searchText;
    }
  }
}
