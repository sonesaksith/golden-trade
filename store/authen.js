import secureStorage from "~/plugins/secure-storage";
export default {
  state: () => ({
    isLoading: false,
  }),
  mutations: {
    SET_LOADING(state, value) {
      state.isLoading = value;
    },
  },
  actions: {
    async Login({ state, commit }, body) {
      try {
        const resp = await this.$axios({
          method: "post",
          url: "/api/auth/login",
          data: body,
        });
        return resp;
      } catch (error) {
        throw error.response;
      }
    },
  },
  getters: {
    isLoading: (state) => state.isLoading,
  },
};
