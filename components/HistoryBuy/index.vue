<template>
  <div class="pa-4 mt-4">
    <v-row>
      <v-col cols="12" sm="4" md="2" lg="2">
        <h3>ປະຫວັດການຊື້ເຂົ້າ</h3>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="4" md="4" lg="4">
        <v-text-field
          v-model="search"
          outlined
          dense
          hide-details="auto"
          class="rounded-lg"
          label="ຄົ້ນຫາ"
        >
          <template #append>
            <v-btn small icon class="goldColor" color="white">
              <v-icon small>mdi-magnify</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <br />
    <template>
      <v-data-table
        :headers="headers"
        :items="buyList"
        :search="search"
        class="elevation-1"
        fixed-header
        hide-default-footer
        disable-sort
        no-data-text="ບໍ່ມີຂໍ້ມູນ"
        loading-text="Loading..."
        width="400"
      >
        <template #[`item.no`]="{ index }">
          <span>{{ index + 1 }} </span>
        </template>
        <!-- <template #[`item.billNo`]="{ item }">
          <span>
            {{ item.billNo }}
          </span>
        </template>
        <template #[`item.name`]="{ item }">
          <span> {{ item.cus.name }} {{ item.cus.surname }} </span>
        </template> -->
        <template #[`item.view`]="{ item }">
          <div
            style="display: flex; align-items: center; justify-content: center"
          >
            <div>
              <v-icon @click="OpenInfos(item)">mdi-eye</v-icon>
            </div>
            <div></div>
          </div>
        </template>
      </v-data-table>
    </template>
    <HistoryBuyView :key="1" ref="myCompHisView" />
    <HistoryBuyInfo :key="1" ref="myCompInfo" />
  </div>
</template>
<script>
import SellPrintSell from "../../components/Sell/PrintSell.vue";
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "ລຳດັບ",
          align: "center",
          sortable: false,
          value: "no",
          width: "50px",
          class: " darken-2 text-subtitle-2 font-weight-black",
        },
        {
          text: "ເລກບີນ",
          align: "center",
          value: "bill_number",
          width: "120px",
          class: " darken-2 text-subtitle-2 font-weight-black",
        },
        {
          text: "ນ້ຳໜັກ",
          align: "center",
          value: "real_total_weight",
          width: "120px",
          class: " darken-2 text-subtitle-2 font-weight-black",
        },
        {
          text: "ລາຄາ",
          align: "center",
          value: "bill_number",
          width: "120px",
          class: " darken-2 text-subtitle-2 font-weight-black",
        },
        // {
        //   text: "ຊື່ ແລະ ນາມສະກຸນ",
        //   align: "center",
        //   value: "name",
        //   width: "180px",
        //   class: " darken-2 text-subtitle-2 font-weight-black",
        // },
        // {
        //   text: "ເບີໂທລະສັບ",
        //   align: "center",
        //   value: "cus.tel",
        //   width: "100px",
        //   class: " darken-2 text-subtitle-2 font-weight-black",
        // },
        // {
        //   text: "ທີ່ຢູ່",
        //   align: "center",
        //   value: "cus.address",
        //   width: "180px",
        //   class: " darken-2 text-subtitle-2 font-weight-black",
        // },
        // {
        //   text: "ວັນທີ",
        //   align: "center",
        //   value: "date",
        //   width: "120px",
        //   class: " darken-2 text-subtitle-2 font-weight-black",
        // },
        {
          text: "ລາຍລະອຽດ",
          align: "center",
          value: "view",
          width: "120px",
          class: " darken-2 text-subtitle-2 font-weight-black",
        },
        // {
        //   text: 'ປະເພດທອງຄຳ',
        //   align: 'center',
        //   value: 'name',
        //   width: '120px',
        //   class: ' darken-2 text-subtitle-2 font-weight-black',
        // },
        // { text: 'ຮູບປະພັນ', align: 'center', value: 'shape', width: '100px', class: ' darken-2 text-subtitle-2 font-weight-black', },
        // { text: 'ລາຍຮູບປະພັນ', align: 'center', value: 'shapeLine', width: '120px', class: ' darken-2 text-subtitle-2 font-weight-black', },
        // { text: 'ຄວາມບໍລິສຸດທອງ', align: 'center', value: 'purity', width: '150px', class: ' darken-2 text-subtitle-2 font-weight-black', },
        // { text: 'ຫັກຄ່າຫຼູ້ຍຫ້ຽນ', align: 'center', value: 'lost', width: '120px', class: ' darken-2 text-subtitle-2 font-weight-black', },
        // { text: 'ນ້ຳໜັກທອງຄຳ', align: 'center', value: 'weight', width: '120px', class: ' darken-2 text-subtitle-2 font-weight-black', },
        // { text: 'ປະເພດນ້ຳໜັກ', align: 'center', value: 'weightType', width: '120px', class: ' darken-2 text-subtitle-2 font-weight-black', },
        // { text: 'ລາຄາ', align: 'center', value: 'price', width: '120px', class: ' darken-2 text-subtitle-2 font-weight-black', },
        // { text: 'ຈໍາ​ນວນ', align: 'center', value: 'amount', width: '80px', class: ' darken-2 text-subtitle-2 font-weight-black', },
      ],
    };
  },
  async mounted() {
    await this.GetHisBuy();
  },
  watch: {},

  computed: {
    ...mapState("historyStore", ["buyList"]),
  },
  methods: {
    ...mapMutations("historyItems", ["SET_INFO_BUY"]),
    ...mapActions("historyStore", ["GetHisBuy"]),
    OpenInfos(item) {
      console.log('perview der', item)
      this.SET_INFO_BUY(item)
      this.$refs['myCompInfo'].dialog = true
    },
    // viewDetail(item) {
    //   try {
    //     this.SET_NEW_ITEMS(item?.listItems);
    //     let totalPrice = 0;
    //     let totalLost = 0;
    //     let totalPayment = 0;
    //     item?.listItems?.forEach((item) => {
    //       totalPrice += parseInt(
    //         Number(item.price) * Number(item.amount),
    //         10
    //       );
    //       totalLost += parseInt(Number(item.lost));
    //     });
    //     totalPayment = totalPrice - totalLost;
    //     this.$refs["myCompHisView"].dialog = true;
    //     this.$refs["myCompHisView"].items = item;
    //     this.$refs["myCompHisView"].myCus = item?.cus;
    //     this.$refs["myCompHisView"].billNo = item?.billNo;
    //     this.$refs["myCompHisView"].currentDateTime = item?.date;
    //     this.$refs["myCompHisView"].currentDate = item?.date?.substring(0, 10);
    //     this.$refs["myCompHisView"].totalPrice = totalPrice;
    //     this.$refs["myCompHisView"].totalLost = totalLost;
    //     this.$refs["myCompHisView"].totalPayment = totalPayment;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
};
</script>
<style scoped></style>
