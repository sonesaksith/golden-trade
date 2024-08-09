<template>
  <div>
    <v-row style="height: 100vh" class="pa-2">
      <v-col cols="12" sm="12" md="5" lg="5">
        <v-card style="height: 800px" class="rounded-lg" elevation="4">
          <v-card-title>
            <h4>
              <span style="color: brown">{{ "#" }}</span>
              &nbsp;ເພີ່ມລາຍການຊື້ເຂົ້າ
            </h4>
          </v-card-title>
          <v-card-text class="px-4 py-0" style="overflow-y: auto">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row class="my-2">
                <v-col cols="12">
                  <v-text-field
                    v-model="modelPurity"
                    label="ຄວາມບໍລິສຸດທອງ"
                    append-icon="mdi-percent"
                    :rules="[(v) => !!v || 'ກະລຸນາປ້ອນຄວາມບໍລິສຸດທອງ']"
                    outlined
                    dense
                    class="rounded-md"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="modelLost"
                    @keyup="fotmatLost()"
                    label="ຫັກຄ່າຫຼູ້ຍຫ້ຽນ"
                    outlined
                    dense
                    class="rounded-md"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="modelGoldType"
                    :items="goldTypes"
                    :item-text="(item) => item.typeName"
                    :item-value="(item) => item.typeName"
                    :rules="[(v) => !!v || 'ກະລຸນາເລືອກປະເພດທອງຄຳ']"
                    label="ປະເພດທອງຄຳ"
                    outlined
                    dense
                    class="rounded-md"
                    clearable
                  ></v-select>
                </v-col>
                <v-col cols="12" v-if="modelGoldType == 'ທອງຮູບປະພັນ'">
                  <v-select
                    v-model="modelGoldShape"
                    :items="goldShape"
                    :item-text="(item) => item.shapeName"
                    :item-value="(item) => item.shapeName"
                    label="ຮູບປະພັນ"
                    outlined
                    dense
                    class="rounded-md"
                    clearable
                  ></v-select>
                  <!-- :rules="[(v) => !!v || 'ກະລຸນາເລືອກຮູບປະພັນ']" -->
                </v-col>
                <v-col cols="12" v-if="modelGoldType == 'ທອງຮູບປະພັນ'">
                  <v-select
                    v-model="modelGoldShapeLine"
                    :items="goldShapeLine"
                    :item-text="(item) => item.shapeLineName"
                    :item-value="(item) => item.shapeLineName"
                    label="ລາຍຮູບປະພັນ"
                    outlined
                    dense
                    class="rounded-md"
                    clearable
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="modelWeightAmount"
                    @keyup="fotmatWeight()"
                    label="ນ້ຳໜັກທອງຄຳ"
                    outlined
                    dense
                    class="rounded-md"
                  ></v-text-field>
                  <!-- :rules="[(v) => !!v || 'ກະລຸນາປ້ອນນ້ຳໜັກທອງຄຳ']" -->
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="modelWeightType"
                    :items="weightType"
                    :item-text="(item) => item.weightName"
                    :item-value="(item) => item.weightName"
                    :rules="[(v) => !!v || 'ກະລຸນາເລືອກປະເພດນ້ຳໜັກ']"
                    label="ປະເພດນ້ຳໜັກ"
                    outlined
                    dense
                    class="rounded-md"
                  ></v-select>
                </v-col>
                <!-- <v-col cols="6">
                  <v-autocomplete
                    v-model="modelAmount"
                    :items="amount"
                    :item-text="(item) => item.amount"
                    :item-value="(item) => item.amount"
                    :rules="[(v) => !!v || 'ກະລຸນາເລືອກຈໍາ​ນວນ']"
                    label="ຈໍາ​ນວນ"
                    outlined
                    dense
                    class="rounded-md"
                  ></v-autocomplete>
                </v-col> -->
                <v-col cols="6">
                  <v-text-field
                    v-model="modelPrice"
                    :disabled="!manualPrice"
                    @keyup="fotmatPrice()"
                    label="ລາຄາ"
                    outlined
                    dense
                    hide-details="auto"
                    class="rounded-md"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="6"
                  style="
                    display: flex;
                    justify-content: start;
                    align-items: center;
                  "
                >
                  <v-checkbox
                    v-model="manualPrice"
                    class="mt-0"
                    hide-details="auto"
                    label="ປ້ອນລາຄາເອງ"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions
            style="
              justify-content: center;
              position: absolute;
              bottom: 10px;
              width: 100%;
            "
          >
            <v-btn
              style="width: 50%; color: #fff; border-radius: 5px"
              color="error"
              @click="clear"
            >
              ລຶບທັງໝົດ
            </v-btn>
            <v-btn
              :disabled="
                !modelPurity ||
                !modelGoldType ||
                !modelWeightAmount ||
                !modelWeightType ||
                !modelPrice
              "
              style="width: 50%; color: #fff; border-radius: 5px"
              color="success"
              @click="addListItems"
            >
              ເພີ່ມ
              <!-- ເຂົ້າໃນລາຍການຊື້ເຂົ້າ -->
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="7" lg="7">
        <v-card style="height: 395px" class="rounded-lg mb-2" elevation="4">
          <v-card-text>
            <v-row>
              <v-col cols="8">
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
              <v-col cols="4">
                <v-btn
                  style="width: 100%; color: #fff; border-radius: 5px"
                  color="success"
                  @click="openAdd"
                >
                  ເພີ່ມລູກຄ້າ
                </v-btn>
              </v-col>
              <v-col cols="12" v-if="!selectedCustomer">
                <v-data-table
                  :headers="headers"
                  :items="listCustomer || []"
                  class="elevation-1 rounded-lg"
                  :page.sync="page"
                  :items-per-page="limit"
                  fixed-header
                  hide-default-footer
                  height="250"
                  loading-text="ກຳລັງໂຫລດຂໍ້ມູນ..."
                  no-data-text="ບໍ່ມີຂໍ້ມູນ"
                  :search="search"
                  @page-count="length = $event"
                >
                  <template #[`item.no`]="{ index }">
                    <span>{{ index + 1 + gotoPage }} </span>
                  </template>
                  <template #item.name="{ index, item }">
                    <div>{{ item.name }} {{ item.surname }}</div>
                  </template>
                  <template #item.tel="{ index, item }">
                    <div>{{ item.tel ? item.tel : "-" }}</div>
                  </template>
                  <template #item.address="{ index, item }">
                    <div>{{ item.address ? item.address : "-" }}</div>
                  </template>
                  <template #item.action="{ index, item }">
                    <v-container align="center">
                      <v-icon @click="selectMyCustomer(item)" color="success">
                        mdi-check-bold
                      </v-icon>
                    </v-container>
                  </template>
                </v-data-table>
                <v-pagination
                  v-model="page"
                  :length="length"
                  :total-visible="limit"
                  @input="NextPage"
                  circle
                  color="goldColor"
                ></v-pagination>
              </v-col>
              <v-col cols="12" v-else>
                <v-card
                  style="
                    height: auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <v-card-text
                    style="
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                    "
                  >
                    <div>
                      <p style="font-size: 16px; font-weight: 600; color: #000">
                        ຊື່ ແລະ ນາມສະກຸນ: {{ myCustomer.name }}
                        {{ myCustomer.surname }}
                      </p>
                      <p style="font-size: 16px; font-weight: 600; color: #000">
                        ເບີໂທ: {{ myCustomer.tel }}
                      </p>
                      <p style="font-size: 16px; font-weight: 600; color: #000">
                        ທີ່ຢູ່: {{ myCustomer.address }}
                      </p>
                    </div>
                  </v-card-text>
                </v-card>
                <img
                  src="../../assets/images/icon-cancel.png"
                  class="remove_cus"
                  @click="removeMyCustomer()"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card style="height: 395px" class="rounded-lg" elevation="4">
          <v-card-title>
            <h4>
              <span style="color: brown">{{ "#" }}</span>
              &nbsp;ລາຍການຊື້ເຂົ້າ
            </h4>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text
            class="px-4 py-0"
            style="overflow-y: auto; height: 270px"
          >
            <br />
            <div v-if="listItems?.length == 0">
              <WidgetNoData
                message="ບໍ່​ມີ​ລາຍການຊື້ເຂົ້າ"
                width="150"
                height="150"
              />
            </div>
            <v-row
              v-else
              class="px-2 py-2"
              v-for="(item, index) in listItems"
              :key="index"
            >
              <v-col
                cols="12"
                style="
                  background-color: antiquewhite;
                  border-radius: 4px;
                  height: auto;
                  position: relative;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 0 10px;
                "
              >
                <div style="display: flex; align-items: center">
                  <img
                    src="/goldbar.png"
                    width="70"
                    height="70"
                    style="border-radius: 5px"
                    class="hide-on-mobile"
                  />
                  <div style="margin-left: 10px">
                    <p
                      style="
                        font-size: 14px;
                        color: #000;
                        margin: 0;
                        min-width: 180px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      "
                    >
                      {{ item.name }} {{ item?.shape ? "(" + item?.shape : ""
                      }}{{
                        item?.shapeLine
                          ? item?.shapeLine + ")"
                          : item?.shape
                          ? ")"
                          : ""
                      }}
                    </p>
                    <p style="font-size: 14px; color: #000; margin: 0">
                      ນ້ຳໜັກ: {{ $formatnumber(item.weight) }}
                      {{ item.weightType }}
                    </p>
                    <p style="font-size: 14px; color: #000; margin: 0">
                      {{
                        item.purity
                          ? `ທອງຄຳບໍລິສຸດ: ` + item.purity + `%`
                          : null
                      }}
                    </p>
                    <p style="font-size: 14px; color: #000; margin: 0">
                      ລາຄາ/ຈໍາ​ນວນ: {{ $formatnumber(item.price) }}
                    </p>
                    <p style="font-size: 14px; color: #000; margin: 0">
                      ຄ່າຫຼູ້ຍຫ້ຽນ: {{ $formatnumber(item.lost) }}
                    </p>
                  </div>
                </div>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    position: absolute;
                    bottom: 4px;
                    right: 4px;
                  "
                >
                  <v-icon
                    class="icon ma-0"
                    small
                    @click="SET_DECREMENT(index)"
                    style="color: #000; cursor: pointer; margin-right: 4px"
                  >
                    mdi-minus
                  </v-icon>
                  <p style="font-size: 18px; color: #000; margin: 0 8px">
                    <b>{{ item.amount }}</b>
                  </p>
                  <v-icon
                    class="icon ma-0"
                    small
                    @click="SET_INCREMENT(index)"
                    style="color: #000; cursor: pointer; margin-left: 4px"
                  >
                    mdi-plus
                  </v-icon>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions
            style="
              justify-content: center;
              position: absolute;
              bottom: 10px;
              width: 100%;
            "
          >
            <v-btn
              :disabled="listItems?.length == 0 || !selectedCustomer"
              :loading="loadingPdf"
              class="rounded-lg btn-pdf"
              style="width: 25%"
              @click="pdf()"
            >
              <v-icon>mdi-file-pdf-box</v-icon> PDF
            </v-btn>
            <v-btn
              :disabled="listItems?.length == 0 || !selectedCustomer"
              :loading="loadingPrint"
              outlined
              class="rounded-lg"
              style="width: 25%"
              @click="print()"
            >
              <v-icon>mdi-printer</v-icon> ພິມ
            </v-btn>
            <v-btn
              :disabled="listItems?.length == 0 || !selectedCustomer"
              style="width: 45%; color: #fff; border-radius: 5px"
              color="success"
              @click="comfirm"
            >
              ຢືນຢັນ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <BuyAddCustomer ref="myCompAddCus" @selectMyCustomer="selectMyCustomer" @setLength="setLength" />
    <div style="display: none">
      <BuyBill
        :key="1"
        :myCus="myCustomer"
        :billNo="myBillOn"
        :totalPrice="totalPrice"
        :totalLost="totalLost"
        :totalPayment="totalPayment"
        :currentDateTime="updateDateTime().currentDateTime"
        :currentDate="updateDateTime().currentDate"
        ref="myCompBill"
      />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import secureStorage from "~/plugins/secure-storage";
