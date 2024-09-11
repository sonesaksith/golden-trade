<template>
  <v-dialog v-model="dialog" width="600">
    <v-card class="rounded-lg" elevation="4">
      <v-card-title> ເພີ່ມລາຍການຊື້ເຂົ້າ </v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row class="pa-2">
            <v-col cols="12" class="py-0" sm="6">
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
            <v-col cols="12" class="py-0" sm="6">
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
            <v-col cols="12" class="py-0">
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
            <v-col cols="12" class="py-0" v-if="modelGoldType == 'ທອງຮູບປະພັນ'">
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
            <v-col cols="12" class="py-0" v-if="modelGoldType == 'ທອງຮູບປະພັນ'">
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
            <v-col cols="6" class="py-0">
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
            <v-col cols="6" class="py-0">
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
            <v-col cols="6" class="py-0">
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
              class="py-0"
              style="display: flex; justify-content: start; align-items: center"
            >
              <v-checkbox
                v-model="manualPrice"
                class="mt-0"
                hide-details="auto"
                label="ປ້ອນລາຄາເອງ"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer> </v-spacer>
          <v-btn color="primary" @click="onAddListBuy()">ເພີ່ມລາຍການ</v-btn>
          <v-btn color="error" @click="dialog = false">ປິດ</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      valid: true,
      dialog: false,
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
    };
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
  methods: {
    onAddListBuy() {
      //   console.log(this.modelPurity);
      //   console.log(this.modelLost);
      //   console.log(this.modelGoldType);
      //   console.log(this.modelGoldShape);
      //   console.log(this.modelGoldShapeLine);
      //   console.log(this.modelWeightAmount);
      //   console.log(this.modelWeightType);
      //   console.log(this.modelPrice);

      const data = {
        id: "pk" + Math.floor(Math.random() * 10000000),
        typGold: this.modelGoldType,
        optionGole: this.modelGoldShape,
        typeLine: this.modelGoldShapeLine,
        wight: this.modelWeightAmount,
        typwight: this.modelWeightType,
        sellGold: Number(this.modelPrice.replaceAll(",", "")),
        countItem: 1,
      };
      this.$store.commit("newsell/ADD_LIST_CART_BUY", data);
      this.dialog = false;
      this.modelPurity = 99;
      this.modelLost = 0;
      this.modelGoldType = "ທອງຮູບປະພັນ";
      this.modelGoldShape = "";
      this.modelGoldShapeLine = "";
      this.modelWeightAmount = "";
      this.modelWeightType = "gram";
      this.modelPrice = 0;
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
  },
};
</script>
