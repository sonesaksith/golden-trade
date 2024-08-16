import { lang } from "moment";
import secureStorage from "~/plugins/secure-storage";
export default {
  namespaced: true,
  state: () => ({
    listItems: [],
    amountAll: "",
    priceAll: 0,
    myCustomer: {},
    selectedCustomer: false,
    historyItems: [],
    amountGard: [],
  }),
  mutations: {
    SET_CUSTOMER(state, value) {
      state.myCustomer = value;
    },
    SET_CUSTOMER_BOOL(state, value) {
      state.selectedCustomer = value;
    },
    SET_CLEAR_ALL(state, value) {
      state.listItems = value;
    },
    SET_ITEMS(state, value) {
      state.listItems.push(value);
      state.priceAll += value.amount * value.price;
    },
    SET_AMOUNT_ALL(state, value) {
      console.log("state.listItems", state.listItems);

      const totalPriceAll = state.listItems.reduce((total, item) => {
        return total + item.price ;
      }, 0);
      state.priceAll = totalPriceAll;
      console.log(totalPriceAll);
      // if (value.amount != 0) {
      //   state.priceAll = value.price * value.amount;
      // }
    },
    SET_INCREMENT(state, index) {
      state.amountGard++;
    },
    SET_DECREMENT(state, index) {
      if (state.amountGard > 1) {
        state.amountGard--;
      }
    },
    SET_INCREMENT(state, value) {
      state.listItems.forEach((item, index) => {
        if (index === value.index) {
          item.amount += 1;
          let a = value.item.price / (value.item.amount - 1);
          item.price += a;
        }
      });
      return state.listItems;
    },
    SET_DECREMENT(state, value) {
      state.listItems = state.listItems.filter((item, index) => {
        if (index === value.index) {
          item.amount -= 1;
          let a = value.item.price / (value.item.amount + 1);
          item.price -= a;
        }
        return item.amount > 0;
      });
      return state.listItems;
    },
    UPDATE_AMOUNT(state, payload) {
      const item = state.listItems.find((i) => i.id === payload.id);
      if (item) {
        const newAmount = item.amount + payload.amount;
        state.priceAll += payload.amount * item.price;
        item.amount = newAmount;
        if (payload.amount > 1) {
          item.price += payload.price;
        } else {
          item.price = payload.price * newAmount;
        }
      }
    },

    SET_HISTORY_ITEMS(state, value) {
      state.historyItems.push(value);
    },
    SET_HISTORY_ITEMS(state, value) {
      state.historyItems.push(value);
    },
  },
  actions: {
    ClearAllData({ commit }) {
      commit("SET_CLEAR_ALL", []);
    },
    addOrUpdateItem({ state, commit }, item) {
      const existingItem = state.listItems.find((i) => i.id === item.id);
      if (existingItem) {
        commit("UPDATE_AMOUNT", {
          id: item.id,
          amount: item.amount,
          price: item.price,
        });
      } else {
        commit("SET_ITEMS", item);
      }
    },
    Delete() {
      if (this.$state.result > 1) {
        this.$state.result--;
      }
    },
    Add() {
      const mainStore = useMainStore();
      this.$state.result++;
      if (this.$state.result > 2) {
        this.$state.result = 2;
      }
    },
  },
  getters: {
    listItems: (state) => state.listItems,
    priceAll: (state) => state.priceAll,
    historyItems: (state) => state.historyItems,
  },
};
