export default {
  state: () => ({
    listItemsBuyinToChange: [],
    listItemsSellOutToChange: [],
  }),
  mutations: {
    SET_ITEMS_BUY_TO_CHANGE(state, value) {
      state.listItemsBuyinToChange.push(value);
    },
    SET_NEW_ITEMS_BUY_TO_CHANGE(state, value) {
      state.listItemsBuyinToChange = value;
    },
    SET_INCREMENT_BUY_TO_CHANGE(state, value) {
      state.listItemsBuyinToChange.forEach((item, index) => {
        if (index === value) {
          item.amount += 1;
        }
      });
      return state.listItemsBuyinToChange;
    },
    SET_DECREMENT_BUY_TO_CHANGE(state, value) {
      state.listItemsBuyinToChange = state.listItemsBuyinToChange.filter(
        (item, index) => {
          if (index === value) {
            item.amount -= 1;
          }
          return item.amount > 0;
        }
      );
      return state.listItemsBuyinToChange;
    },
    SET_CLEAR_ALL_SELL_TO_CHANGE(state, value) {
      state.listItemsSellOutToChange = value;
    },
    SET_ITEMS_SELL_TO_CHANGE(state, value) {
      state.listItemsSellOutToChange.push(value);
    },
    SET_INCREMENT_SELL_TO_CHANGE(state, value) {
      state.listItemsSellOutToChange.forEach((item, index) => {
        if (index === value) {
          item.amount += 1;
        }
      });
      return state.listItemsSellOutToChange;
    },
    UPDATE_AMOUNT_SELL_TO_CHANGE(state, payload) {
      const item = state.listItemsSellOutToChange.find(
        (i) => i.id === payload.id
      );
      if (item) {
        item.amount += payload.amount;
      }
    },
    SET_DECREMENT_SELL_TO_CHANGE(state, value) {
      state.listItemsSellOutToChange = state.listItemsSellOutToChange.filter(
        (item, index) => {
          if (index === value) {
            item.amount -= 1;
          }
          return item.amount > 0;
        }
      );
      return state.listItemsSellOutToChange;
    },
  },
  actions: {
    async setDataBuytoChange({ commit }, data) {
      try {
        commit("SET_ITEMS_BUY_TO_CHANGE", data);
      } catch (error) {
        console.log(error);
      }
    },
    ClearAllDataSellToChange({ commit }) {
      commit("SET_CLEAR_ALL_SELL_TO_CHANGE", []);
    },
    addOrUpdateItemSellToChange({ state, commit }, item) {
      const existingItem = state.listItemsSellOutToChange.find(
        (i) => i.id === item.id
      );
      if (existingItem) {
        commit("UPDATE_AMOUNT_SELL_TO_CHANGE", {
          id: item.id,
          amount: item.amount,
        });
      } else {
        commit("SET_ITEMS_SELL_TO_CHANGE", item);
      }
    },
  },
  getters: {
    listItemsBuyinToChange: (state) => state.listItemsBuyinToChange,
    listItemsSellOutToChange: (state) => state.listItemsSellOutToChange,
  },
};
