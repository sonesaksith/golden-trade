export default {
  state: () => ({
    listCartBuy: [],
    listCartSell: [],
  }),
  mutations: {
    CLEAR_LIST_CART_BUY(state) {
      state.listCartBuy = [];
    },
    ADD_LIST_CART_BUY(state, newItem) {
      const existingItemIndex = state.listCartBuy.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.listCartBuy[existingItemIndex];
        state.listCartBuy.splice(existingItemIndex, 1, {
          ...existingItem,
          countItem: existingItem.countItem + 1,
        });
      } else {
        newItem.countItem = 1;
        state.listCartBuy.push(newItem);
      }
    },
    MINUS_ITEMCOUNT_CART_BUY(state, itemId) {
      const existingItemIndex = state.listCartBuy.findIndex(
        (item) => item.id === itemId
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.listCartBuy[existingItemIndex];

        if (existingItem.countItem > 1) {
          state.listCartBuy.splice(existingItemIndex, 1, {
            ...existingItem,
            countItem: existingItem.countItem - 1,
          });
        }
      }
    },

    PLUS_ITEMCOUNT_CART_BUY(state, itemId) {
      const existingItemIndex = state.listCartBuy.findIndex(
        (item) => item.id === itemId
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.listCartBuy[existingItemIndex];

        state.listCartBuy.splice(existingItemIndex, 1, {
          ...existingItem,
          countItem: existingItem.countItem + 1,
        });
      }
    },

    DELETE_ITEM_CART_BUY(state, itemId) {
      const existingItemIndex = state.listCartBuy.findIndex(
        (item) => item.id === itemId
      );

      if (existingItemIndex !== -1) {
        state.listCartBuy.splice(existingItemIndex, 1);
      }
    },
    CLEAR_LIST_CART_SELL(state) {
      state.listCartSell = [];
    },
    ADD_LIST_CART_SELL(state, newItem) {
      const existingItemIndex = state.listCartSell.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.listCartSell[existingItemIndex];
        state.listCartSell.splice(existingItemIndex, 1, {
          ...existingItem,
          countItem: existingItem.countItem + 1,
        });
      } else {
        newItem.countItem = 1;
        state.listCartSell.push(newItem);
      }
    },
    MINUS_ITEMCOUNT_CART_SELL(state, itemId) {
      const existingItemIndex = state.listCartSell.findIndex(
        (item) => item.id === itemId
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.listCartSell[existingItemIndex];

        if (existingItem.countItem > 1) {
          state.listCartSell.splice(existingItemIndex, 1, {
            ...existingItem,
            countItem: existingItem.countItem - 1,
          });
        }
      }
    },

    PLUS_ITEMCOUNT_CART_SELL(state, itemId) {
      const existingItemIndex = state.listCartSell.findIndex(
        (item) => item.id === itemId
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.listCartSell[existingItemIndex];

        state.listCartSell.splice(existingItemIndex, 1, {
          ...existingItem,
          countItem: existingItem.countItem + 1,
        });
      }
    },

    DELETE_ITEM_CART_SELL(state, itemId) {
      const existingItemIndex = state.listCartSell.findIndex(
        (item) => item.id === itemId
      );

      if (existingItemIndex !== -1) {
        state.listCartSell.splice(existingItemIndex, 1);
      }
    },
  },
  actions: {},
  getters: {
    sumListCartBuy(state) {
      return state.listCartBuy.reduce((total, item) => {
        return total + item.sellGold * item.countItem;
      }, 0);
    },

    sumListCartSell(state) {
      return state.listCartSell.reduce((total, item) => {
        return total + item.sellGold * item.countItem;
      }, 0);
    },

    sumListCartAll(state, getters) {
      return getters.sumListCartBuy + getters.sumListCartSell;
    },
  },
};
