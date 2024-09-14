export default {
  state: () => ({
    currentYear: new Date().getFullYear(),
    appVersion: "Version 0.0.0",
    header: {
      title: "ຮ້ານຄຳຫວຽດສະຫວັນ",
    },
    title: "",
    focusingMenu: 4,
  }),
  mutations: {
    SET_HEADER(state, value) {
      state.header.title = value;
    },
    SET_HEADER_TITLE(state, value) {
      state.title = value;
    },
    async SET_FOCUSING_MENU(state, data) {
      state.focusingMenu = data;
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
