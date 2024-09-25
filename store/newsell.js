export default {
  state: () => ({
    listCartBuy: [],
    listCartSell: [],
    cusData: [],
    buyInfoList: {},
    previewBill: {},
    statusTran: "",
  }),
  mutations: {
    CLEAR_LIST_CART_BUY(state) {
      state.listCartBuy = [];
    },
    SET_CUS(state, data) {
      state.cusData = data;
    },
    SET_STTTRAN(state, data) {
      state.statusTran = data;
    },
    SET_PREVIEW_BILL(state, data) {
      state.previewBill = data;
    },
    SET_BUYINFOSTT(state, data) {
      if (data.list_sell) {
        data.list_sell = JSON.parse(data.list_sell);
      }
      if (data.list_buy) {
        data.list_buy = JSON.parse(data.list_buy);
      }
      if (data.seller_info) {
        data.seller_info = JSON.parse(data.seller_info);
      }
      if (data.list_detail) {
        data.list_detail = JSON.parse(data.list_detail);
      }
      if (data.customer_info) {
        data.customer_info = JSON.parse(data.customer_info);
      }

      state.buyInfoList = data;
    },
    ADD_LIST_CART_BUY(state, newItem) {
      // const existingItemIndex = state.listCartBuy.findIndex(
      //   (item) => item.id === newItem.id
      // );

      // if (existingItemIndex !== -1) {
      //   const existingItem = state.listCartBuy[existingItemIndex];
      //   state.listCartBuy.splice(existingItemIndex, 1, {
      //     ...existingItem,
      //     countItem: existingItem.countItem + 1,
      //   });
      // } else {
      newItem.countItem = 1;
      state.listCartBuy.push(newItem);
      // }
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
    ADD_LIST_CART_SELL(state, { newItem, price }) {
      const existingItemIndex = state.listCartSell.findIndex(
        (item) => item.product_id === newItem.product_id
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.listCartSell[existingItemIndex];
        state.listCartSell.splice(existingItemIndex, 1, {
          ...existingItem,
          countItem: existingItem.countItem + 1,
        });
      } else {
        newItem.countItem = 1;
        newItem.price = price + newItem.price_lai;
        state.listCartSell.push(newItem);
      }
    },
    MINUS_ITEMCOUNT_CART_SELL(state, { itemId, price }) {
      const existingItemIndex = state.listCartSell.findIndex(
        (item) => item.product_id === itemId
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

    PLUS_ITEMCOUNT_CART_SELL(state, { itemId, price }) {
      const existingItemIndex = state.listCartSell.findIndex(
        (item) => item.product_id === itemId
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
        (item) => item.product_id === itemId
      );

      if (existingItemIndex !== -1) {
        state.listCartSell.splice(existingItemIndex, 1);
      }
    },
  },
  actions: {
    async GetCus({ commit }, item) {
      try {
        let res = await this.$axios({
          method: "get",
          url: `/gold/customer/view`,
        });

        commit("SET_CUS", res.data.resultData);
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
      }
    },
    async TurnProduct({ commit }, item) {
      try {
        let res = await this.$axios({
          method: "post",
          url: `/gold/transaction/turn`,
          data: item,
        });
        return res;
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
      }
    },
    async SellProduct({ commit }, item) {
      try {
        let res = await this.$axios({
          method: "post",
          url: `/gold/transaction/sell`,
          data: item,
        });
        return res;
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
      }
    },
    async BuyProduct({ commit }, item) {
      try {
        let res = await this.$axios({
          method: "post",
          url: `/gold/transaction/buy`,
          data: item,
        });
        return res;
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
      }
    },
  },
  getters: {
    sumListCartBuy(state) {
      return state.listCartBuy.reduce((total, item) => {
        return total + item.price * item.countItem;
      }, 0);
    },

    sumListCartSell(state) {
      return state.listCartSell.reduce((total, item) => {
        return total + item.price * item.countItem;
      }, 0);
    },

    sumListCartAll(state, getters) {
      return getters.sumListCartBuy + getters.sumListCartSell;
    },
    diff(state, getters) {
      return getters.sumListCartSell - getters.sumListCartBuy;
    },
    sumSellRealWeight(state, getters) {
      return state.listCartSell.reduce((total, item) => {
        return total + item.real_weight;
      }, 0);
    },
    sumBuyRealWeight(state, getters) {
      return state.listCartBuy.reduce((total, item) => {
        return total + item.realWeight;
      }, 0);
    },
  },
};
