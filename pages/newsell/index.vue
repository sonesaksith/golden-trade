<template>
  <div>
    <CustomerDialog ref="cusDialog" />
    <NewsellBuy ref="buyDialog" />
    <v-container>
      <v-row>
        <v-col cols="12" sm="4">
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
        <v-col cols="12" sm="3">
          <v-autocomplete
            v-model="types"
            outlined
            dense
            hide-details="auto"
            :items="listType"
            clearable
            @change="page = 1"
          ></v-autocomplete>
        </v-col>
        <v-col cols="6" sm="2">
          <v-btn color="goldColor" block dark @click="onOpenBuy()">
            <v-icon>mdi-gold</v-icon> ຊື້
          </v-btn>
        </v-col>
        <v-col cols="6" sm="3">
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
        <v-col cols="12" v-if="paginatedData.length == 0" align="center">
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
          <v-card min-height="300" @click="addSellItem(item)">
            <v-img
              height="180"
              :src="
                imgFilter(
                  item.typGold === 'ທອງຄຳແທ່ງ' ? item.typGold : item.optionGole
                )
              "
            ></v-img>

            <v-card-title style="font-weight: bold">
              {{
                item.typGold === "ທອງຄຳແທ່ງ" ? item.typGold : item.optionGole
              }}
              {{ item.typeLine ? "-" : "" }} {{ item.typeLine }}
            </v-card-title>

            <v-card-text>
              <div style="font-size: 17px; color: black">
                ນ້ຳໜັກ : {{ item.wight }} {{ item.typwight }}
              </div>
              <div class="d-flex justify-space-between align-center">
                <div
                  style="
                    font-size: 18px;
                    font-weight: bold;
                    margin: 4px 0;
                    color: black;
                  "
                >
                  {{ $formatnumber(item.sellGold) }} ກີບ
                </div>
                <div class="goldColor rounded-circle pa-2">
                  <v-icon color="white">mdi-cart-minus</v-icon>
                </div>
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
                            style="width: 100%"
                            height="100"
                            :src="
                              imgFilter(
                                item.typGold === 'ທອງຄຳແທ່ງ'
                                  ? item.typGold
                                  : item.optionGole
                              )
                            "
                          ></v-img>
                        </div>
                        <div style="width: 80%; height: 100px" class="px-2">
                          <div class="d-flex" style="height: 100%">
                            <div style="width: 70%; height: 100%">
                              <span style="font-size: 14pt">
                                {{
                                  item.typGold === "ທອງຄຳແທ່ງ"
                                    ? item.typGold
                                    : item.optionGole
                                }}
                                {{ item.typeLine ? "-" : "" }}
                                {{ item.typeLine }}
                              </span>
                              <p>
                                ນ້ຳໜັກ : {{ item.wight }} {{ item.typwight }}
                              </p>
                              <span
                                >ລາຄາ :
                                {{
                                  $formatnumber(
                                    Number(item.sellGold) *
                                      (item?.countItem || 0)
                                  )
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
                                  @click="minusBuyItem(item)"
                                  >mdi-minus</v-icon
                                >
                                {{ item?.countItem || 0 }}
                                <v-icon
                                  color="primary"
                                  @click="plusBuyItem(item)"
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
                            height="100"
                            :src="
                              imgFilter(
                                item.typGold === 'ທອງຄຳແທ່ງ'
                                  ? item.typGold
                                  : item.optionGole
                              )
                            "
                          ></v-img>
                        </div>
                        <div style="width: 80%; height: 100px" class="px-2">
                          <div class="d-flex" style="height: 100%">
                            <div style="width: 70%; height: 100%">
                              <span style="font-size: 14pt">
                                {{
                                  item.typGold === "ທອງຄຳແທ່ງ"
                                    ? item.typGold
                                    : item.optionGole
                                }}
                                {{ item.typeLine ? "-" : "" }}
                                {{ item.typeLine }}
                              </span>
                              <p>
                                ນ້ຳໜັກ : {{ item.wight }} {{ item.typwight }}
                              </p>
                              <span
                                >ລາຄາ :
                                {{
                                  $formatnumber(
                                    Number(item.sellGold) *
                                      (item?.countItem || 0)
                                  )
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
                          <div v-if="selectingCus.surname">
                            <span style="font-size: 16pt">
                              ຊື່ : {{ selectingCus.name }}
                              {{ selectingCus.surname }}
                            </span>
                            <p style="font-size: 16pt">
                              ເບີໂທ : {{ selectingCus.tel }}
                            </p>
                          </div>
                          <div
                            v-else
                            class="d-flex justify-start align-center"
                            @click="onOpenCusDialog()"
                          >
                            <span style="font-size: 16pt" class="primary--text"
                              >ເລືອກລູກຄ້າ</span
                            >
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
                      <div style="font-size: 18px">
                        ຫັກອາກອນ :
                        {{
                          $formatnumber(sumListCartAll - sumListCartAll * 0.99)
                        }}
                        ກີບ
                      </div>
                      <v-divider class="my-3"></v-divider>
                      <b style="font-size: 20px">
                        ຍອດຕ້ອງຈ່າຍ :
                        {{
                          $formatnumber(sumListCartAll - sumListCartAll * 0.01)
                        }}
                        ກີບ
                      </b>
                    </v-col>

                    <!-- Empty spacer to push the last column down -->

                    <!-- Last v-col that should be at the bottom -->
                    <v-col cols="12" class="pt-0">
                      <div class="d-flex justify-space-around mt-5">
                        <v-btn
                          style="font-size: 14px"
                          class="rounded-lg ml-1 mr-1 btn-pdf"
                          color="primary"
                        >
                          <v-icon>mdi-printer</v-icon> &nbsp; ພິມບິນ
                        </v-btn>
                        <v-btn color="success" @click="onConfirm()"
                          >ຢືນຢັນບິນ</v-btn
                        >
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
    <v-dialog v-model="askPrintBillDialog" width="400">
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
          <v-btn outlined color="error" @click="onCloseConfirm()">ບໍ່ພິມ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      listType: ["ທອງຮູບປະພັນ", "ທອງຄຳແທ່ງ", "ແຫວນ", "ສາຍຄໍ", "ແຫວນ", "ສາຍແຂນ"],
      search: "",
      types: "",
      page: 1,
      limit: 6,
      loading: false,
      askPrintBillDialog: false,
    };
  },
  mounted() {
    this.$store.commit("main/SET_HEADER_TITLE", "ຊື້ - ຂາຍ");
  },
  computed: {
    ...mapState("gold", ["listGold"]),
    ...mapState("newsell", ["listCartSell", "listCartBuy"]),
    ...mapState("customer", ["selectingCus"]),
    ...mapGetters("newsell", [
      "sumListCartBuy",
      "sumListCartSell",
      "sumListCartAll",
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
          item.typGold.toLowerCase().includes(search) ||
          item.optionGole.toLowerCase().includes(search) ||
          item.typeLine.toLowerCase().includes(search);

        const matchesFilterType =
          item.typGold.toLowerCase().includes(filterType) ||
          item.optionGole.toLowerCase().includes(filterType);

        return matchesSearch && matchesFilterType;
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
    imgFilter(key) {
      let imgSrc = "";
      switch (key) {
        case "ສາຍແຂນ":
          imgSrc = "/chain.jpg";
          break;
        case "ສາຍຄໍ":
          imgSrc = "/necklace.jpg";
          break;
        case "ທອງຄຳແທ່ງ":
          imgSrc = "/goldbar.png";
          break;

        default:
          imgSrc = "/necklace.jpg";
          break;
      }
      return imgSrc;
    },
    onOpenBuy() {
      this.$refs.buyDialog.dialog = true;
    },
    onOpenCusDialog() {
      this.$refs.cusDialog.dialog = true;
    },
    addSellItem(item) {
      this.$store.commit("newsell/ADD_LIST_CART_SELL", item);
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
      this.$store.commit("newsell/MINUS_ITEMCOUNT_CART_SELL", item.id);
    },
    plusSellItem(item) {
      this.$store.commit("newsell/PLUS_ITEMCOUNT_CART_SELL", item.id);
    },
    delSellItem(item) {
      this.$store.commit("newsell/DELETE_ITEM_CART_SELL", item.id);
    },
    onCloseConfirm() {
      this.$store.commit("customer/SET_SELECTING_CUSTOMER", {});
      this.$store.commit("newsell/CLEAR_LIST_CART_SELL");
      this.$store.commit("newsell/CLEAR_LIST_CART_BUY");
      this.askPrintBillDialog = false;
    },
    onConfirm() {
      this.askPrintBillDialog = true;
    },
  },
};
</script>
