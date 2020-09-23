export default {
  actions: {
    navSetPage(context, number) {
      context.commit('updatePage', number);
    }
  },
  mutations: {
    updatePage(state, number) {
      state.pageNumber = number;
    }
  },
  state: {
    pageNumber: 0
  },
  getters: {
    navPage(state) {
      return state.pageNumber;
    }
  }
}
