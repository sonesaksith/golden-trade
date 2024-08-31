export default {
  state: () => ({
    listGold: [
      {
        id: "pk1",
        typGold: "ທອງຮູບປະພັນ",
        optionGole: "ສາຍຄໍ",
        typeLine: "ລາຍງູ",
        wight: 2,
        typwight: "ຫູນ",
        sellGold: 1500000,
      },
      {
        id: "pk2",
        typGold: "ທອງຮູບປະພັນ",
        optionGole: "ສາຍແຂນ",
        typeLine: "ລາຍງູ",
        wight: 3,
        typwight: "ຫູນ",
        sellGold: 2500000,
      },
      {
        id: "pk3",
        typGold: "ທອງຄຳແທ່ງ",
        optionGole: "",
        typeLine: "",
        wight: 2,
        typwight: "ບາດ",
        sellGold: 30000000,
      },
      {
        id: "pk4",
        typGold: "ທອງຮູບປະພັນ",
        optionGole: "ສາຍແຂນ",
        typeLine: "ລາຍງູ",
        wight: 3,
        typwight: "ຫູນ",
        sellGold: 2500000,
      },
      {
        id: "pk5",
        typGold: "ທອງຄຳແທ່ງ",
        optionGole: "",
        typeLine: "",
        wight: 2,
        typwight: "ບາດ",
        sellGold: 30000000,
      },
      {
        id: "pk6",
        typGold: "ທອງຮູບປະພັນ",
        optionGole: "ສາຍແຂນ",
        typeLine: "ລາຍງູ",
        wight: 3,
        typwight: "ຫູນ",
        sellGold: 2500000,
      },
      {
        id: "pk7",
        typGold: "ທອງຄຳແທ່ງ",
        optionGole: "",
        typeLine: "",
        wight: 2,
        typwight: "ບາດ",
        sellGold: 30000000,
      },
      {
        id: "pk8",
        typGold: "ທອງຮູບປະພັນ",
        optionGole: "ສາຍແຂນ",
        typeLine: "ລາຍງູ",
        wight: 3,
        typwight: "ຫູນ",
        sellGold: 2500000,
      },
      {
        id: "pk9",
        typGold: "ທອງຄຳແທ່ງ",
        optionGole: "",
        typeLine: "",
        wight: 2,
        typwight: "ບາດ",
        sellGold: 30000000,
      },
      {
        id: "pk10",
        typGold: "ທອງຮູບປະພັນ",
        optionGole: "ສາຍແຂນ",
        typeLine: "ລາຍງູ",
        wight: 3,
        typwight: "ຫູນ",
        sellGold: 2500000,
      },
      {
        id: "pk11",
        typGold: "ທອງຄຳແທ່ງ",
        optionGole: "",
        typeLine: "",
        wight: 2,
        typwight: "ບາດ",
        sellGold: 30000000,
      },
      {
        id: "pk12",
        typGold: "ທອງຮູບປະພັນ",
        optionGole: "ສາຍແຂນ",
        typeLine: "ລາຍງູ",
        wight: 3,
        typwight: "ຫູນ",
        sellGold: 2500000,
      },
      {
        id: "pk13",
        typGold: "ທອງຄຳແທ່ງ",
        optionGole: "",
        typeLine: "",
        wight: 2,
        typwight: "ບາດ",
        sellGold: 30000000,
      },
      {
        id: "pk14",
        typGold: "ທອງຮູບປະພັນ",
        optionGole: "ສາຍແຂນ",
        typeLine: "ລາຍງູ",
        wight: 3,
        typwight: "ຫູນ",
        sellGold: 2500000,
      },
      {
        id: "pk15",
        typGold: "ທອງຄຳແທ່ງ",
        optionGole: "",
        typeLine: "",
        wight: 2,
        typwight: "ບາດ",
        sellGold: 30000000,
      },
      {
        id: "pk16",
        typGold: "ທອງຮູບປະພັນ",
        optionGole: "ສາຍແຂນ",
        typeLine: "ລາຍງູ",
        wight: 3,
        typwight: "ຫູນ",
        sellGold: 2500000,
      },
      {
        id: "pk17",
        typGold: "ທອງຄຳແທ່ງ",
        optionGole: "",
        typeLine: "",
        wight: 2,
        typwight: "ບາດ",
        sellGold: 30000000,
      },
      {
        id: "pk18",
        typGold: "ທອງຮູບປະພັນ",
        optionGole: "ສາຍແຊນ",
        typeLine: "ລາຍງູ",
        wight: 3,
        typwight: "ຫູນ",
        sellGold: 2500000,
      },
      {
        id: "pk19",
        typGold: "ທອງຄຳແທ່ງ",
        optionGole: "",
        typeLine: "",
        wight: 2,
        typwight: "ບາດ",
        sellGold: 30000000,
      },
      {
        id: "pk20",
        typGold: "ທອງຄຳແທ່ງ",
        optionGole: "",
        typeLine: "",
        wight: 2,
        typwight: "ບາດ",
        sellGold: 30000000,
      },
    ],
  }),
  mutations: {
    ADD_GOLD(state, data) {
      state.listGold.push(data);
    },
    UPDATE_GOLD_BY_INDEX(state, data) {
      for (let index = 0; index < state.listGold.length; index++) {
        if (index == data.myindex) {
          state.listGold[index].id = data.id;
          state.listGold[index].typGold = data.typGold;
          state.listGold[index].optionGole = data.optionGole;
          state.listGold[index].typeLine = data.typeLine;
          state.listGold[index].wight = data.wight;
          state.listGold[index].typwight = data.typwight;
          state.listGold[index].sellGold = data.sellGold;
        }
      }
    },
    DELETE_GOLD_BY_INDEX(state, index) {
      state.listGold = state.listGold.filter((x, i) => i != index);
    },
  },
  actions: {},
  getters: {},
};
