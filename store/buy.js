import secureStorage from "~/plugins/secure-storage";
export default {
  state: () => ({
    listItems: [],
  }),
  mutations: {
    SET_ITEMS(state, value) {
      state.listItems.push(value);
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
  actions: {},
  getters: {
    listItems: (state) => state.listItems,
  },
};
