export default {
  state: () => ({
    selectingCus: {},
    goingToBill: "buy",
    listCustomer: [],
    total: 0,
    countPage: 0,
  }),
  mutations: {
    SET_CUSTOMER(state, data) {
      state.listCustomer = data;
    },
    SET_CUSTOMER_COUNT(state, data) {
      state.countPage = data.count_page;
      state.total = data.total;
    },
    ADD_CUSTOMER(state, data) {
      state.listCustomer.push(data);
    },
    UPDATE_CUSTOMER_BY_NO(state, data) {
      console.log(data);
      // for (let index = 0; index < state.listCustomer.length; index++) {
      //   const element = state.listCustomer[index];
      //   if (element.customer_id.no == data.id) {
      //     state.listCustomer[index].customer_name = data.name;
      //     state.listCustomer[index].customer_surname = data.surname;
      //     state.listCustomer[index].customer_tel = data.tel;
      //     state.listCustomer[index].customer_address = data.address;
      //   }
      // }
      state.listCustomer = state.listCustomer.map((customer) =>
        customer.customer_id === data.customer_id
          ? { ...customer, ...data }
          : customer
      );

      console.log(state.listCustomer);
    },
    DELETE_CUSTOMER_BY_NO(state, id) {
      state.listCustomer = state.listCustomer.filter(
        (x) => x.customer_id != id
      );
    },

    SET_GOING_TO_BILL(state, data) {
      state.goingToBill = data;
    },
    SET_SELECTING_CUSTOMER(state, data) {
      state.selectingCus = data;
    },
  },
  actions: {
    async getCustomer({ state, commit }, item) {
      console.log("Getting customer...");
      try {
        const resp = await this.$axios({
          method: "get",
          url: `/api/customer/view?search=${item?.search || ""}&page=${
            item?.page
          }&limit=${item?.limit}`,
        });
        if (resp.status == 200 && resp.data.msg == "success") {
          commit("SET_CUSTOMER", resp.data.resultData);
          commit("SET_CUSTOMER_COUNT", resp.data);
        }

        return resp;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async createCustomer({ state, commit }, item) {
      console.log("Create customer...");
      try {
        const resp = await this.$axios({
          method: "post",
          url: `/api/customer/create`,
          data: item,
        });
        return resp;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async updateCustomer({ state, commit }, item) {
      console.log("Create customer...");
      try {
        const resp = await this.$axios({
          method: "put",
          url: `/api/customer/update`,
          data: item,
        });
        if (resp.status == 200 && resp.data.msg == "success") {
          commit("UPDATE_CUSTOMER_BY_NO", {
            customer_id: item.id,
            customer_name: item.name,
            customer_surname: item.surename,
            customer_tel: item.tel,
            customer_address: item.address,
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
    async deleteCustomer({ state, commit }, id) {
      console.log("Delete customer...");
      try {
        const resp = await this.$axios({
          method: "delete",
          url: `/api/customer/delete/${id}`,
        });
        if (resp.status == 200 && resp.data.msg == "success") {
          commit("DELETE_CUSTOMER_BY_NO", id);
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
