<template>
  <div>
    <CustomerAdd ref="addCusRef" @onSelectCustomer="onSelectCustomer" />
    <!-- <div
      class="d-flex"
      style="background-color: #daa520; height: 57px; margin-bottom: 15px"
    >
      <div
        style="display: flex; align-items: center; cursor: pointer"
        @click="goBack"
      >
        <v-icon large color="white darken-2"> mdi-chevron-left </v-icon>
        <p
          style="font-weight: 600; text-align: center; color: white"
          class="ma-0"
        >
          ຍ້ອນກັບ
        </p>
      </div>
      <v-spacer></v-spacer>
    </div> -->
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="d-flex">
          <h2>ລາຍຊື່ລູກຄ້າ</h2>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="12" sm="4" class="d-flex align-center justify-start">
              <v-text-field
                outlined
                dense
                hide-details="auto"
                class="rounded-lg"
                v-model="search"
                label="ຄົ້ນຫາ"
              >
                <template #append>
                  <v-btn
                    small
                    icon
                    style="background-color: #daa520"
                    color="white"
                  >
                    <v-icon small>mdi-magnify</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="8" class="d-flex align-center justify-end">
              <v-btn color="success" @click="openAdd()">ເພີ່ມລູກຄ້າ</v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="listCustomer || []"
            class="elevation-1 rounded-lg"
            :items-per-page="15"
            fixed-header
            height="550"
            loading-text="ກຳລັງໂຫລດຂໍ້ມູນ..."
            no-data-text="ບໍ່ມີຂໍ້ມູນ"
            :search="search"
          >
            <template #item.name="{ index, item }">
              <div>{{ item.name }} {{ item.surname }}</div>
            </template>
            <template #item.action="{ index, item }">
              <v-container align="center">
                <v-icon @click="onSelectCustomer(item)" color="success">
                  mdi-check-bold
                </v-icon>
              </v-container>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  layout: "empty",
  data() {
    return {
      search: "",
      loading: false,
      page: 1,
      limit: 15,
      dropdownPage: [],
      headers: [
        {
          text: "ລຳດັບ",
          value: "no",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-2",
          sortable: false,
          align: "center",
        },
        {
          text: "ຊື່ ແລະ ນາມສະກຸນ",
          value: "name",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-2",
          sortable: false,
          align: "center",
        },
        {
          text: "ເບີໂທ",
          value: "tel",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          align: "center",
          sortable: false,
        },
        {
          text: "ທີ່ຢູ່",
          value: "address",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          sortable: false,
          align: "center",
        },
        {
          text: "ເລືອກລູກຄ້າ",
          value: "action",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          sortable: false,
          align: "center",
        },
      ],
    };
  },
  mounted() {},
  computed: {
    ...mapState("customer", ["listCustomer", "goingToBill"]),
  },
  methods: {
    ...mapActions("products", ["getProductData"]),
    goBack() {
      this.$router.go(-1);
    },
    openAdd() {
      this.$refs.addCusRef.dialog = true;
    },

    onSelectCustomer(data) {
      this.$store.commit("customer/SET_SELECTING_CUSTOMER", data);
      if (this.goingToBill == "buy") {
        // route to bill buy
        this.$router.push("/buy/bill");
      } else if (this.goingToBill == "sell") {
        // route to bill sell
        this.$router.push("/sell/bill");
      } else {
        // route to bill turn
        this.handlePressNext();
      }
    },
  },
  props: {
    handlePressNext: { type: Function },
  },
};
</script>
