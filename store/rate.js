export default {
  state: () => ({
    selectingCus: {},
    goingToBill: "buy",
    listRate: [],
    total: 0,
    countPage: 0,
  }),
  mutations: {
    SET_RATE(state, data) {
      state.listRate = data;
    },
    SET_RATE_COUNT(state, data) {
      state.countPage = data.count_page;
      state.total = data.total;
    },
    UPDATE_RATE(state, data) {
      state.listRate = state.listRate.map((rate) =>
        rate.rate_id === data.rate_id ? { ...rate, ...data } : rate
      );

      console.log(state.listRate);
    },
    DELETE_RATE(state, id) {
      state.listRate = state.listRate.filter((x) => x.rate_id != id);
    },

    SET_GOING_TO_BILL(state, data) {
      state.goingToBill = data;
    },
    SET_SELECTING_user(state, data) {
      state.selectingCus = data;
    },
  },
  actions: {
    async getRate({ state, commit }, item) {
      console.log("Getting user...");
      try {
        const resp = await this.$axios({
          method: "get",
          url: `/api/rate/view?search=${item?.search || ""}&page=${
            item?.page
          }&limit=${item?.limit}`,
        });
        if (resp.status == 200 && resp.data.msg == "success") {
          commit("SET_RATE", resp.data.resultData);
          commit("SET_RATE_COUNT", resp.data);
        }

        return resp;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async createRate({ state, commit }, item) {
      console.log("Create user...");
      try {
        const resp = await this.$axios({
          method: "post",
          url: `/api/rate/create`,
          data: item,
        });
        return resp;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async updateRate({ state, commit }, item) {
      console.log("Create user...");
      try {
        const resp = await this.$axios({
          method: "put",
          url: `/api/rate/update`,
          data: item,
        });
        if (resp.status == 200 && resp.data.msg == "success") {
          commit("UPDATE_RATE", {
            rate_id: item.id,
            rate_buy: item.rateBuy,
            rate_sell: item.rateSell,
            create_at: null,
            update_at: null,
            stt: 1,
          });
        }
        return resp;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async deleteRate({ state, commit }, id) {
      console.log("Delete user...");
      try {
        const resp = await this.$axios({
          method: "delete",
          url: `/api/rate/delete/${id}`,
        });
        if (resp.status == 200 && resp.data.msg == "success") {
          commit("DELETE_RATE", id);
        }
        return resp;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  getters: {},
};
