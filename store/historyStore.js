export default {
  namespaced: true,
  state: () => ({
    status: null,
    error: null,
    buyList: [],
    countPage: "",
    totalList: "",
    tableNull: false,
  }),
  mutations: {
    InitState(state) {
      state.status = "loading";
    },
    SET_BUY(state, data) {
      console.log("dd", data);

      if (data) {
        state.buyList = data.resultData.data;
        state.totalList = data.resultData.TotalUser;
        state.countPage = data.resultData.TotalPage;
      } else {
        state.TotalPage = 0;
        state.totalList = 0;
        state.userList = [];
      }
    },
    SET_UPDATE_USER(state) {
      state.status = "ok";
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
    async GetHisBuy({ commit }, body) {
      try {
        let res = await this.$axios({
          method: "get",
          url: `/gold/transaction/buy/history`,
          headers: {
            authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJbmZvIjp7InVzZXJfaWQiOjEsInVzZXJfbmFtZSI6InAiLCJ1c2VyX3N1cm5hbWUiOiJwIiwidXNlcl90ZWwiOiIyMDk3MTYwNDU0IiwidXNlcl9zdGF0dXNfaWQiOjEsImNyZWF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6MDY6MTMuMDAwWiIsInVwZGF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6NDM6MTMuMDAwWiIsInN0dCI6MSwidXNlcl9zdGF0dXNfbmFtZSI6IlN1cGVyIEFkbWluIn0sInBlcm1pc3Npb24iOnsicGVybWlzc2lvbl9pZCI6MSwidXNlcl9zdGF0dXNfaWQiOjEsInVzZXJfbWFuYWdlIjoxLCJidXlfc2VsbCI6MSwicHJvZHVjdCI6MSwiYnV5X2hpc3RvcnkiOjEsInNlbGxfaGlzdG9yeSI6MSwidHVybl9oaXN0b3J5IjoxLCJtYW5hZ2VfdW5pdCI6MSwibWFuYWdlX3Byb2R1Y3RfdHlwZSI6MSwibWFuYWdlX3JhdGUiOjEsIm1hbmFnZV9jYXRlZ29yeSI6MSwibWFuYWdlX2xhaSI6MSwiY3JlYXRlX2F0IjoiMjAyNC0wOS0wN1QxNTo0ODo1OS4wMDBaIiwidXBkYXRlX2F0IjpudWxsLCJzdHQiOjF9fSwiaWF0IjoxNzI2MTQxNzA5LCJleHAiOjE3MjYxODQ5MDl9.KV07H-j5yTUjK-t0wre8288iwy6aIhOda07pNO8izqg",
          },
        });
        if (res.data.msg === "success") {
          commit("SET_BUY", res.data);
          commit("SET_TABLE_NULL", true);
        } else {
          commit("SET_USER", "");
          commit("SET_TABLE_NULL", false);
        }
      } catch (error) {}
    },
  },

  getters: {
    userList: (state) => state.userList,
  },
};
