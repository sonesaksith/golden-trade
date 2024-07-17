<template>
  <div>
    <v-row style="height: 100vh" class="pa-2">
      <v-col
        cols="12"
        sm="12"
        :md="listItems.length > 0 ? '6' : '12'"
        :lg="listItems.length > 0 ? '7' : '12'"
      >
        <v-card style="height: 700px" class="rounded-xl" elevation="4">
          <v-card-title style="height: 60px">
            <h4>
              <span style="color: brown">{{ "#" }}</span>
              &nbsp;ເພີ່ມລາຍການຊື້ເຂົ້າ
            </h4>
          </v-card-title>
          <v-card-text
            class="px-4 py-0"
            style="height: 580px; overflow-y: auto"
          >
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row class="my-2">
                <v-col cols="6">
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
                <v-col cols="6">
                  <v-text-field
                    v-model="modelLost"
                    @keyup="fotmatLost()"
                    label="ຫັກຄ່າຫຼູ້ຍຫ້ຽນ"
                    outlined
                    dense
                    class="rounded-md"
                  >
                    <template #append>
                      <div class="pt-1">
                        <span> ກີບ </span>
                      </div>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="6">
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
                <v-col cols="6" v-if="modelGoldType == 'ທອງຮູບປະພັນ'">
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
                <v-col cols="6" v-if="modelGoldType == 'ທອງຮູບປະພັນ'">
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
          <v-card-actions style="height: 60px; justify-content: center">
            <v-btn
              style="width: 45%; color: #fff; border-radius: 5px"
              color="error"
              @click="clear"
            >
              ລຶບທັງໝົດ
            </v-btn>
            &nbsp;&nbsp;
            <v-btn
              :disabled="
                !modelPurity ||
                !modelGoldType ||
                !modelWeightAmount ||
                !modelWeightType ||
                !modelPrice
              "
              style="width: 45%; color: #fff; border-radius: 5px"
              color="success"
              @click="addListItems"
            >
              ເພີ່ມ
              <!-- ເຂົ້າໃນລາຍການຊື້ເຂົ້າ -->
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="5" v-if="listItems.length > 0">
        <v-card style="height: 700px" class="rounded-xl" elevation="4">
          <v-card-title style="height: 60px">
            <h4>
              <span style="color: brown">{{ "#" }}</span>
              &nbsp;ລາຍການຊື້ເຂົ້າ
            </h4>
            <v-spacer></v-spacer>
            <!-- <div>
              <v-btn
                v-if="!isExchange"
                :loading="loadingPDF"
                style="font-size: 14px; margin-top: 10px"
                class="rounded-lg ml-1 mr-1 btn-pdf"
                @click="pdf()"
              >
                <v-icon>mdi-file-pdf-box</v-icon> &nbsp; PDF
              </v-btn>
            </div>
            <div>
              <v-btn
                v-if="!isExchange"
                :loading="loadingPrint"
                outlined
                style="font-size: 14px; margin-top: 10px"
                class="rounded-lg ml-1 mr-1"
                @click="print()"
              >
                <v-icon>mdi-printer</v-icon> &nbsp; ພິມ
              </v-btn>
            </div> -->
          </v-card-title>
          <v-card-text
            class="px-4 py-0"
            style="height: 580px; overflow-y: auto"
          >
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
                  height: 100px;
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
                        font-size: 16px;
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
                      {{
                        item.purity
                          ? `, ທອງຄຳບໍລິສຸດ: ` + item.purity + `%.`
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
                    bottom: 8px;
                    right: 8px;
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
          <v-card-actions style="height: 60px">
            <v-btn
              v-if="!isExchange"
              :disabled="listItems?.length == 0"
              style="width: 100%; color: #fff; border-radius: 5px"
              color="goldColor"
              @click="Next"
            >
              ຕໍ່ໄປ
            </v-btn>
            <v-btn
              v-else
              :disabled="listItems?.length == 0"
              style="width: 100%; color: #fff; border-radius: 5px"
              color="goldColor"
              @click="handlePressNext()"
            >
              ຕໍ່ໄປ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- <div style="display: none">
      <PrintBuy
        v-if="listItems != '' && !loading"
        message="ໃບບີນ"
        :setHeader="headerPDF"
        :list="listItems"
        :setFooter="listFooter"
        :mergeTable="mergeTable"
        setSty="portrait"
        :key="1"
        ref="myCompPrint"
      />
    </div> -->
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
      modelLost: 0,
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
    };
  },
  props: {
    isExchange: { type: Boolean, default: false },
    handlePressNext: { type: Function },
  },
  mounted() {},
  watch: {
    modelWeightAmount: function (val) {
      if (this.manualPrice == false) {
        if (val) {
          this.modelPrice = Math.ceil(
            this.$convertGoldToMoney(
              val?.split(",").join(""),
              this.modelWeightType,
              this.modelPurity,
              String(this.modelLost)?.split(",").join("")
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
              String(this.modelLost)?.split(",").join("")
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
              String(this.modelLost)?.split(",").join("")
            )
          );
          this.modelPrice = this.fotmatPrice2(String(this.modelPrice));
        } else {
          this.modelPrice = Math.ceil(
            this.$convertGoldToMoney(
              this.modelWeightAmount?.split(",").join(""),
              this.modelWeightType,
              val,
              String(this.modelLost)?.split(",").join("")
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
            String(this.modelLost)?.split(",").join("")
          )
        );
        this.modelPrice = this.fotmatPrice2(String(this.modelPrice));
      }
    },
  },
  computed: {
    ...mapGetters("buy", ["listItems"]),
  },
  methods: {
    ...mapMutations("buy", ["SET_ITEMS", "SET_DECREMENT", "SET_INCREMENT"]),
    ...mapActions("buy", ["setData"]),
    async print() {
      await this.callPDF();
      try {
        this.loadingPrint = true;
        this.$refs.myCompPrint.OnPrintBill();
      } catch (error) {
        console.log(error);
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
      await this.callPDF();
      try {
        this.loadingPDF = true;
        if (this.listItems != "") {
          this.$refs.myCompPrint.downloadPDF();
        } else {
          this.$swal({
            text: "ບໍ່ມີຂໍ້ມູນ",
            type: "info",
            timer: 5000,
            timerProgressBar: true,
            showConfirmButton: true,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingPDF = false;
      }
    },
    async callPDF() {
      this.loading = true;
      try {
        const res = await this.setData(this.listItems);
        let totalPrice = 0;
        let totalAmount = 0;
        this.listItems.forEach((item) => {
          totalPrice += parseInt(item.price, 10);
          totalAmount += item.amount;
        });
        this.listFooter = [
          { text: "ທັງໝົດ", value: totalAmount },
          { text: "ລາຄາທັງໝົດ", value: totalPrice },
        ];
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
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
            lost: String(this.modelLost)?.split(",").join(""),
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
        }
      } catch (error) {
        console.log(error);
      }
    },
    Next() {
      console.log(this.listItems);
      this.$router.push("/customer/");
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
      this.modelLost = String(this.modelLost)?.split(",").join("");
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
.btn-pdf {
  color: white;
  border-style: solid;
  border-color: #e20303;
  background: #e20303 !important;
}
</style>
