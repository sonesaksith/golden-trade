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
    async Loginss({ state, commit }, body) {
      console.log(body);
      try {
        const axios = require("axios");
        const resp = await axios({
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
