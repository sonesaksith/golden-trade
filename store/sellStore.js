import secureStorage from "~/plugins/secure-storage";
export default {
  namespaced: true,
  state: () => ({
    listItems: [],
  }),
  mutations: {
    SET_CLEAR_ALL(state, value) {
      state.listItems = value;
    },
    SET_ITEMS(state, value) {
      state.listItems.push(value);
    },
    SET_INCREMENT(state, value) {
      console.log("value", value);

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
        item.amount += payload.amount;
      }
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
    ClearAllData({ commit }) {
      commit("SET_CLEAR_ALL", []);
    },
    addOrUpdateItem({ state, commit }, item) {
      const existingItem = state.listItems.find(i => i.id === item.id);
      if (existingItem) {
        commit('UPDATE_AMOUNT', { id: item.id, amount: item.amount });
      } else {
        commit('SET_ITEMS', item);
      }
    }
  },
  getters: {
    listItems: (state) => state.listItems,
  },
};
