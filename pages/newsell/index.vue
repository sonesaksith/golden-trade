<template>
  <div>
    <CustomerDialog ref="cusDialog" />
    <NewsellBuy ref="buyDialog" />
    <NewsellBill :key="2" ref="myBillSell" v-show="false" />
    <v-container>
      <v-row>
        <v-col cols="12" sm="5" v-if="!loading || listGold.length > 0">
          <v-text-field
            v-model="search"
            outlined
            dense
            hide-details="auto"
            append-icon="mdi-magnify"
            class="rounded-md"
            label="ຄົ້ນຫາ"
            clearable
            @input="page = 1"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="2" v-if="!loading || listGold.length > 0">
          <!-- <v-autocomplete
            v-model="types"
            outlined
            dense
            hide-details="auto"
            :items="listType"
            clearable
            @change="page = 1"
          ></v-autocomplete> -->
        </v-col>
        <v-col cols="6" sm="2" v-if="!loading || listGold.length > 0">
          <v-btn color="goldColor" block dark @click="onOpenBuy()">
            <v-icon>mdi-gold</v-icon> ຊື້
          </v-btn>
        </v-col>
        <v-col cols="6" sm="3" v-if="!loading || listGold.length > 0">
          <div class="d-flex justify-end align-center" style="height: 100%">
            <div
              style="height: 100%; width: 35px"
              class="elevation-2 d-flex justify-center align-center"
              @click="page > 1 ? page-- : void 0"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </div>
            <div
              style="height: 100%; width: 35px"
              class="elevation-2 d-flex justify-center align-center mx-3"
            >
              {{ page }}
            </div>
            <div
              style="height: 100%; width: 35px"
              class="elevation-2 d-flex justify-center align-center"
              @click="page < totalPages ? page++ : void 0"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          v-if="paginatedData.length == 0 && loading"
          align="center"
        >
          <v-img
            src="/loading.png"
            style="width: 300px; object-fit: cover"
          ></v-img>
          <h2>ກຳລັງໂຫລດ</h2>
        </v-col>
        <v-col
          cols="12"
          v-if="paginatedData.length == 0 && loading == false"
          align="center"
        >
          <v-img
            src="/Empty-amico.png"
            style="width: 300px; object-fit: cover"
          ></v-img>
          <h2>ບໍ່ມີຂໍ້ມູນ</h2>
        </v-col>
        <v-col
          v-for="(item, index) in paginatedData"
          :key="index"
          cols="6"
          sm="4"
          md="3"
          xl="2"
        >
          <v-card
            min-height="270"
            @click="addSellItem(item)"
            elevation="1"
            style="height: 100%"
          >
            <v-img height="150" :src="imgFilter(item?.category_name)"></v-img>
            <v-card-title style="font-weight: bold" class="py-1">
              {{ item?.category_name
              }}{{ item?.lai_name ? " - " + item?.lai_name : "" }}
            </v-card-title>
            <v-card-text>
              <div style="font-size: 14px; color: black">
                ນ້ຳໜັກ : {{ item.weight }} {{ item.unit_name }}({{
                  item.real_weight
                }}g|{{ item.purity }}%)
              </div>
              <div style="font-size: 14px; color: black">
                ຈຳນວນ : {{ item.quantity }}
              </div>
              <div class="d-flex justify-space-between align-center">
                <div
                  style="
                    font-size: 13px;
                    font-weight: bold;
                    margin: 2px 0;
                    color: black;
                  "
                >
                  ລາຄາ :
                  {{
                    $formatnumber(
                      $convertGoldToMoney(
                        item.weight,
                        item.unit_name,
                        item.purity,
                        dataRate?.rate_sell
                      )
                    )
                  }}
                  ກີບ
                </div>
                <!-- <div class="goldColor rounded-circle pa-2">
                  <v-icon color="white">mdi-cart-minus</v-icon>
                </div> -->
              </div>
              <div style="font-size: 14px; color: black">
                ຄ່າລາຍ : {{ $formatnumber(item.price_lai) || 0 }} ກີບ
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="12" sm="7">
              <v-card height="500" style="overflow-y: auto">
                <div
                  v-if="listCartBuy.length == 0 && listCartSell.length == 0"
                  style="
                    position: absolute;
                    top: 25%;
                    left: 50%;
                    transform: translateX(-50%);
                  "
                >
                  <img src="/Empty-amico.png" style="width: 150px" />
                  <div class="text-center">
                    <p>ບໍ່ມີລາຍການສິນຄ້າ</p>
                  </div>
                </div>
                <v-container>
                  <v-row>
                    <v-col cols="12" v-if="listCartBuy.length > 0">
                      <h3>ລາຍການຊື້</h3>
                    </v-col>
                    <v-col cols="12" v-if="listCartBuy.length > 0">
                      <div
                        class="d-flex my-2"
                        v-for="(item, index) in listCartBuy"
                      >
                        <div style="width: 20%">
                          <v-img
                            style="width: 100%; object-fit: contain"
                            height="80"
                            :src="imgFilter(item?.category_name)"
                          ></v-img>
                        </div>
                        <div style="width: 80%; height: 100px" class="px-2">
                          <div class="d-flex" style="height: 100%">
                            <div style="width: 70%; height: 100%">
                              <div>
                                ນ້ຳໜັກ : {{ item?.weight }}
                                {{ item?.unitName }}
                              </div>
                              <div>
                                ນ້ຳໜັກໂຕຈິງ : {{ item?.realWeight }}
                                g
                              </div>
                              <div>
                                ລາຄາ :
                                {{
                                  $formatnumber(
                                    Number(item.price) * (item?.countItem || 0)
                                  )
                                }}
                                ກີບ
                              </div>
                            </div>
                            <div style="width: 30%; position: relative">
                              <!-- <div
                                class="d-flex justify-space-between"
                                style="width: 100%"
                              >
                                <v-icon
                                  color="error"
                                  @click="minusBuyItem(item)"
                                  >mdi-minus</v-icon
                                >
                                {{ item?.countItem || 0 }}
                                <v-icon
                                  color="primary"
                                  @click="plusBuyItem(item)"
                                  >mdi-plus</v-icon
                                >
                              </div> -->

                              <div
                                class="d-flex justify-center"
                                style="
                                  position: absolute;
                                  bottom: 13px;
                                  left: 10%;
                                "
                              >
                                <v-btn
                                  color="error"
                                  outlined
                                  small
                                  @click="delBuyItem(item)"
                                >
                                  <v-icon>mdi-trash-can-outline</v-icon>
                                  ລົບ
                                </v-btn>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12" v-if="listCartSell.length > 0">
                      <h3>ລາຍການຂາຍ</h3>
                    </v-col>
                    <v-col cols="12" v-if="listCartSell.length > 0">
                      <div
                        class="d-flex my-2"
                        v-for="(item, index) in listCartSell"
                      >
                        <div style="width: 20%">
                          <v-img
                            style="width: 100%"
                            height="80"
                            :src="imgFilter(item?.category_name)"
                          ></v-img>
                        </div>
                        <div style="width: 80%; height: 100px" class="px-2">
                          <div class="d-flex" style="height: 100%">
                            <div style="width: 70%; height: 100%">
                              <span style="font-size: 14pt">
                                {{ item?.category_name
                                }}{{
                                  item?.lai_name ? " - " + item?.lai_name : ""
                                }}
                              </span>
                              <div>
                                ນ້ຳໜັກ : {{ item.weight }} {{ item.unit_name }}
                              </div>
                              <span
                                >ລາຄາ :
                                {{
                                  $formatnumber(item?.price * item.countItem)
                                }}
                                ກີບ
                              </span>
                            </div>
                            <div style="width: 30%; position: relative">
                              <div
                                class="d-flex justify-space-between"
                                style="width: 100%"
                              >
                                <v-icon
                                  color="error"
                                  @click="minusSellItem(item)"
                                  >mdi-minus</v-icon
                                >
                                {{ item?.countItem || 0 }}
                                <v-icon
                                  color="primary"
                                  @click="plusSellItem(item)"
                                  >mdi-plus</v-icon
                                >
                              </div>

                              <div
                                class="d-flex justify-center"
                                style="
                                  position: absolute;
                                  bottom: 13px;
                                  left: 10%;
                                "
                              >
                                <v-btn
                                  color="error"
                                  outlined
                                  small
                                  @click="delSellItem(item)"
                                >
                                  <v-icon>mdi-trash-can-outline</v-icon>
                                  ລົບ
                                </v-btn>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
            <v-col cols="12" sm="5">
              <v-card height="100%" class="d-flex flex-column">
                <div
                  v-if="listCartBuy.length == 0 && listCartSell.length == 0"
                  style="
                    position: absolute;
                    top: 25%;
                    left: 50%;
                    transform: translateX(-50%);
                  "
                >
                  <img src="/Empty-amico.png" style="width: 150px" />
                  <div class="text-center">
                    <p>ບໍ່ມີລາຍການສິນຄ້າ</p>
                  </div>
                </div>

                <v-container
                  v-if="sumListCartAll > 0"
                  class="d-flex flex-column flex-grow-1"
                >
                  <v-row class="flex-grow-1">
                    <v-col cols="12">
                      <div class="d-flex">
                        <div style="width: 80%">
                          <div v-if="selectingCus.customer_tel">
                            <span style="font-size: 16pt">
                              ຊື່ : {{ selectingCus.customer_name }}
                              {{ selectingCus.customer_surname }}
                            </span>
                            <p style="font-size: 16pt">
                              ເບີໂທ : {{ selectingCus.customer_tel }}
                            </p>
                          </div>
                          <div
                            v-else
                            class="d-flex justify-start align-center"
                            @click="onOpenCusDialog()"
                          >
                            <span
                              style="font-size: 16pt; font-weight: bold"
                              class="primary--text"
                            >
                              ເລືອກລູກຄ້າ
                              <v-icon color="error"
                                >mdi-exclamation-thick</v-icon
                              >
                            </span>
                          </div>
                        </div>
                        <div
                          style="width: 20%"
                          class="d-flex justify-end align-center"
                          @click="onOpenCusDialog()"
                        >
                          <v-icon color="primary">mdi-pencil</v-icon>
                        </div>
                      </div>
                    </v-col>

                    <v-col cols="12">
                      <v-divider></v-divider>
                    </v-col>
                    <v-col cols="12" class="flex-grow-1"></v-col>
                    <v-col cols="12" class="pb-0">
                      <div v-if="sumListCartBuy > 0" style="font-size: 18px">
                        ຍອດຊື້ : {{ $formatnumber(sumListCartBuy) }} ກີບ
                      </div>
                      <div v-if="sumListCartSell > 0" style="font-size: 18px">
                        ຍອດຂາຍ : {{ $formatnumber(sumListCartSell) }} ກີບ
                      </div>

                      <!-- <div style="font-size: 18px">
                        ອາກອນ :
                        {{
                          $formatnumber(sumListCartAll - sumListCartAll * 0.99)
                        }}
                        ກີບ
                      </div> -->
                      <v-divider class="my-3"></v-divider>

                      <b
                        style="font-size: 20px"
                        v-if="sumListCartBuy > 0 && sumListCartSell > 0"
                      >
                        {{ diff > 0 ? "ລູກຄ້າຕື່ມ" : "ທອນ" }} :
                        {{ $formatnumber(diff > 0 ? diff : diff * -1) }} ກີບ
                      </b>
                      <b style="font-size: 20px" v-else>
                        ຍອດຕ້ອງຈ່າຍ :
                        {{ $formatnumber(sumListCartAll) }}
                        ກີບ
                      </b>
                    </v-col>

                    <!-- Empty spacer to push the last column down -->

                    <!-- Last v-col that should be at the bottom -->
                    <v-col cols="12" class="pt-0">
                      <div class="d-flex justify-space-around mt-5">
                        <v-btn
                          color="success"
                          @click="onConfirm()"
                          :loading="isCreatingTransaction"
                          :disabled="isCreatingTransaction"
                        >
                          ຢືນຢັນບິນ
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="askPrintBillDialog" persistent width="400">
      <v-card>
        <v-container>
          <v-row>
            <v-col cols="12" align="center">
              <v-icon color="success" size="70">
                mdi-check-decagram-outline
              </v-icon>
            </v-col>
            <v-col cols="12" align="center" class="pt-0">
              <b> ບັນທຶກລາຍການສຳເລັດ</b>
            </v-col>

            <v-col> ທ່ານຕ້ອງການພິມໃບບິນ ຫຼື ບໍ່ ? </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            style="font-size: 14px"
            class="rounded-lg ml-1 mr-1 btn-pdf"
            color="primary"
            outlined
            @click="onCloseConfirm()"
          >
            <v-icon>mdi-printer</v-icon> &nbsp; ພິມບິນ
          </v-btn>
          <v-btn outlined color="error" @click="askPrintBillDialog = false"
            >ບໍ່ພິມ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import secureStorage from "~/plugins/secure-storage";
