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
        commit("SET_LOADING", true);
        if (body.username && body.password) {
            let token = "3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2";
            // setTimeout(() => {
                secureStorage.setItem('token', token)
                secureStorage.setItem('userinfo', body)
                commit("SET_LOADING", false);
                return ({
                    status: 200,
                    message: "success",
                })
            // }, 1000);
        } else {
            commit("SET_LOADING", false);
            return ({
                status: 301,
                message: "failed",
            })
        }
      } catch (error) {
        commit("SET_LOADING", false);
        throw error.response;
      }
    },
  },
  getters: {
    isLoading: (state) => state.isLoading,
  },
};