export default {
  data() {
    return {
      valid: true,
      loadingPDF: false,
      loadingPrint: false,
      loadingPdf: false,
      search: "",
      page: 1,
      length: 0,
      limit: 10,
      gotoPage: 0,
      headers: [
        {
          text: "ລຳດັບ",
          value: "no",
          width: '50px',
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-2",
          sortable: false,
          align: "center",
        },
        {
          text: "ຊື່ ແລະ ນາມສະກຸນ",
          value: "name",
          width: "120px",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-2",
          sortable: false,
          align: "center",
        },
        {
          text: "ເບີໂທ",
          value: "tel",
          width: "120px",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          align: "center",
          sortable: false,
        },
        {
          text: "ທີ່ຢູ່",
          value: "address",
          width: "120px",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          sortable: false,
          align: "center",
        },
        {
          text: "ເລືອກລູກຄ້າ",
          value: "action",
          width: "120px",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          sortable: false,
          align: "center",
        },
      ],
      modelGoldType: "ທອງຮູບປະພັນ",
      modelPurity: 99,
      manualPrice: false,
      goldTypes: [
        {
          id: 1,
          typeName: "ທອງຮູບປະພັນ",
        },
        {
          id: 2,
          typeName: "ທອງຄຳແທ່ງ",
        },
      ],
      modelGoldShape: "",
      // modelGoldShape: 'ສາຍຄໍ',
      goldShape: [
        {
          id: 1,
          shapeName: "ສາຍຄໍ",
        },
        {
          id: 2,
          shapeName: "ສາຍແຂນ",
        },
        {
          id: 3,
          shapeName: "ແຫວນ",
        },
        {
          id: 4,
          shapeName: "ກຳໄລ",
        },
      ],
      modelWeightAmount: "",
      // weightAmount: [
      //   { id: 1, amount: 1 },
      //   { id: 2, amount: 2 },
      //   { id: 3, amount: 3 },
      //   { id: 4, amount: 4 },
      //   { id: 5, amount: 5 },
      //   { id: 6, amount: 6 },
      //   { id: 7, amount: 7 },
      //   { id: 8, amount: 8 },
      //   { id: 9, amount: 9 },
      //   { id: 10, amount: 10 },
      // ],
      modelWeightType: "gram",
      weightType: [
        {
          id: 1,
          weightName: "gram",
        },
        {
          id: 2,
          weightName: "kg",
        },
        {
          id: 3,
          weightName: "ຫູນ",
        },
        {
          id: 4,
          weightName: "ສະຫຼຶງ",
        },
        {
          id: 5,
          weightName: "ບາດ",
        },
      ],
      modelLost: "",
      modelPrice: 0,
      modelGoldShapeLine: "",
      // modelGoldShapeLine: 'ລາຍມັງກອນ',
      goldShapeLine: [
        {
          id: 1,
          shapeLineName: "ລາຍມັງກອນ",
        },
        {
          id: 2,
          shapeLineName: "ລາຍເສືອ",
        },
        {
          id: 3,
          shapeLineName: "ລາຍງູ",
        },
        {
          id: 4,
          shapeLineName: "ລາຍດອກກຸຫຼາບ",
        },
        {
          id: 5,
          shapeLineName: "ລາຍດອກຊາກຸຣະ",
        },
      ],
      modelAmount: 1,
      amount: [
        { id: 1, amount: 1 },
        { id: 2, amount: 2 },
        { id: 3, amount: 3 },
        { id: 4, amount: 4 },
        { id: 5, amount: 5 },
        { id: 6, amount: 6 },
        { id: 7, amount: 7 },
        { id: 8, amount: 8 },
        { id: 9, amount: 9 },
        { id: 10, amount: 10 },
      ],
      items: [
        {
          purity: 99,
          name: "ທອງຮູບປະພັນ",
          shape: "ສາຍຄໍ",
          shapeLine: "ລາຍມັງກອນ",
          weight: "10",
          weightType: "gram",
          amount: 1,
          price: "18833630",
          lost: "10",
        },
      ],
      headerPDF: [
        {
          text: "ທອງຄຳບໍລິສຸດ",
          value: "purity",
        },
        {
          text: "ປະເພດທອງຄຳ",
          value: "name",
        },
        {
          text: "ຮູບປະພັນ",
          value: "shape",
        },
        {
          text: "ລາຍຮູບປະພັນ",
          value: "shapeLine",
        },
        {
          text: "ນ້ຳໜັກ",
          value: "weight",
        },
        {
          text: "ປະເພດນ້ຳໜັກ",
          value: "weightType",
        },
        {
          text: "ລາຄາ",
          value: "price",
        },
        {
          text: "ຄ່າຫຼູ້ຍຫ້ຽນ",
          value: "lost",
        },
        {
          text: "ຈໍາ​ນວນ",
          value: "amount",
        },
      ],
      mergeTable: { text: 9, value: 1 },
      listFooter: [],
      loading: false,
      totalPrice: 0,
      totalLost: 0,
      totalPayment: 0,
      currentDateTime: "",
      currentDate: "",
      myBillOn: "",
    };
  },
  mounted() {
    this.myBillOn = this.generateRandomNumber(10);
    this.setLength();
  },
  watch: {
    modelWeightAmount: function (val) {
      if (this.manualPrice == false) {
        if (val) {
          this.modelPrice = Math.ceil(
            this.$convertGoldToMoney(
              val?.split(",").join(""),
              this.modelWeightType,
              this.modelPurity,
              this.modelLost?.split(",").join("")
            )
          );
          this.modelPrice = this.fotmatPrice2(String(this.modelPrice));
        } else {
          this.modelPrice = 0;
        }
      }
    },
    modelWeightType: function (val) {
      if (this.manualPrice == false) {
        if (val) {
          this.modelPrice = Math.ceil(
            this.$convertGoldToMoney(
              this.modelWeightAmount?.split(",").join(""),
              val,
              this.modelPurity,
              this.modelLost?.split(",").join("")
            )
          );
          this.modelPrice = this.fotmatPrice2(String(this.modelPrice));
        } else {
          // this.modelWeightType = "gram";
          this.modelPrice = 0;
        }
      }
    },
    modelPurity: function (val) {
      if (this.manualPrice == false) {
        if (val) {
          this.modelPrice = Math.ceil(
            this.$convertGoldToMoney(
              this.modelWeightAmount?.split(",").join(""),
              this.modelWeightType,
              val,
              this.modelLost?.split(",").join("")
            )
          );
          this.modelPrice = this.fotmatPrice2(String(this.modelPrice));
        } else {
          this.modelPrice = Math.ceil(
            this.$convertGoldToMoney(
              this.modelWeightAmount?.split(",").join(""),
              this.modelWeightType,
              val,
              this.modelLost?.split(",").join("")
            )
          );
          this.modelPrice = this.fotmatPrice2(String(this.modelPrice));
        }
      }
    },
    manualPrice: function (val) {
      if (val == true) {
        this.modelPrice = 0;
      } else {
        this.modelPrice = Math.ceil(
          this.$convertGoldToMoney(
            this.modelWeightAmount?.split(",").join(""),
            this.modelWeightType,
            this.modelPurity,
            this.modelLost?.split(",").join("")
          )
        );
        this.modelPrice = this.fotmatPrice2(String(this.modelPrice));
      }
    },
    modelGoldType: function (val) {
      if (val !== "ທອງຮູບປະພັນ") {
        this.modelGoldShape = "";
        this.modelGoldShapeLine = "";
      }
    },
    listItems: function (val) {
      if (val.length == 0) {
        this.myBillOn = this.generateRandomNumber(10);
      }
    },
  },
  computed: {
    ...mapGetters("buy", ["listItems"]),
    ...mapState("buy", ["selectedCustomer", "myCustomer"]),
    ...mapState("customer", ["listCustomer"]),
  },
  methods: {
    ...mapMutations("buy", [
      "SET_ITEMS",
      "SET_DECREMENT",
      "SET_INCREMENT",
      "SET_HISTORY_ITEMS",
      "SET_CUSTOMER",
      "SET_CUSTOMER_BOOL",
    ]),
    ...mapActions("buy", ["setData"]),
    addListItems() {
      try {
        if (this.$refs.form.validate()) {
          this.SET_ITEMS({
            purity: this.modelPurity,
            name: this.modelGoldType,
            shape: this.modelGoldShape,
            shapeLine: this.modelGoldShapeLine,
            weight: this.modelWeightAmount?.split(",").join(""),
            weightType: this.modelWeightType,
            amount: this.modelAmount,
            price: this.modelPrice?.split(",").join(""),
            lost: this.modelLost?.split(",").join(""),
          });
          // this.$refs.form.reset();
          this.modelWeightType = "gram";
          this.modelGoldType = "ທອງຮູບປະພັນ";
          this.modelPurity = 99;
          this.modelGoldShape = "";
          this.modelGoldShapeLine = "";
          this.modelWeightAmount = "";
          this.modelAmount = 1;
          this.modelPrice = "";
          this.modelLost = "";
          this.totalPrice = 0;
          this.totalLost = 0;
          this.totalPayment = 0;
          this.listItems.forEach((item) => {
            this.totalPrice += parseInt(
              Number(item.price) * Number(item.amount),
              10
            );
            this.totalLost += parseInt(Number(item.lost));
          });
          this.totalPayment = this.totalPrice - this.totalLost;
        }
      } catch (error) {
        console.log(error);
      }
    },
    clear() {
      try {
        // this.$refs.form.reset();
        this.modelWeightType = "gram";
        this.modelGoldType = "ທອງຮູບປະພັນ";
        this.modelPurity = 99;
        this.modelGoldShape = "";
        this.modelGoldShapeLine = "";
        this.modelWeightAmount = "";
        this.modelAmount = 1;
        this.modelPrice = "";
        this.modelLost = "";
      } catch (error) {
        console.log(error);
      }
    },
    fotmatWeight() {
      this.modelWeightAmount = this.modelWeightAmount.split(",").join("");
      let val;
      let valArr = [];
      val = this.modelWeightAmount;
      val = val.replace(/[^0-9\.]/g, "");
      if (val != "") {
        valArr = val.split(".");
        valArr[0] = parseInt(valArr[0], 10).toLocaleString();
        val = valArr.join(".");
      }
      this.modelWeightAmount = val;
    },
    fotmatPrice() {
      this.modelPrice = this.modelPrice?.split(",").join("");
      let val;
      let valArr = [];
      val = this.modelPrice;
      val = val.replace(/[^0-9\.]/g, "");
      if (val != "") {
        valArr = val.split(".");
        valArr[0] = parseInt(valArr[0], 10).toLocaleString();
        val = valArr.join(".");
      }
      this.modelPrice = val;
    },
    fotmatPrice2(price) {
      let val;
      let valArr = [];
      val = price?.split(",").join("");
      val = val.replace(/[^0-9\.]/g, "");
      if (val != "") {
        valArr = val.split(".");
        valArr[0] = parseInt(valArr[0], 10).toLocaleString();
        val = valArr.join(".");
      }
      return val;
    },
    fotmatLost() {
      this.modelLost = this.modelLost.split(",").join("");
      let val;
      let valArr = [];
      val = this.modelLost;
      val = val.replace(/[^0-9\.]/g, "");
      if (val != "") {
        valArr = val.split(".");
        valArr[0] = parseInt(valArr[0], 10).toLocaleString();
        val = valArr.join(".");
      }
      this.modelLost = val;
    },
    openAdd() {
      this.$refs.myCompAddCus.dialog = true;
    },
    selectMyCustomer(cus) {
      this.SET_CUSTOMER(cus);
      this.SET_CUSTOMER_BOOL(true);
    },
    removeMyCustomer() {
      this.SET_CUSTOMER({});
      this.SET_CUSTOMER_BOOL(false);
    },
    comfirm() {
      try {
        this.$swal({
          text: "ເຈົ້າຕ້ອງການພິມໃບບີນບໍ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ຍົກເລີກ",
          confirmButtonText: "ຕົກລົງ",
          allowOutsideClick: false,
        }).then(async (result) => {
          if (result.value) {
            this.print();
            let item = {
              listItems: this.listItems,
              cus: this.myCustomer,
              billNo: this.myBillOn,
              date: this.updateDateTime().currentDateTime,
            }
            this.SET_HISTORY_ITEMS(item);
            this.setData([]);
          } else {
            let item = {
              listItems: this.listItems,
              cus: this.myCustomer,
              billNo: this.myBillOn,
              date: this.updateDateTime().currentDateTime,
            }
            this.SET_HISTORY_ITEMS(item);
            this.setData([]);
            this.removeMyCustomer();
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async print() {
      this.loadingPrint = true;
      try {
        this.$refs.myCompBill.OnPrintBill();
      } catch (error) {
        this.$swal({
          text: "ບໍ່ມີຂໍ້ມູນ",
          type: "info",
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: true,
        });
      } finally {
        this.loadingPrint = false;
      }
    },
    async pdf() {
      this.loadingPdf = true;
      try {
        this.$refs.myCompBill.OnPrintPdf();
      } catch (error) {
        this.$swal({
          text: "ບໍ່ມີຂໍ້ມູນ",
          type: "info",
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: true,
        });
      } finally {
        this.loadingPdf = false;
      }
    },
    generateRandomNumber(length) {
      let result = "";
      const characters = "0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
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
    NextPage() {
      this.gotoPage = this.page * this.limit - this.limit;
    },
    setLength() {
      this.length = Math.ceil(this.listCustomer?.length / this.limit);
    },
  },
};
</script>
<style scoped>
.icon {
  border: 1px solid #000;
  color: #000;
  cursor: pointer;
  border-radius: 50%;
  height: 20px;
}
@media (max-width: 700px) {
  .hide-on-mobile {
    display: none;
  }
}

.remove_cus {
  cursor: pointer;
  width: 25px;
  height: 25px;
  position: absolute;
  top: 17.5%;
  right: 1%;
  overflow: hidden;
  text-indent: -9999px;
}

.btn-pdf {
  color: white;
  background: #e20303 !important;
}
</style>
