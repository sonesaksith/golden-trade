export default {
  state: () => ({
    dropDown: [],
  }),
  mutations: {
    SET_DROPDOWN(state, value) {
      state.dropDown = value;
    },
  },
  actions: {
    async GetDropDown({ state, commit }) {
      try {
        const res = await this.$axios({
          method: "get",
          url: "/api/dropdown/view",
        });
        if (res?.data?.status == 200) {
          // console.log(res.data.resultData);
          commit("SET_DROPDOWN", res.data.resultData);
        }
        return res;
      } catch (error) {
        throw error;
      }
    },
  },
  getters: {
    dropDown: (state) => state.dropDown,
  },
};
