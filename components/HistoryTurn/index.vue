<template>
  <div class="pa-4 mt-4">
    <v-row>
      <v-col cols="12" sm="4" md="2" lg="2">
        <h3>ປະຫວັດການຂາຍ</h3>
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
        :items="sellList"
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
        <template #[`item.billNo`]="{ item }">
          <span>
            {{ item.billNo }}
          </span>
        </template>
        <template #[`item.name`]="{ item }">
          <span> {{ item.cus.name }} {{ item.cus.surname }} </span>
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
    <HistorySellView :key="1" ref="myCompHisView" />
    <Bill :key="2" ref="myCompInfo" :statusTran="status" />
  </div>
</template>
<script>
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
      status: "ປະຫວັດຂາຍ",
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
  mounted() {
    // console.log(this.historyItems);
    this.GetData();
  },
  watch: {},

  computed: {
    ...mapState("historyStore", [
      "sellList",
      "countPage",
      "tableNull",
      "totalList",
    ]),
  },
  methods: {
    ...mapMutations("historyStore", ["SET_INFO_BUY"]),
    ...mapActions("historyStore", ["GetHisSell"]),
    async GetData() {
      try {
        await this.GetHisSell({
          page: this.page,
          limit: this.limit,
          search: String(this.search),
        });
      } catch (error) {}
    },
    OpenInfos(item) {
      // console.log("perview der", item);
      this.SET_INFO_BUY(item);
      this.$refs["myCompInfo"].dialog = true;
      // this.$router.push("/bill");
    },
    // viewDetail(item) {
    //   console.log(item);
    //   this.$refs["myCompHisView"].dialog = true;
    //   this.$refs["myCompHisView"].items = item;
    // },
  },
};
</script>
<style scoped></style>
