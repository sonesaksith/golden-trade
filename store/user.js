export default {
  state: () => ({
    selectingCus: {},
    goingToBill: "buy",
    listUser: [],
    total: 0,
    countPage: 0,
  }),
  mutations: {
    SET_USER(state, data) {
      state.listUser = data;
    },
    SET_USER_COUNT(state, data) {
      state.countPage = data.count_page;
      state.total = data.total;
    },
    UPDATE_UESR(state, data) {
      console.log(data);
      // for (let index = 0; index < state.listUser.length; index++) {
      //   const element = state.listUser[index];
      //   if (element.user_id.no == data.id) {
      //     state.listUser[index].user_name = data.name;
      //     state.listUser[index].user_surname = data.surname;
      //     state.listUser[index].user_tel = data.tel;
      //     state.listUser[index].user_address = data.address;
      //   }
      // }
      state.listUser = state.listUser.map((user) =>
        user.user_id === data.user_id ? { ...user, ...data } : user
      );

      console.log(state.listUser);
    },
    DELETE_USER(state, id) {
      state.listUser = state.listUser.filter((x) => x.user_id != id);
    },

    SET_GOING_TO_BILL(state, data) {
      state.goingToBill = data;
    },
    SET_SELECTING_user(state, data) {
      state.selectingCus = data;
    },
  },
  actions: {
    async getUser({ state, commit }, item) {
      console.log("Getting user...");
      try {
        const resp = await this.$axios({
          method: "get",
          url: `/api/users/view?search=${item?.search || ""}&page=${
            item?.page
          }&limit=${item?.limit}`,
        });
        if (resp.status == 200 && resp.data.msg == "success") {
          commit("SET_USER", resp.data.resultData);
          commit("SET_USER_COUNT", resp.data);
        }

        return resp;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async createUser({ state, commit }, item) {
      console.log("Create user...");
      try {
        const resp = await this.$axios({
          method: "post",
          url: `/api/users/create`,
          data: item,
        });
        return resp;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async updateUser({ state, commit }, item) {
      console.log("Create user...");
      try {
        const resp = await this.$axios({
          method: "put",
          url: `/api/users/update`,
          data: item,
        });
        if (resp.status == 200 && resp.data.msg == "success") {
          commit("UPDATE_UESR", {
            user_id: item.id,
            user_name: item.name,
            user_surname: item.surname,
            user_tel: item.tel,
            user_status_id: item.userStatusId,
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
    async deleteUser({ state, commit }, id) {
      console.log("Delete user...");
      try {
        const resp = await this.$axios({
          method: "delete",
          url: `/api/users/delete/${id}`,
        });
        if (resp.status == 200 && resp.data.msg == "success") {
          commit("DELETE_USER", id);
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
