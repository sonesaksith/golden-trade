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
  actions: {
    async GetGolds({ state, commit }) {
      try {
        const resp = await this.$axios({
          method: "get",
          url: "/api/product/view",
          headers: {
            Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJbmZvIjp7InVzZXJfaWQiOjEsInVzZXJfbmFtZSI6InAiLCJ1c2VyX3N1cm5hbWUiOiJwIiwidXNlcl90ZWwiOiIyMDk3MTYwNDU0IiwidXNlcl9zdGF0dXNfaWQiOjEsImNyZWF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6MDY6MTMuMDAwWiIsInVwZGF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6NDM6MTMuMDAwWiIsInN0dCI6MSwidXNlcl9zdGF0dXNfbmFtZSI6IlN1cGVyIEFkbWluIn0sInBlcm1pc3Npb24iOnsicGVybWlzc2lvbl9pZCI6MSwidXNlcl9zdGF0dXNfaWQiOjEsInVzZXJfbWFuYWdlIjoxLCJidXlfc2VsbCI6MSwicHJvZHVjdCI6MSwiYnV5X2hpc3RvcnkiOjEsInNlbGxfaGlzdG9yeSI6MSwidHVybl9oaXN0b3J5IjoxLCJtYW5hZ2VfdW5pdCI6MSwibWFuYWdlX3Byb2R1Y3RfdHlwZSI6MSwibWFuYWdlX3JhdGUiOjEsIm1hbmFnZV9jYXRlZ29yeSI6MSwibWFuYWdlX2xhaSI6MSwiY3JlYXRlX2F0IjoiMjAyNC0wOS0wN1QxNTo0ODo1OS4wMDBaIiwidXBkYXRlX2F0IjpudWxsLCJzdHQiOjF9fSwiaWF0IjoxNzI2MTA4NjI5LCJleHAiOjE3MjYxNTE4Mjl9.cio2OwMpaNd81QPy8g4WlgJN4ztjZifwQeDE62z0GGQ"
          }
        });
        return resp;
      } catch (error) {
        throw error;
      }
    },
    async CreateGolds({ state, commit }, item) {
      try {
        const resp = await this.$axios({
          method: "post",
          url: "/api/product/create",
          data: item,
          headers: {
            Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJbmZvIjp7InVzZXJfaWQiOjEsInVzZXJfbmFtZSI6InAiLCJ1c2VyX3N1cm5hbWUiOiJwIiwidXNlcl90ZWwiOiIyMDk3MTYwNDU0IiwidXNlcl9zdGF0dXNfaWQiOjEsImNyZWF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6MDY6MTMuMDAwWiIsInVwZGF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6NDM6MTMuMDAwWiIsInN0dCI6MSwidXNlcl9zdGF0dXNfbmFtZSI6IlN1cGVyIEFkbWluIn0sInBlcm1pc3Npb24iOnsicGVybWlzc2lvbl9pZCI6MSwidXNlcl9zdGF0dXNfaWQiOjEsInVzZXJfbWFuYWdlIjoxLCJidXlfc2VsbCI6MSwicHJvZHVjdCI6MSwiYnV5X2hpc3RvcnkiOjEsInNlbGxfaGlzdG9yeSI6MSwidHVybl9oaXN0b3J5IjoxLCJtYW5hZ2VfdW5pdCI6MSwibWFuYWdlX3Byb2R1Y3RfdHlwZSI6MSwibWFuYWdlX3JhdGUiOjEsIm1hbmFnZV9jYXRlZ29yeSI6MSwibWFuYWdlX2xhaSI6MSwiY3JlYXRlX2F0IjoiMjAyNC0wOS0wN1QxNTo0ODo1OS4wMDBaIiwidXBkYXRlX2F0IjpudWxsLCJzdHQiOjF9fSwiaWF0IjoxNzI2MTA4NjI5LCJleHAiOjE3MjYxNTE4Mjl9.cio2OwMpaNd81QPy8g4WlgJN4ztjZifwQeDE62z0GGQ"
          }
        });
        return resp;
      } catch (error) {
        throw error;
      }
    },
    async DeleteGolds({ state, commit }, id) {
      try {
        console.log(id);
        const resp = await this.$axios({
          method: "delete",
          url: `/api/product/delete/${id}`,
          headers: {
            Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJbmZvIjp7InVzZXJfaWQiOjEsInVzZXJfbmFtZSI6InAiLCJ1c2VyX3N1cm5hbWUiOiJwIiwidXNlcl90ZWwiOiIyMDk3MTYwNDU0IiwidXNlcl9zdGF0dXNfaWQiOjEsImNyZWF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6MDY6MTMuMDAwWiIsInVwZGF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6NDM6MTMuMDAwWiIsInN0dCI6MSwidXNlcl9zdGF0dXNfbmFtZSI6IlN1cGVyIEFkbWluIn0sInBlcm1pc3Npb24iOnsicGVybWlzc2lvbl9pZCI6MSwidXNlcl9zdGF0dXNfaWQiOjEsInVzZXJfbWFuYWdlIjoxLCJidXlfc2VsbCI6MSwicHJvZHVjdCI6MSwiYnV5X2hpc3RvcnkiOjEsInNlbGxfaGlzdG9yeSI6MSwidHVybl9oaXN0b3J5IjoxLCJtYW5hZ2VfdW5pdCI6MSwibWFuYWdlX3Byb2R1Y3RfdHlwZSI6MSwibWFuYWdlX3JhdGUiOjEsIm1hbmFnZV9jYXRlZ29yeSI6MSwibWFuYWdlX2xhaSI6MSwiY3JlYXRlX2F0IjoiMjAyNC0wOS0wN1QxNTo0ODo1OS4wMDBaIiwidXBkYXRlX2F0IjpudWxsLCJzdHQiOjF9fSwiaWF0IjoxNzI2MTA4NjI5LCJleHAiOjE3MjYxNTE4Mjl9.cio2OwMpaNd81QPy8g4WlgJN4ztjZifwQeDE62z0GGQ"
          }
        });
        return resp;
      } catch (error) {
        throw error;
      }
    },
    async UpdateGolds({ state, commit }, item) {
      try {
        const resp = await this.$axios({
          method: "put",
          url: "/api/product/update",
          data: item,
          headers: {
            Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJbmZvIjp7InVzZXJfaWQiOjEsInVzZXJfbmFtZSI6InAiLCJ1c2VyX3N1cm5hbWUiOiJwIiwidXNlcl90ZWwiOiIyMDk3MTYwNDU0IiwidXNlcl9zdGF0dXNfaWQiOjEsImNyZWF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6MDY6MTMuMDAwWiIsInVwZGF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6NDM6MTMuMDAwWiIsInN0dCI6MSwidXNlcl9zdGF0dXNfbmFtZSI6IlN1cGVyIEFkbWluIn0sInBlcm1pc3Npb24iOnsicGVybWlzc2lvbl9pZCI6MSwidXNlcl9zdGF0dXNfaWQiOjEsInVzZXJfbWFuYWdlIjoxLCJidXlfc2VsbCI6MSwicHJvZHVjdCI6MSwiYnV5X2hpc3RvcnkiOjEsInNlbGxfaGlzdG9yeSI6MSwidHVybl9oaXN0b3J5IjoxLCJtYW5hZ2VfdW5pdCI6MSwibWFuYWdlX3Byb2R1Y3RfdHlwZSI6MSwibWFuYWdlX3JhdGUiOjEsIm1hbmFnZV9jYXRlZ29yeSI6MSwibWFuYWdlX2xhaSI6MSwiY3JlYXRlX2F0IjoiMjAyNC0wOS0wN1QxNTo0ODo1OS4wMDBaIiwidXBkYXRlX2F0IjpudWxsLCJzdHQiOjF9fSwiaWF0IjoxNzI2MTA4NjI5LCJleHAiOjE3MjYxNTE4Mjl9.cio2OwMpaNd81QPy8g4WlgJN4ztjZifwQeDE62z0GGQ"
          }
        });
        return resp;
      } catch (error) {
        throw error;
      }
    },
    async GetLines({ state, commit }) {
      try {
        const resp = await this.$axios({
          method: "get",
          url: "/api/lai/view",
          headers: {
            Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJbmZvIjp7InVzZXJfaWQiOjEsInVzZXJfbmFtZSI6InAiLCJ1c2VyX3N1cm5hbWUiOiJwIiwidXNlcl90ZWwiOiIyMDk3MTYwNDU0IiwidXNlcl9zdGF0dXNfaWQiOjEsImNyZWF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6MDY6MTMuMDAwWiIsInVwZGF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6NDM6MTMuMDAwWiIsInN0dCI6MSwidXNlcl9zdGF0dXNfbmFtZSI6IlN1cGVyIEFkbWluIn0sInBlcm1pc3Npb24iOnsicGVybWlzc2lvbl9pZCI6MSwidXNlcl9zdGF0dXNfaWQiOjEsInVzZXJfbWFuYWdlIjoxLCJidXlfc2VsbCI6MSwicHJvZHVjdCI6MSwiYnV5X2hpc3RvcnkiOjEsInNlbGxfaGlzdG9yeSI6MSwidHVybl9oaXN0b3J5IjoxLCJtYW5hZ2VfdW5pdCI6MSwibWFuYWdlX3Byb2R1Y3RfdHlwZSI6MSwibWFuYWdlX3JhdGUiOjEsIm1hbmFnZV9jYXRlZ29yeSI6MSwibWFuYWdlX2xhaSI6MSwiY3JlYXRlX2F0IjoiMjAyNC0wOS0wN1QxNTo0ODo1OS4wMDBaIiwidXBkYXRlX2F0IjpudWxsLCJzdHQiOjF9fSwiaWF0IjoxNzI2MTA4NjI5LCJleHAiOjE3MjYxNTE4Mjl9.cio2OwMpaNd81QPy8g4WlgJN4ztjZifwQeDE62z0GGQ"
          }
        });
        return resp;
      } catch (error) {
        throw error;
      }
    },
    async CreateLines({ state, commit }, item) {
      try {
        const resp = await this.$axios({
          method: "post",
          url: "/api/lai/create",
          data: item,
          headers: {
            Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJbmZvIjp7InVzZXJfaWQiOjEsInVzZXJfbmFtZSI6InAiLCJ1c2VyX3N1cm5hbWUiOiJwIiwidXNlcl90ZWwiOiIyMDk3MTYwNDU0IiwidXNlcl9zdGF0dXNfaWQiOjEsImNyZWF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6MDY6MTMuMDAwWiIsInVwZGF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6NDM6MTMuMDAwWiIsInN0dCI6MSwidXNlcl9zdGF0dXNfbmFtZSI6IlN1cGVyIEFkbWluIn0sInBlcm1pc3Npb24iOnsicGVybWlzc2lvbl9pZCI6MSwidXNlcl9zdGF0dXNfaWQiOjEsInVzZXJfbWFuYWdlIjoxLCJidXlfc2VsbCI6MSwicHJvZHVjdCI6MSwiYnV5X2hpc3RvcnkiOjEsInNlbGxfaGlzdG9yeSI6MSwidHVybl9oaXN0b3J5IjoxLCJtYW5hZ2VfdW5pdCI6MSwibWFuYWdlX3Byb2R1Y3RfdHlwZSI6MSwibWFuYWdlX3JhdGUiOjEsIm1hbmFnZV9jYXRlZ29yeSI6MSwibWFuYWdlX2xhaSI6MSwiY3JlYXRlX2F0IjoiMjAyNC0wOS0wN1QxNTo0ODo1OS4wMDBaIiwidXBkYXRlX2F0IjpudWxsLCJzdHQiOjF9fSwiaWF0IjoxNzI2MTA4NjI5LCJleHAiOjE3MjYxNTE4Mjl9.cio2OwMpaNd81QPy8g4WlgJN4ztjZifwQeDE62z0GGQ"
          }
        });
        return resp;
      } catch (error) {
        throw error;
      }
    },
    async DeleteLine({ state, commit }, id) {
      try {
        const resp = await this.$axios({
          method: "delete",
          url: `/api/lai/delete/${id}`,
          headers: {
            Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJbmZvIjp7InVzZXJfaWQiOjEsInVzZXJfbmFtZSI6InAiLCJ1c2VyX3N1cm5hbWUiOiJwIiwidXNlcl90ZWwiOiIyMDk3MTYwNDU0IiwidXNlcl9zdGF0dXNfaWQiOjEsImNyZWF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6MDY6MTMuMDAwWiIsInVwZGF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6NDM6MTMuMDAwWiIsInN0dCI6MSwidXNlcl9zdGF0dXNfbmFtZSI6IlN1cGVyIEFkbWluIn0sInBlcm1pc3Npb24iOnsicGVybWlzc2lvbl9pZCI6MSwidXNlcl9zdGF0dXNfaWQiOjEsInVzZXJfbWFuYWdlIjoxLCJidXlfc2VsbCI6MSwicHJvZHVjdCI6MSwiYnV5X2hpc3RvcnkiOjEsInNlbGxfaGlzdG9yeSI6MSwidHVybl9oaXN0b3J5IjoxLCJtYW5hZ2VfdW5pdCI6MSwibWFuYWdlX3Byb2R1Y3RfdHlwZSI6MSwibWFuYWdlX3JhdGUiOjEsIm1hbmFnZV9jYXRlZ29yeSI6MSwibWFuYWdlX2xhaSI6MSwiY3JlYXRlX2F0IjoiMjAyNC0wOS0wN1QxNTo0ODo1OS4wMDBaIiwidXBkYXRlX2F0IjpudWxsLCJzdHQiOjF9fSwiaWF0IjoxNzI2MTA4NjI5LCJleHAiOjE3MjYxNTE4Mjl9.cio2OwMpaNd81QPy8g4WlgJN4ztjZifwQeDE62z0GGQ"
          }
        });
        return resp;
      } catch (error) {
        throw error;
      }
    },
    async UpdateLine({ state, commit }, item) {
      try {
        const resp = await this.$axios({
          method: "put",
          url: "/api/lai/update",
          data: item,
          headers: {
            Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJbmZvIjp7InVzZXJfaWQiOjEsInVzZXJfbmFtZSI6InAiLCJ1c2VyX3N1cm5hbWUiOiJwIiwidXNlcl90ZWwiOiIyMDk3MTYwNDU0IiwidXNlcl9zdGF0dXNfaWQiOjEsImNyZWF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6MDY6MTMuMDAwWiIsInVwZGF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6NDM6MTMuMDAwWiIsInN0dCI6MSwidXNlcl9zdGF0dXNfbmFtZSI6IlN1cGVyIEFkbWluIn0sInBlcm1pc3Npb24iOnsicGVybWlzc2lvbl9pZCI6MSwidXNlcl9zdGF0dXNfaWQiOjEsInVzZXJfbWFuYWdlIjoxLCJidXlfc2VsbCI6MSwicHJvZHVjdCI6MSwiYnV5X2hpc3RvcnkiOjEsInNlbGxfaGlzdG9yeSI6MSwidHVybl9oaXN0b3J5IjoxLCJtYW5hZ2VfdW5pdCI6MSwibWFuYWdlX3Byb2R1Y3RfdHlwZSI6MSwibWFuYWdlX3JhdGUiOjEsIm1hbmFnZV9jYXRlZ29yeSI6MSwibWFuYWdlX2xhaSI6MSwiY3JlYXRlX2F0IjoiMjAyNC0wOS0wN1QxNTo0ODo1OS4wMDBaIiwidXBkYXRlX2F0IjpudWxsLCJzdHQiOjF9fSwiaWF0IjoxNzI2MTA4NjI5LCJleHAiOjE3MjYxNTE4Mjl9.cio2OwMpaNd81QPy8g4WlgJN4ztjZifwQeDE62z0GGQ"
          }
        });
        return resp;
      } catch (error) {
        throw error;
      }
    },

    async GetCategory({ state, commit }) {
      try {
        const resp = await this.$axios({
          method: "get",
          url: "/api/category/view",
          headers: {
            Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJbmZvIjp7InVzZXJfaWQiOjEsInVzZXJfbmFtZSI6InAiLCJ1c2VyX3N1cm5hbWUiOiJwIiwidXNlcl90ZWwiOiIyMDk3MTYwNDU0IiwidXNlcl9zdGF0dXNfaWQiOjEsImNyZWF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6MDY6MTMuMDAwWiIsInVwZGF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6NDM6MTMuMDAwWiIsInN0dCI6MSwidXNlcl9zdGF0dXNfbmFtZSI6IlN1cGVyIEFkbWluIn0sInBlcm1pc3Npb24iOnsicGVybWlzc2lvbl9pZCI6MSwidXNlcl9zdGF0dXNfaWQiOjEsInVzZXJfbWFuYWdlIjoxLCJidXlfc2VsbCI6MSwicHJvZHVjdCI6MSwiYnV5X2hpc3RvcnkiOjEsInNlbGxfaGlzdG9yeSI6MSwidHVybl9oaXN0b3J5IjoxLCJtYW5hZ2VfdW5pdCI6MSwibWFuYWdlX3Byb2R1Y3RfdHlwZSI6MSwibWFuYWdlX3JhdGUiOjEsIm1hbmFnZV9jYXRlZ29yeSI6MSwibWFuYWdlX2xhaSI6MSwiY3JlYXRlX2F0IjoiMjAyNC0wOS0wN1QxNTo0ODo1OS4wMDBaIiwidXBkYXRlX2F0IjpudWxsLCJzdHQiOjF9fSwiaWF0IjoxNzI2MTA4NjI5LCJleHAiOjE3MjYxNTE4Mjl9.cio2OwMpaNd81QPy8g4WlgJN4ztjZifwQeDE62z0GGQ"
          }
        });
        return resp;
      } catch (error) {
        throw error;
      }
    },
    async CreateCategory({ state, commit }, item) {
      try {
        const resp = await this.$axios({
          method: "post",
          url: "/api/category/create",
          data: item,
          headers: {
            Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJbmZvIjp7InVzZXJfaWQiOjEsInVzZXJfbmFtZSI6InAiLCJ1c2VyX3N1cm5hbWUiOiJwIiwidXNlcl90ZWwiOiIyMDk3MTYwNDU0IiwidXNlcl9zdGF0dXNfaWQiOjEsImNyZWF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6MDY6MTMuMDAwWiIsInVwZGF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6NDM6MTMuMDAwWiIsInN0dCI6MSwidXNlcl9zdGF0dXNfbmFtZSI6IlN1cGVyIEFkbWluIn0sInBlcm1pc3Npb24iOnsicGVybWlzc2lvbl9pZCI6MSwidXNlcl9zdGF0dXNfaWQiOjEsInVzZXJfbWFuYWdlIjoxLCJidXlfc2VsbCI6MSwicHJvZHVjdCI6MSwiYnV5X2hpc3RvcnkiOjEsInNlbGxfaGlzdG9yeSI6MSwidHVybl9oaXN0b3J5IjoxLCJtYW5hZ2VfdW5pdCI6MSwibWFuYWdlX3Byb2R1Y3RfdHlwZSI6MSwibWFuYWdlX3JhdGUiOjEsIm1hbmFnZV9jYXRlZ29yeSI6MSwibWFuYWdlX2xhaSI6MSwiY3JlYXRlX2F0IjoiMjAyNC0wOS0wN1QxNTo0ODo1OS4wMDBaIiwidXBkYXRlX2F0IjpudWxsLCJzdHQiOjF9fSwiaWF0IjoxNzI2MTA4NjI5LCJleHAiOjE3MjYxNTE4Mjl9.cio2OwMpaNd81QPy8g4WlgJN4ztjZifwQeDE62z0GGQ"
          }
        });
        return resp;
      } catch (error) {
        throw error;
      }
    },
    async DeleteCategory({ state, commit }, id) {
      try {
        const resp = await this.$axios({
          method: "delete",
          url: `/api/category/delete/${id}`,
          headers: {
            Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJbmZvIjp7InVzZXJfaWQiOjEsInVzZXJfbmFtZSI6InAiLCJ1c2VyX3N1cm5hbWUiOiJwIiwidXNlcl90ZWwiOiIyMDk3MTYwNDU0IiwidXNlcl9zdGF0dXNfaWQiOjEsImNyZWF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6MDY6MTMuMDAwWiIsInVwZGF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6NDM6MTMuMDAwWiIsInN0dCI6MSwidXNlcl9zdGF0dXNfbmFtZSI6IlN1cGVyIEFkbWluIn0sInBlcm1pc3Npb24iOnsicGVybWlzc2lvbl9pZCI6MSwidXNlcl9zdGF0dXNfaWQiOjEsInVzZXJfbWFuYWdlIjoxLCJidXlfc2VsbCI6MSwicHJvZHVjdCI6MSwiYnV5X2hpc3RvcnkiOjEsInNlbGxfaGlzdG9yeSI6MSwidHVybl9oaXN0b3J5IjoxLCJtYW5hZ2VfdW5pdCI6MSwibWFuYWdlX3Byb2R1Y3RfdHlwZSI6MSwibWFuYWdlX3JhdGUiOjEsIm1hbmFnZV9jYXRlZ29yeSI6MSwibWFuYWdlX2xhaSI6MSwiY3JlYXRlX2F0IjoiMjAyNC0wOS0wN1QxNTo0ODo1OS4wMDBaIiwidXBkYXRlX2F0IjpudWxsLCJzdHQiOjF9fSwiaWF0IjoxNzI2MTA4NjI5LCJleHAiOjE3MjYxNTE4Mjl9.cio2OwMpaNd81QPy8g4WlgJN4ztjZifwQeDE62z0GGQ"
          }
        });
        return resp;
      } catch (error) {
        throw error;
      }
    },
    async UpdateCategory({ state, commit }, item) {
      try {
        const resp = await this.$axios({
          method: "put",
          url: "/api/category/update",
          data: item,
          headers: {
            Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJbmZvIjp7InVzZXJfaWQiOjEsInVzZXJfbmFtZSI6InAiLCJ1c2VyX3N1cm5hbWUiOiJwIiwidXNlcl90ZWwiOiIyMDk3MTYwNDU0IiwidXNlcl9zdGF0dXNfaWQiOjEsImNyZWF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6MDY6MTMuMDAwWiIsInVwZGF0ZV9hdCI6IjIwMjQtMDktMDdUMTY6NDM6MTMuMDAwWiIsInN0dCI6MSwidXNlcl9zdGF0dXNfbmFtZSI6IlN1cGVyIEFkbWluIn0sInBlcm1pc3Npb24iOnsicGVybWlzc2lvbl9pZCI6MSwidXNlcl9zdGF0dXNfaWQiOjEsInVzZXJfbWFuYWdlIjoxLCJidXlfc2VsbCI6MSwicHJvZHVjdCI6MSwiYnV5X2hpc3RvcnkiOjEsInNlbGxfaGlzdG9yeSI6MSwidHVybl9oaXN0b3J5IjoxLCJtYW5hZ2VfdW5pdCI6MSwibWFuYWdlX3Byb2R1Y3RfdHlwZSI6MSwibWFuYWdlX3JhdGUiOjEsIm1hbmFnZV9jYXRlZ29yeSI6MSwibWFuYWdlX2xhaSI6MSwiY3JlYXRlX2F0IjoiMjAyNC0wOS0wN1QxNTo0ODo1OS4wMDBaIiwidXBkYXRlX2F0IjpudWxsLCJzdHQiOjF9fSwiaWF0IjoxNzI2MTA4NjI5LCJleHAiOjE3MjYxNTE4Mjl9.cio2OwMpaNd81QPy8g4WlgJN4ztjZifwQeDE62z0GGQ"
          }
        });
        return resp;
      } catch (error) {
        throw error;
      }
    },
  },
  getters: {},
};
