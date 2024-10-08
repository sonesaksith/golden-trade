export default {
  namespaced: true,
  state: () => ({
    status: null,
    error: null,
    buyList: [],
    sellList: [],
    trunList: [],
    buyInfoList: [],
    countPage: "",
    totalList: "",
    tableNull: false,
    loadBuy: false,
    loadSell: false,
    loadTrun: false,
  }),
  mutations: {
    InitState(state) {
      state.status = "loading";
    },
    LOAD_BUY(state, data) {
      state.loadBuy = data;
    },
    LOAD_SELL(state, data) {
      state.loadSell = data;
    },
    LOAD_TRUN(state, data) {
      state.loadTrun = data;
    },
    SET_BUY(state, data) {
      // console.log("dd", data);

      if (data) {
        state.buyList = data.resultData;
        state.totalList = data.total;
        state.countPage = data.count_page;
        // console.log("state.countPage", state.countPage);
      } else {
        state.TotalPage = 0;
        state.totalList = 0;
        state.userList = [];
      }
    },
    SET_SELL(state, data) {
      if (data) {
        state.sellList = data.resultData;
        state.totalList = data.total;
        state.countPage = data.count_page;
        // console.log("state.countPage", state.countPage);
      } else {
        state.TotalPage = 0;
        state.totalList = 0;
        state.userList = [];
      }
    },
    SET_TRUN(state, data) {
      if (data) {
        state.trunList = data.resultData;
        state.totalList = data.total;
        state.countPage = data.count_page;
        // console.log("state.countPage", state.countPage);
      } else {
        state.TotalPage = 0;
        state.totalList = 0;
        state.userList = [];
      }
    },
    SET_INFO_BUY(state, data) {
      state.buyInfoList = data;
    },
    SET_TABLE_NULL(state, value) {
      state.tableNull = value;
    },
    StateError(state, error) {
      state.status = "error";
      state.error = error;
    },
  },
  actions: {
    async GetHisBuy({ commit }, item) {
      commit("LOAD_BUY", true);
      try {
        let res = await this.$axios({
          method: "get",
          url: `/gold/transaction/buy/history?limit=${item.limit}&page=${item.page}&search=${item.search}`,
        });
        if (res.data.msg === "success") {
          commit("SET_BUY", res.data);
          commit("SET_TABLE_NULL", true);
        } else {
          commit("SET_BUY", "");
          commit("SET_TABLE_NULL", false);
        }
      } catch (error) {
      } finally {
        commit("LOAD_BUY", false);
      }
    },
    async Delete({ commit }, item) {
      commit("LOAD_BUY", true);
      let res;
      try {
        res = await this.$axios({
          method: "put",
          url: `/gold/transaction/cancelbill/${item}
`,
        });
        if (res.data.msg === "success") {
          commit("SET_BUY", res.data);
          commit("SET_TABLE_NULL", true);
        } else {
          commit("SET_BUY", "");
          commit("SET_TABLE_NULL", false);
        }
        return res;
      } catch (error) {
      } finally {
        commit("LOAD_BUY", false);
      }
    },
    async GetHisSell({ commit }, item) {
      commit("LOAD_SELL", true);
      console.log(item);
      try {
        let res = await this.$axios({
          method: "get",
          url: `/gold/transaction/sell/history?limit=${item.limit}&page=${item.page}&search=${item.search}`,
        });
        if (res.data.msg === "success") {
          commit("SET_SELL", res.data);
          commit("SET_TABLE_NULL", true);
        } else {
          commit("SET_SELL", "");
          commit("SET_TABLE_NULL", false);
        }
      } catch (error) {
      } finally {
        commit("LOAD_SELL", false);
      }
    },
    async GetHisTrun({ commit }, item) {
      commit("LOAD_TRUN", true);
      try {
        let res = await this.$axios({
          method: "get",
          url: `/gold/transaction/turn/history?limit=${item.limit}&page=${item.page}&search=${item.search}`,
        });
        if (res.data.msg === "success") {
          commit("SET_TRUN", res.data);
          commit("SET_TABLE_NULL", true);
        } else {
          commit("SET_TRUN", "");
          commit("SET_TABLE_NULL", false);
        }
      } catch (error) {
      } finally {
        commit("LOAD_TRUN", false);
      }
    },
  },

  getters: {
    buyList: (state) => state.buyList,
  },
};
