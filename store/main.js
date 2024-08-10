export default {
  state: () => ({
    currentYear: new Date().getFullYear(),
    appVersion: "Version 0.0.0",
    header: {
      title: "ຮ້ານຄຳຫວຽດສະຫວັນ",
    },
  }),
  mutations: {
    SET_HEADER(state, value) {
      state.header.title = value;
    },
  },
  actions: {
    setHeader({ commit }, value) {
      try {
        commit("SET_HEADER", value);
      } catch (error) {}
    },
  },
  getters: {
    currentYear: (state) => state.currentYear,
    appVersion: (state) => state.appVersion,
    header: (state) => state.header,
  },
};
