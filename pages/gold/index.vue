<template>
  <div>
    <GoldAdd ref="GoldAdd" v-on:getGolds="getGolds" />
    <GoldUpdate ref="GoldUpdate" v-on:getGolds="getGolds" />
    <GoldDelete ref="GoldDelete" v-on:getGolds="getGolds" />
    <GoldLine ref="GoldLine" />
    <GoldCategory ref="GoldCategory" />

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
              <v-btn color="info" class="mx-1" @click="onOpenCategory"
                >ປະເພດຮູບປະພັນ</v-btn
              >
              <v-btn color="success" class="mx-1" @click="onOpenLine"
                >ລາຍ</v-btn
              >
              <v-btn color="primary" class="mx-1" @click="onOpenCreate"
                >ເພີ່ມທອງ</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="products"
            class="elevation-1 rounded-lg"
            :items-per-page="limit"
            fixed-header
            height="550"
            :page.sync="page"
            hide-default-footer
            loading-text="ກຳລັງໂຫລດຂໍ້ມູນ..."
            :loading="loading"
            no-data-text="ບໍ່ມີຂໍ້ມູນ"
            :search="search"

          >
            <template v-slot:header="props">
              <tr style="background-color: rgba(0, 0, 0, 0.09)">
                <td
                  colspan="24"
                  style="padding: 10px; padding-left: 20px"
                  align="left"
                >
                  <h3 style="font-size: 18px; color: gray">
                    ສິນຄ້າທັງໝົດ:
                    <b style="font-size: 18px; color: #c62828">
                      {{ products.length || 0 }}
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
            <template #item.product_name="{ index, item }">
              <div>
                {{ item.product_name }}
              </div>
            </template>
            <template #item.product_type_name="{ index, item }">
              <div>
                {{ item.product_type_name }}
              </div>
            </template>
            <template #item.category_name="{ index, item }">
              <div>
                {{ item.category_name }}
              </div>
            </template>
            <template #item.lai_name="{ index, item }">
              <div>
                {{ item.lai_name }}
              </div>
            </template>
            <template #item.weight="{ index, item }">
              <div>
                {{ $formatnumber(item.weight) }}
              </div>
            </template>
            <template #item.unit_name="{ index, item }">
              <div>
                {{ item.unit_name }}
              </div>
            </template>
            <template #item.real_weight="{ index, item }">
              <div>
                {{ (item.real_weight) }}
              </div>
            </template>
            <template #item.purity="{ index, item }">
              <div>
                {{ $formatnumber(item.purity) }}%
              </div>
            </template>
            <template #item.price_lai="{ index, item }">
              <div>
                {{ $formatnumber(item.price_lai) }}
              </div>
            </template>
            <template #item.fee="{ index, item }">
              <div>
                {{ $formatnumber(item.fee) }}
              </div>
            </template>
            <template #item.quantity="{ index, item }">
              <div>
                {{ $formatnumber(item.quantity) }}
              </div>
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
                      @click="onDelete(item?.product_id)"
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
import { mapState, mapActions, mapGetters } from "vuex";
import secureStorage from "~/plugins/secure-storage";
export default {
  data() {
    return {
      search: "",
      listLimit: [5, 10, 15, 20, 30, 50],
      loading: true,
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
          text: "ຊື່​ສິນ​ຄ້າ​",
          value: "product_name",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          width: "80px",
          align: "center",
          sortable: false,
        },
        {
          text: "ປະເພດຄຳ",
          value: "product_type_name",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          width: "100px",
          align: "center",
          sortable: false,
        },
        {
          text: "ປະເພດຮູບປະພັນ",
          value: "category_name",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          width: "150px",
          align: "center",
          sortable: false,
        },
        {
          text: "ລາຍ",
          value: "lai_name",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          width: "150px",
          align: "center",
          sortable: false,
        },
        {
          text: "ນ້ຳໜັກ",
          value: "weight",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          width: "150px",
          align: "center",
          sortable: false,
        },
        {
          text: "ປະເພດນ້ຳໜັກ",
          value: "unit_name",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          width: "150px",
          align: "center",
          sortable: false,
        },
        {
          text: "ນ້ຳໜັກຈິງ",
          value: "real_weight",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          width: "150px",
          align: "center",
          sortable: false,
        },
        {
          text: "ຄວາມບໍລິສຸດທອງ",
          value: "purity",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          width: "150px",
          align: "center",
          sortable: false,
        },
        {
          text: "ຄ່າລາຍ",
          value: "price_lai",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          width: "150px",
          align: "center",
          sortable: false,
        },
        {
          text: "ຄ່າທຳນຽມ",
          value: "fee",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          width: "100px",
          align: "center",
          sortable: false,
        },
        {
          text: "ຈຳນວນ",
          value: "quantity",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          width: "100px",
          align: "center",
          sortable: false,
        },
        {
          text: "ຈັດການ",
          value: "actions",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          width: "150px",
          align: "center",
          sortable: false,
        },
      ],
      products: [],
    };
  },
  async mounted() {
    // this.handelClickSearch();
    this.getGolds();
    this.GetDropDown();
    this.$store.commit("main/SET_HEADER_TITLE", "ທອງ");
  },
  computed: {
    ...mapGetters("dropdown", ["dropDown"]),
    totalPage() {
      return Math.ceil((this?.products?.length || 0) / this.limit);
    },
  },
  methods: {
    ...mapActions("dropdown", ["GetDropDown"]),
    ...mapActions("gold", ["GetGolds", "GetLines", "GetCategory"]),
    async getGolds() {
      try {
        const res = await this.GetGolds();
        if (res.data.status == 200) {
          this.products = res?.data?.resultData;
          console.log(this.products);
          this.loading = false;
        }
      } catch (error) {
        console.log("error", error);
        this.loading = false;
      }
    },
    async onDelete(id) {
      this.$refs.GoldDelete.dialog = true;
      this.$refs.GoldDelete.id = id;
    },
    async onOpenCategory() {
      try {
        this.$refs.GoldCategory.dialog = true;
        this.$refs.GoldCategory.page = 1;
        this.$refs.GoldCategory.limit = 15;
        this.$refs.GoldCategory.category = [];
        const res = await this.GetCategory();
        if (res?.data?.status == 200) {
          this.$refs.GoldCategory.category = res?.data?.resultData;
          this.$refs.GoldCategory.loading = false;
        } else {
          this.$refs.GoldCategory.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.$refs.GoldCategory.loading = false;
      }
    },
    async onOpenLine() {
      try {
        this.$refs.GoldLine.dialog = true;
        this.$refs.GoldLine.page = 1;
        this.$refs.GoldLine.limit = 15;
        this.$refs.GoldLine.lines = [];
        const res = await this.GetLines();
        if (res?.data?.status == 200) {
          this.$refs.GoldLine.lines = res?.data?.resultData;
          this.$refs.GoldLine.loading = false;
        } else {
          this.$refs.GoldLine.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.$refs.GoldLine.loading = false;
      }
    },
    onOpenCreate() {
      this.$refs.GoldAdd.dialog = true;
    },

    onOpenUpdate(items) {
      try {
        const item = JSON.parse(JSON.stringify(items));
        console.log('====================================');
        console.log(item);
        console.log('====================================');
        this.$refs.GoldUpdate.dialog = true;
        this.$refs.GoldUpdate.id = item.product_id;
        this.$refs.GoldUpdate.name = item.product_name;
        this.$refs.GoldUpdate.productTypeId = item.product_type_id;
        this.$refs.GoldUpdate.cateId = item.category_id;
        this.$refs.GoldUpdate.laiId = item.lai_id;
        this.$refs.GoldUpdate.unitId = item.unit_id;
        // this.$refs.GoldUpdate.wieght = item.weight;
        this.$refs.GoldUpdate.wieght = this.fotmatNumber(String(item.weight));
        this.$refs.GoldUpdate.pure = item.purity;
        this.$refs.GoldUpdate.fee = item.fee;
        // this.$refs.GoldUpdate.priceLai = item.price_lai;
        this.$refs.GoldUpdate.priceLai = this.fotmatNumber(String(item.price_lai));
        this.$refs.GoldUpdate.realWeight = item.real_weight;
        this.$refs.GoldUpdate.qty = item.quantity;
      } catch (error) {
        console.log(error);
      }
    },

    // format(id, key) {
    //   try {
    //     if (key == "category") {
    //       const result = this.dropDown[key]?.find(
    //         (item) => item.category_id === id
    //       );
    //       return result?.category_name;
    //     } else if (key == "lai") {
    //       const result = this.dropDown[key]?.find(
    //         (item) => item.lai_id === id
    //       );
    //       return result?.lai_name;
    //     } else if (key == "product_type") {
    //       const result = this.dropDown[key]?.find(
    //         (item) => item.product_type_id === id
    //       );
    //       return result?.product_type_name;
    //     } else if (key == "unit") {
    //       const result = this.dropDown[key]?.find(
    //         (item) => item.unit_id === id
    //       );
    //       return result?.unit_name;
    //     } else {
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    fotmatNumber(price) {
      let p;
      p = price.split(",").join("");
      let val;
      let valArr = [];
      val = p;
      val = val.replace(/[^0-9\.]/g, "");
      if (val != "") {
        valArr = val.split(".");
        valArr[0] = parseInt(valArr[0], 10).toLocaleString();
        val = valArr.join(".");
      }
      return val;
      // return p;
    },
  },
};
</script>
