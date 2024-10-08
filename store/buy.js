import secureStorage from "~/plugins/secure-storage";
export default {
  state: () => ({
    listItems: [],
    historyItems: [],
    selectedCustomer: false,
    myCustomer: {},
  }),
  mutations: {
    SET_CUSTOMER(state, value) {
      state.myCustomer = value;
    },
    SET_CUSTOMER_BOOL(state, value) {
      state.selectedCustomer = value;
    },
    SET_ITEMS(state, value) {
      state.listItems.push(value);
    },
    SET_HISTORY_ITEMS(state, value) {
      state.historyItems.push(value);
    },
    SET_NEW_ITEMS(state, value) {
      state.listItems = value;
    },
    SET_INCREMENT(state, value) {
      state.listItems.forEach((item, index) => {
        if (index === value) {
          item.amount += 1;
        }
      });
      return state.listItems;
    },
    SET_DECREMENT(state, value) {
      state.listItems = state.listItems.filter((item, index) => {
        if (index === value) {
          item.amount -= 1;
        }
        return item.amount > 0;
      });
      return state.listItems;
    },
  },
  actions: {
    async setData({ commit }, data) {
      console.log(data);
      try {
        commit("SET_NEW_ITEMS", data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    listItems: (state) => state.listItems,
    historyItems: (state) => state.historyItems,
  },
};
