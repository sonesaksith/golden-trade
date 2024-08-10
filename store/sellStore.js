import secureStorage from "~/plugins/secure-storage";
export default {
  namespaced: true,
  state: () => ({
    listItems: [],
    amountAll: "",
    priceAll: 0,
  }),
  mutations: {
    SET_CLEAR_ALL(state, value) {
      state.listItems = value;
    },
    SET_ITEMS(state, value) {
      state.listItems.push(value);
      state.priceAll += value.amount * value.price;
      console.log(" state.listItems.", state.listItems);
    },
    SET_AMOUNT_ALL(state, value) {
      state.priceAll = value.price * value.amount;
      console.log(" state.priceAll ", state.priceAll);
    },
    SET_INCREMENT(state, value) {
      state.listItems.forEach((item, index) => {
        if (index === value) {
          item.amount += 1;
        }
      });
      return state.listItems;
    },
    UPDATE_AMOUNT(state, payload) {
      const item = state.listItems.find((i) => i.id === payload.id);
      if (item) {
        const newAmount = item.amount + payload.amount;
        state.priceAll += payload.amount * item.price;
        item.amount = newAmount;
      }
      console.log(" state.listItems.", state.listItems);
    },
    SET_DECREMENT(state, value) {
      state.amountAll = value.amount * value.price;
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
    ClearAllData({ commit }) {
      commit("SET_CLEAR_ALL", []);
    },
    addOrUpdateItem({ state, commit }, item) {
      const existingItem = state.listItems.find((i) => i.id === item.id);
      if (existingItem) {
        commit("UPDATE_AMOUNT", { id: item.id, amount: item.amount });
      } else {
        commit("SET_ITEMS", item);
      }
    },
  },
  getters: {
    listItems: (state) => state.listItems,
    priceAll: (state) => state.priceAll,
  },
};
