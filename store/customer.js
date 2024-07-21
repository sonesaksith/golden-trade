export default {
  state: () => ({
    selectingCus: {},
    goingToBill: "buy",
    listCustomer: [
      {
        no: 1,
        name: "Jenis",
        surname: "Alexa",
        tel: "209998889",
        address: "Dongpalan, Vientiane",
      },
      {
        no: 2,
        name: "Sila",
        surname: "Phonexay",
        tel: "209998777",
        address: "Samsenthai, Vientiane",
      },
      {
        no: 3,
        name: "Kham",
        surname: "Thonglith",
        tel: "209998666",
        address: "Phonsavan, Xieng Khouang",
      },
      {
        no: 4,
        name: "Vone",
        surname: "Sisouphanh",
        tel: "209998555",
        address: "Luang Prabang, Luang Prabang",
      },
      {
        no: 5,
        name: "Keo",
        surname: "Somvang",
        tel: "209998444",
        address: "Pakse, Champasak",
      },
      {
        no: 6,
        name: "Dao",
        surname: "Chittavong",
        tel: "209998333",
        address: "Thakhek, Khammouane",
      },
      {
        no: 7,
        name: "Sith",
        surname: "Vongsa",
        tel: "209998222",
        address: "Savannakhet, Savannakhet",
      },
      {
        no: 8,
        name: "Mai",
        surname: "Inthavong",
        tel: "209998111",
        address: "Phonthong, Champasak",
      },
      {
        no: 9,
        name: "Pheng",
        surname: "Xayyavong",
        tel: "209998000",
        address: "Xam Neua, Houaphanh",
      },
      {
        no: 10,
        name: "Sao",
        surname: "Souksavanh",
        tel: "209997999",
        address: "Muang Xay, Oudomxay",
      },
      {
        no: 11,
        name: "Seng",
        surname: "Nanthavong",
        tel: "209997888",
        address: "Paksan, Bolikhamxay",
      },
      {
        no: 12,
        name: "Chanh",
        surname: "Khamchanh",
        tel: "209997777",
        address: "Vang Vieng, Vientiane Province",
      },
      {
        no: 13,
        name: "Khoun",
        surname: "Phouthavong",
        tel: "209997666",
        address: "Saravane, Saravane",
      },
      {
        no: 14,
        name: "Dara",
        surname: "Phonphet",
        tel: "209997555",
        address: "Attapeu, Attapeu",
      },
      {
        no: 15,
        name: "Thong",
        surname: "Boupha",
        tel: "209997444",
        address: "Phongsaly, Phongsaly",
      },
      {
        no: 16,
        name: "Noy",
        surname: "Vongphachanh",
        tel: "209997333",
        address: "Sepon, Savannakhet",
      },
    ],
  }),
  mutations: {
    ADD_CUSTOMER(state, data) {
      state.listCustomer.push(data);
    },
    UPDATE_CUSTOMER_BY_NO(state, data) {
      for (let index = 0; index < state.listCustomer.length; index++) {
        const element = state.listCustomer[index];
        if (element.no == data.no) {
          state.listCustomer[index].name = data.name;
          state.listCustomer[index].surname = data.surname;
          state.listCustomer[index].tel = data.tel;
          state.listCustomer[index].address = data.address;
        }
      }
    },
    DELETE_CUSTOMER_BY_NO(state, cusNo) {
      state.listCustomer = state.listCustomer.filter((x) => x.no != cusNo);
    },

    SET_GOING_TO_BILL(state, data) {
      state.goingToBill = data;
    },
    SET_SELECTING_CUSTOMER(state, data) {
      state.selectingCus = data;
    },
  },
  actions: {},
  getters: {},
};