export default {
  data() {
    return {
      listType: ["ທອງຮູບປະພັນ", "ທອງຄຳແທ່ງ", "ແຫວນ", "ສາຍຄໍ", "ແຫວນ", "ສາຍແຂນ"],
      search: "",
      types: "",
      page: 1,
      limit: 12,
      loading: false,
      askPrintBillDialog: false,
      isCreatingTransaction: false,
      dataRate: {},
    };
  },
  mounted() {
    this.dataRate = secureStorage.getItem("rate");

    this.$store.commit("customer/SET_SELECTING_CUSTOMER", {});
    this.$refs.myBillSell.statusTran = "ປະຫວັດຂາຍ";
    this.$store.commit("main/SET_HEADER_TITLE", "ຊື້ - ຂາຍ");
    this.getGolds();
    this.GetCus();
  },
  computed: {
    ...mapState("gold", ["listGold"]),
    ...mapState("newsell", ["listCartSell", "listCartBuy"]),
    ...mapState("customer", ["selectingCus"]),
    ...mapGetters("newsell", [
      "sumListCartBuy",
      "sumListCartSell",
      "sumListCartAll",
      "diff",
      "sumSellRealWeight",
      "sumBuyRealWeight",
    ]),

    filteredData() {
      const search = String(this.search || "")
        .trim()
        .toLowerCase();
      const filterType = String(this.types || "")
        .trim()
        .toLowerCase();

      return this.listGold.filter((item) => {
        const matchesSearch =
          item?.product_name?.toLowerCase().includes(search) ||
          item?.lai_name?.toLowerCase().includes(search) ||
          item?.product_type_name?.toLowerCase().includes(search) ||
          item?.category_name?.toLowerCase().includes(search);

        // const matchesFilterType =
        //   item.typGold.toLowerCase().includes(filterType) ||
        //   item.optionGole.toLowerCase().includes(filterType);

        // return matchesSearch && matchesFilterType;
        return matchesSearch;
      });
    },
    paginatedData() {
      const start = (this.page - 1) * this.limit;
      const end = start + this.limit;
      return this.filteredData.slice(start, end);
    },

    totalPages() {
      return Math.ceil(this.filteredData.length / this.limit);
    },
  },
  methods: {
    ...mapActions("gold", ["GetGolds", "GetLines", "GetCategory"]),
    ...mapActions("newsell", [
      "GetCus",
      "TurnProduct",
      "SellProduct",
      "BuyProduct",
    ]),
    async getGolds() {
      this.loading = true;
      try {
        const res = await this.GetGolds();
        if (res.data.status == 200) {
          this.products = res?.data?.resultData;
          this.loading = false;
        }
      } catch (error) {
        console.log("error", error);
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },
    imgFilter(key) {
      let imgSrc = "";

      if (key?.includes("ສາຍແຂນ")) {
        imgSrc = "/chain.jpg";
      } else if (key?.includes("ສາຍຄໍ")) {
        imgSrc = "/necklace.jpg";
      } else if (key?.includes("ແທ່ງ")) {
        imgSrc = "/goldbar.png";
      } else if (key?.includes("ແຫວນ")) {
        imgSrc = "/ring.png";
      } else if (key?.includes("ແຂນ")) {
        imgSrc = "/bracer.png";
      } else {
        imgSrc = "/gold.png";
      }

      return imgSrc;
    },
    onOpenBuy() {
      this.$refs.buyDialog.dialog = true;
    },
    onOpenCusDialog() {
      this.$refs.cusDialog.dialog = true;
    },
    addSellItem(newItem) {
      const price = this.$convertGoldToMoney(
        newItem.weight,
        newItem.unit_name,
        newItem.purity,
        this.dataRate?.rate_sell
      );

      this.$store.commit("newsell/ADD_LIST_CART_SELL", { newItem, price });
    },
    minusBuyItem(item) {
      this.$store.commit("newsell/MINUS_ITEMCOUNT_CART_BUY", item.id);
    },
    plusBuyItem(item) {
      this.$store.commit("newsell/PLUS_ITEMCOUNT_CART_BUY", item.id);
    },
    delBuyItem(item) {
      this.$store.commit("newsell/DELETE_ITEM_CART_BUY", item.id);
    },
    minusSellItem(item) {
      const price = this.$convertGoldToMoney(
        item.weight,
        item.unit_name,
        item.purity,
        this.dataRate?.rate_sell
      );

      this.$store.commit("newsell/MINUS_ITEMCOUNT_CART_SELL", {
        itemId: item.product_id,
        price,
      });
    },
    plusSellItem(item) {
      const price = this.$convertGoldToMoney(
        item.weight,
        item.unit_name,
        item.purity,
        this.dataRate?.rate_sell
      );

      this.$store.commit("newsell/PLUS_ITEMCOUNT_CART_SELL", {
        itemId: item.product_id,
        price,
      });
    },
    delSellItem(item) {
      this.$store.commit("newsell/DELETE_ITEM_CART_SELL", item.product_id);
    },
    onCloseConfirm() {
      this.getGolds();
      this.$refs.myBillSell.OnPrintBill();
      this.$store.commit("customer/SET_SELECTING_CUSTOMER", {});
      this.$store.commit("newsell/CLEAR_LIST_CART_SELL");
      this.$store.commit("newsell/CLEAR_LIST_CART_BUY");
      this.askPrintBillDialog = false;
    },
    async onConfirm() {
      this.isCreatingTransaction = true;
      let res;
      try {
        if (this.selectingCus?.customer_id) {
          res = await this.callApi();
          console.log(res);
          if (res.data.msg === "success") {
            this.askPrintBillDialog = true;
            this.$store.commit("newsell/SET_BUYINFOSTT", res.data.resultData);
          }
        } else {
          this.$swal({
            toast: true,
            text: "ກະລຸນາເລືອກລູກຄ້າ!",
            type: "warning",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
          });
        }
      } catch (error) {
        console.log(error);
        this.$swal({
          toast: true,
          text: error?.response?.data?.message || "ເກີດຂໍ້ຜິດພາດ!",
          type: "error",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
      } finally {
        this.isCreatingTransaction = false;
      }
    },
    async callApi() {
      try {
        let res;

        if (this.listCartSell.length > 0 && this.listCartBuy.length == 0) {
          this.$refs.myBillSell.statusTran = "ປະຫວັດຂາຍ";
          const body = {
            cusId: this.selectingCus.customer_id,
            realTotalWeight: this.sumSellRealWeight,
            totalPrice: this.sumListCartSell,
            disc: 0,
            finalPrice: this.sumListCartSell,
            listExportDetail: this.listCartSell.map((item) => ({
              productId: item.product_id,
              qty: item.countItem,
              totalPrice: item.countItem * item.price,
            })),
          };
          res = await this.SellProduct(body);

          return res;
        } else if (
          this.listCartSell.length == 0 &&
          this.listCartBuy.length > 0
        ) {
          this.$refs.myBillSell.statusTran = "ປະຫວັດຊື້";
          const body = {
            cusId: this.selectingCus.customer_id,
            realTotalWeight: this.sumBuyRealWeight,
            totalPrice: this.sumListCartBuy,
            listImportDetail: this.listCartBuy.map((item) => ({
              weight: item.weight,
              unitId: item.unitId,
              realWeight: item.realWeight,
              price: item.price,
              purity: item.purity,
            })),
          };
          res = await this.BuyProduct(body);

          return res;
        } else if (
          this.listCartSell.length > 0 &&
          this.listCartBuy.length > 0
        ) {
          this.$refs.myBillSell.statusTran = "ປະຫວັດເທີນ";
          const body = {
            cusId: this.selectingCus.customer_id,
            srealTotalWeight: this.sumSellRealWeight,
            stotalPrice: this.sumListCartSell,
            sdisc: 0,
            sfinalPrice: this.sumListCartSell,
            listExportDetail: this.listCartSell.map((item) => ({
              productId: item.product_id,
              qty: item.countItem,
              totalPrice: item.countItem * item.price,
            })),
            brealTotalWeight: this.sumBuyRealWeight,
            btotalPrice: this.sumListCartBuy,
            listImportDetail: this.listCartBuy.map((item) => ({
              weight: item.weight,
              unitId: item.unitId,
              realWeight: item.realWeight,
              price: item.price,
              purity: item.purity,
            })),
          };
          res = await this.TurnProduct(body);

          return res;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
</script>
