<template>
  <div class="pa-4 mt-4">
    <v-row>
      <v-col cols="12" sm="4" md="2" lg="2">
        <h3>ປະຫວັດການເທີນ</h3>
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
        :items="trunList"
        class="elevation-1"
        fixed-header
        hide-default-footer
        disable-sort
        no-data-text="ບໍ່ມີຂໍ້ມູນ"
        loading-text="Loading..."
        height="68vh"
        width="400"
        :loading="loadTrun"
      >
        <template v-slot:header="props" v-if="tableNull">
          <tr style="background-color: rgba(0, 0, 0, 0.09)">
            <td
              colspan="14"
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
        <template #[`item.sell_real_total_weight`]="{ item }">
          <span>
            {{ $formatnumber(item.sell_real_total_weight) }}
          </span>
        </template>
        <template #[`item.sell_total_price`]="{ item }">
          <span>
            {{ $formatnumber(item.sell_total_price) }}
          </span>
        </template>
        <template #[`item.final_price`]="{ item }">
          <span>
            {{ $formatnumber(item.final_price) }}
          </span>
        </template>
        <template #[`item.buy_total_price`]="{ item }">
          <span>
            {{ $formatnumber(item.buy_total_price) }}
          </span>
        </template>
        <template #[`item.diff`]="{ item }">
          <span>
            {{ $formatnumber(item.diff) }}
          </span>
        </template>
        <template #[`item.sell_final_price`]="{ item }">
          <span>
            {{ $formatnumber(item.sell_final_price) }}
          </span>
        </template>
        <template #[`item.stt`]="{ item }">
          <span v-if="item.stt == 1" style="color: green">ສຳເລັດ </span>
          <span v-else style="color: red">ຍົກເລີກ </span>
        </template>
        <template #[`item.customer`]="{ item }">
          <span>
            {{ item.customer_info.customer_name }}
            {{ item.customer_info.customer_address }}
          </span>
        </template>
        <template #[`item.tel`]="{ item }">
          <span> {{ item.customer_info.customer_tel }} </span>
        </template>
        <template #[`item.seller`]="{ item }">
          <span>
            {{ item.seller_info.user_name }} {{ item.seller_info.user_surname }}
          </span>
        </template>
        <template #[`item.view`]="{ item }">
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              justify-content: space-evenly;
            "
          >
            <div
              :style="{
                textAlign: item.stt != 1 ? 'left' : 'left',
              }"
            >
              <v-icon @click="OpenInfos(item)" color="blue">mdi-eye</v-icon>
            </div>
            <div>
              <v-icon
                @click="OnDelete(item.transaction_id)"
                color="red"
                v-if="item.stt == 1"
                >mdi-delete-empty-outline</v-icon
              >
            </div>
            <div></div>
          </div>
        </template>
      </v-data-table>
    </template>
    <Bill :key="1" ref="myCompInfo" :statusTran="status" />
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
      status: "ປະຫວັດເທີນ", 
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
          text: "ນ້ຳໜັກຊື້",
          align: "center",
          value: "buy_real_total_weight",
          width: "120px",
          class: " darken-2 text-subtitle-2 font-weight-black",
        },
        {
          text: "ນ້ຳໜັກຂາຍ",
          align: "center",
          value: "sell_real_total_weight",
          width: "120px",
          class: " darken-2 text-subtitle-2 font-weight-black",
        },
        {
          text: "ລາຄາຊື້",
          align: "center",
          value: "buy_total_price",
          width: "120px",
          class: " darken-2 text-subtitle-2 font-weight-black",
        },
        {
          text: "ລາຄາຂາຍ",
          align: "center",
          value: "sell_total_price",
          width: "120px",
          class: " darken-2 text-subtitle-2 font-weight-black",
        },
        {
          text: "ສ່ວນຕ່າງ",
          align: "center",
          value: "diff",
          width: "120px",
          class: " darken-2 text-subtitle-2 font-weight-black",
        },
        {
          text: "ສະຫຼຸບລາຄາ",
          align: "center",
          value: "sell_final_price",
          width: "120px",
          class: " darken-2 text-subtitle-2 font-weight-black",
        },
        {
          text: "ເບີໂທລູກຄ້າ",
          align: "center",
          value: "tel",
          width: "120px",
          class: " darken-2 text-subtitle-2 font-weight-black",
        },
        {
          text: "ລູກຄ້າ",
          align: "center",
          value: "customer",
          width: "120px",
          class: " darken-2 text-subtitle-2 font-weight-black",
        },
        {
          text: "ພະນັກງານ",
          align: "center",
          value: "seller",
          width: "120px",
          class: " darken-2 text-subtitle-2 font-weight-black",
        },
        {
          text: "ສະຖານະ",
          align: "center",
          value: "stt",
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
      "trunList",
      "countPage",
      "tableNull",
      "totalList",
      "loadTrun",
    ]),
  },
  methods: {
    ...mapMutations("historyStore", ["SET_INFO_BUY"]),
    ...mapActions("historyStore", ["GetHisTrun", "Delete"]),
    async OnDelete(item) {
      this.$swal({
        text: "ເຈົ້າຕ້ອງການຍົກເລີກແທ້ບໍ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "ຍົກເລີກ",
        confirmButtonText: "ຕົກລົງ",
        allowOutsideClick: false,
      }).then(async (result) => {
        if (result.value) {
          let res;
          try {
            res = await this.Delete(item);
          } catch (error) {
            if (error?.response?.data) {
              res = error?.response?.data;
            } else {
              res = error;
            }
          } finally {
            if (res.data.msg == "success") {
              this.search = "";
              this.page = 1;
              await this.GetData();
              this.$swal({
                toast: true,
                text: "ຍົກເລີກສຳເລັດ",
                type: "success",
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
                position: "top-end",
              });
            } else {
              this.$swal({
                text: res?.message
                  ? res?.message
                  : res?.data?.message
                  ? res?.data?.message
                  : JSON.stringify(res),
                type: "error",
                timerProgressBar: true,
                showConfirmButton: true,
              });
            }
          }
        }
      });
    },
    async GetData() {
      try {
        await this.GetHisTrun({
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
