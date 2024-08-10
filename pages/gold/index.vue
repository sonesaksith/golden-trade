<template>
  <div>
    <GoldAddc ref="GoldAddc" />
    <GoldUpdate ref="GoldUpdate" />
    <GoldDelete ref="GoldDelete" />

    <v-container fluid>
      <v-row>
        <v-col cols="12" class="d-flex pt-0">
          <h2>ຈັດການຂໍ້ມູນທອງ</h2>
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
                @keyup.enter="page = 1"
              >
                <template #append>
                  <v-btn
                    small
                    icon
                    @click="page = 1"
                    style="background-color: #1976d2"
                    color="white"
                  >
                    <v-icon small>mdi-magnify</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="8" class="d-flex align-center justify-end">
              <v-btn color="success" @click="onOpenCreate">ເພີ່ມທອງ</v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="listGold || []"
            class="elevation-1 rounded-lg"
            :items-per-page="limit"
            fixed-header
            height="550"
            hide-default-footer
            loading-text="ກຳລັງໂຫລດຂໍ້ມູນ..."
            :loading="loading"
            no-data-text="ບໍ່ມີຂໍ້ມູນ"
            :search="search"
          >
            <template v-slot:header="props">
              <tr style="background-color: rgba(0, 0, 0, 0.09)">
                <td
                  colspan="9"
                  style="padding: 10px; padding-left: 20px"
                  align="left"
                >
                  <h3 style="font-size: 18px; color: gray">
                    ສິນຄ້າທັງໝົດ:
                    <b style="font-size: 18px; color: #c62828">
                      {{ listGold.length || 0 }}
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
                  <span>ຈຳນວນແຖວ</span>
                </div>
                <div class="mx-2">
                  <v-select
                    v-model="limit"
                    style="width: 50px"
                    :items="listLimit"
                    @change="page = 1"
                  ></v-select>
                </div>

                <div class="mx-2">
                  <span v-if="totalPage > 0"> {{ page }}-{{ totalPage }} </span>
                  <span v-else> --- </span>
                </div>
                <div class="ml-2 mr-1">
                  <v-icon @click="page > 1 ? (page -= 1) : void 0">
                    mdi-chevron-left
                  </v-icon>
                </div>

                <div class="mr-2">
                  <v-icon @click="page < totalPage ? (page += 1) : void 0">
                    mdi-chevron-right
                  </v-icon>
                </div>
              </div>
            </template>
            <template #item.no="{ index, item }">
              <div>
                {{ ((page || 1) - 1) * limit + index + 1 }}
              </div>
            </template>
            <template #[`item.sellGold`]="{ item }">
              <span>{{ $formatnumber(item.sellGold) }}</span>
            </template>
            <template #item.actions="{ index, item }">
              <div class="d-flex justify-center align-center">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      @click="onOpenUpdate(item, index)"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon color="primary"> mdi-square-edit-outline </v-icon>
                    </v-btn>
                  </template>
                  <span>ແກ້ໄຂຂໍ້ມູນສິນຄ້າ</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      @click="onDelete(index)"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon color="error"> mdi-delete-empty-outline </v-icon>
                    </v-btn>
                  </template>
                  <span>ລົບສິນຄ້າ</span>
                </v-tooltip>
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      search: "",
      listLimit: [5, 10, 15, 20, 30, 50],
      loading: false,
      page: 1,
      limit: 15,
      dropdownPage: [],
      itemss: [
        {
          text: "ໜ້າຫຼັກ",
          disabled: false,
          href: "/surveyform",
        },
        {
          text: "ຈັດການຂໍ້ມູນສິນຄ້າ",
          disabled: false,
          href: "/products",
        },
      ],
      headers: [
        {
          text: "ລຳດັບ",
          value: "no",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-2",
          sortable: false,
          align: "center",
        },
        {
          text: "ລະຫັດ",
          value: "id",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          align: "center",
          sortable: false,
        },
        {
          text: "ປະເພດຄຳ",
          value: "typGold",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          align: "center",
          sortable: false,
        },
        {
          text: "ປະເພດຮູບປະພັນ",
          value: "optionGole",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          align: "center",
          sortable: false,
        },
        {
          text: "ລາຍ",
          value: "typeLine",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          align: "center",
          sortable: false,
        },
        {
          text: "ນ້ຳໜັກ",
          value: "wight",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          align: "center",
          sortable: false,
        },
        {
          text: "ປະເພດນ້ຳໜັກ",
          value: "typwight",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          align: "center",
          sortable: false,
        },
        {
          text: "ລາຄາຂາຍ",
          value: "sellGold",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          align: "center",
          sortable: false,
        },
        {
          text: "ຈັດການ",
          value: "actions",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          align: "center",
          sortable: false,
        },
      ],
    };
  },
  mounted() {
    // this.handelClickSearch();
  },
  computed: {
    ...mapState("gold", ["listGold"]),
    totalPage() {
      return Math.ceil((this?.listGold?.length || 0) / this.limit);
    },
  },
  methods: {
    // async handelClickSearch() {
    //   this.loading = true;
    //   let res;
    //   try {
    //     res = await this.getProductData({
    //       page: this.page,
    //       limit: this.limit,
    //       search: this.search,
    //     });
    //     this.dropdownPage = [];
    //     for (
    //       let index = 0;
    //       index < res?.data?.resultData?.TotalPage || 0;
    //       index++
    //     ) {
    //       this.dropdownPage.push(index + 1);
    //     }
    //   } catch (error) {
    //   } finally {
    //     this.loading = false;
    //   }
    // },
    async onDelete(index) {
      this.$refs.GoldDelete.dialog = true;
      this.$refs.GoldDelete.myIndex = index;
    },
    onOpenCreate() {
      this.$refs.GoldAddc.dialog = true;
    },

    onOpenUpdate(items, index) {
      const item = JSON.parse(JSON.stringify(items));
      this.$refs.GoldUpdate.dialog = true;
      this.$refs.GoldUpdate.myindex = index;
      this.$refs.GoldUpdate.id = item.id;
      this.$refs.GoldUpdate.typGold = item.typGold;
      this.$refs.GoldUpdate.optionGole = item.optionGole;
      this.$refs.GoldUpdate.typeLine = item.typeLine;
      this.$refs.GoldUpdate.wight = item.wight;
      this.$refs.GoldUpdate.typwight = item.typwight;
      this.$refs.GoldUpdate.sellGold = item.sellGold;
    },
  },
};
</script>
