<template>
  <div class="ma-2">
    <v-row style="height: 100vh" class="pa-4">
      <v-col
        cols="12"
        sm="12"
        :md="listItems.length > 0 ? '7' : '12'"
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
                    v-model="modelProductCode"
                    label="ລະຫັດສິນຄ້າ"
                    outlined
                    dense
                    class="rounded-md"
                    ></v-text-field>
                    <!-- :rules="[(v) => !!v || 'ກະລຸນາປ້ອນລະຫັດສິນຄ້າ']" -->
                </v-col>
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
                  ></v-text-field>
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
              :disabled="!modelProductCode || !modelPurity || !modelGoldType || !modelGoldShape || !modelWeightAmount || !modelWeightType || !modelPrice"
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
      <v-col cols="12" sm="12" md="5" lg="5" v-if="listItems.length > 0">
        <v-card style="height: 700px" class="rounded-xl" elevation="4">
          <v-card-title style="height: 60px">
            <h4>
              <span style="color: brown">{{ "#" }}</span>
              &nbsp;ລາຍການຊື້ເຂົ້າ
            </h4>
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
              class="px-4 py-2"
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
              :disabled="listItems?.length == 0"
              style="width: 100%; color: #fff; border-radius: 5px"
              color="goldColor"
              @click="buy"
            >
              ຊື້ເຂົ້າ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      valid: true,
      modelGoldType: "ທອງຮູບປະພັນ",
      modelProductCode: "",
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
    };
  },
  mounted() {},
  watch: {
    modelWeightAmount: function (val) {
      if (this.manualPrice == false) {
        if (val) {
          console.log(val);
          console.log(this.modelWeightType);
          console.log(this.modelPurity);
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
  },
  computed: {
    ...mapGetters("buy", ["listItems"]),
  },
  methods: {
    ...mapMutations("buy", ["SET_ITEMS", "SET_DECREMENT", "SET_INCREMENT"]),
    addListItems() {
      try {
        if (this.$refs.form.validate()) {
          this.SET_ITEMS({
            codeName: this.modelProductCode,
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
          this.modelProductCode = "";
          this.modelGoldShape = "";
          this.modelGoldShapeLine = "";
          this.modelWeightAmount = "";
          this.modelAmount = 1;
          this.modelPrice = "";
          this.modelLost = "";
        }
        // this.listItems.push({
        //   name: this.modelGoldType,
        //   shape: this.modelGoldShape,
        //   shapeLine: this.modelGoldShapeLine,
        //   weight: this.modelWeightAmount.split(",").join(""),
        //   weightType: this.modelWeightType,
        //   amount: this.modelAmount,
        //   price: this.modelPrice.split(",").join(""),
        //   lost: this.modelLost.split(",").join(""),
        // });
      } catch (error) {
        console.log(error);
      }
    },
    buy() {
      console.log(this.listItems);
    },
    clear() {
      try {
        // this.$refs.form.reset();
        this.modelWeightType = "gram";
        this.modelGoldType = "ທອງຮູບປະພັນ";
        this.modelPurity = 99;
        this.modelProductCode = "";
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
    // removeListItem(item, i) {
    //   let temp = this.listItems.filter((item, ind) => {
    //     return i != ind;
    //   });
    //   this.listItems = temp;
    // },
    // increment(i) {
    //   this.listItems.forEach((item, index) => {
    //     if (index === i) {
    //       item.amount += 1;
    //     }
    //   });
    //   return this.listItems;
    // },
    // decreament(i) {
    //   this.listItems = this.listItems.filter((item, index) => {
    //     if (index === i) {
    //       item.amount -= 1;
    //     }
    //     return item.amount > 0;
    //   });
    //   return this.listItems;
    // },
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
</style>
