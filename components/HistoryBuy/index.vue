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
          @keydown.enter.prevent="GetData()"
        >
          <template #append>
            <v-btn
              small
              icon
              class="goldColor"
              color="white"
              @click="GetData()"
            >
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
        class="elevation-1"
        fixed-header
        hide-default-footer
        disable-sort
        no-data-text="ບໍ່ມີຂໍ້ມູນ"
        loading-text="Loading..."
        height="68vh"
        width="400"
      >
        <template v-slot:header="props" v-if="tableNull">
          <tr style="background-color: rgba(0, 0, 0, 0.09)">
            <td
              colspan="9"
              style="padding: 10px; padding-left: 20px"
              align="left"
            >
              <h3 style="font-size: 18px; color: gray">
                ຈຳນວນທັງໝົດ:
                <b style="font-size: 18px; color: #c62828">
                  {{ $formatnumber(totalList) }} ລາຍການ
                </b>
              </h3>
            </td>
          </tr>
        </template>
        <template #footer>
          <div
            style="
              border-top: thin solid rgba(0, 0, 0, 0.12);
              display: flex;
              align-items: center;
              justify-content: flex-end;
            "
          >
            <div class="mx-2">
              <span>ຈຳນວນແຖວຕໍ່ໜ້າ</span>
            </div>
            <div class="mx-2">
              <v-select
                v-model="limit"
                style="width: 60px"
                :items="listLimit"
                :item-text="(item) => item.id"
                :item-value="(item) => item.value"
                @change="(page = 1), GetData()"
              ></v-select>
            </div>
            <div class="mx-2">
              <span v-if="countPage != 0">{{ page }}-{{ countPage }}</span>
              <span v-else>-/- </span>
            </div>
            <div class="mx-2">
              <v-icon @click="page > 1 ? (page -= 1) : void 0, GetData()"
                >mdi-chevron-left</v-icon
              >
            </div>
            <div class="mx-2">
              <v-icon
                @click="page < countPage ? (page += 1) : void 0, GetData()"
                >mdi-chevron-right</v-icon
              >
            </div>
          </div>
        </template>
        <template #[`item.no`]="{ index }">
          <span>{{ (page - 1) * limit + index + 1 }} </span>
        </template>
        <template #[`item.total_price`]="{ item }">
          <span> {{ $formatnumber(item.total_price) }} </span>
        </template>
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
    <!-- <HistoryBuyInfo :key="2" ref="myCompInfo" :statusTran="status" /> -->
    <Bill :key="2" ref="myCompInfo" :statusTran="status" />
  </div>
</template>
<script>
import Bill from "../../components/Bill/Index.vue";
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      page: 1,
      limit: 15,
      listLimit: [
        { id: 10, value: 10 },
        { id: 15, value: 15 },
        { id: "All", value: "" },
      ],
      status: "ປະຫວັດຊື້",
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
          value: "total_price",
          width: "120px",
          class: " darken-2 text-subtitle-2 font-weight-black",
        },
        {
          text: "ລາຍລະອຽດ",
          align: "center",
          value: "view",
          width: "120px",
          class: " darken-2 text-subtitle-2 font-weight-black",
        },
      ],
    };
  },
  async mounted() {
    this.GetData();
  },
  watch: {},

  computed: {
    ...mapState("historyStore", [
      "buyList",
      "countPage",
      "tableNull",
      "totalList",
    ]),
  },
  methods: {
    ...mapMutations("historyStore", ["SET_INFO_BUY"]),
    ...mapActions("historyStore", ["GetHisBuy"]),

    async GetData() {
      try {
        await this.GetHisBuy({
          page: this.page,
          limit: this.limit,
          search: String(this.search),
        });
      } catch (error) {}
    },
    updateDateTime() {
      try {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        this.currentDateTime = `${day}/${month}/${year},${hours}:${minutes}:${seconds}`;
        this.currentDate = `${day}/${month}/${year}`;
        let date = {
          currentDate: this.currentDate,
          currentDateTime: this.currentDateTime,
        };
        return date;
      } catch (error) {
        console.log(error);
      }
    },
    OpenInfos(item) {
      // console.log("perview der", item);
      this.SET_INFO_BUY(item);
      this.$refs["myCompInfo"].dialog = true;
      // this.$router.push("/bill");
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
