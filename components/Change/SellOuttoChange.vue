<template>
  <div>
    <SellShowdetails ref="refShowdetail" />
    <v-row class="px-3">
      <v-col
        cols="12"
        style="position: sticky; top: 0; z-index: 1"
        class="white py-5"
      >
        <v-row>
          <v-col cols="10" sm="3" xs="12">
            <v-text-field
              outlined
              dense
              hide-details="auto"
              class="rounded-lg"
              label="ຄົ້ນຫາ"
              v-model="searchGoldTypes"
            >
              <template #append>
                <v-btn small icon class="goldColor" color="white">
                  <v-icon small>mdi-magnify</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
          <v-col
            cols="2"
            sm="9"
            xs="12"
            class="d-flex justify-end pr-5 pt-5"
            @click="toggleRightDrawer()"
          >
            <!-- v-if="numberCart > 0" -->
            <v-badge
              v-if="listItemsSellOutToChange.length > 0"
              bordered
              color="primary"
              :content="listItemsSellOutToChange.length"
            >
              <v-icon color="goldColor">mdi-cart</v-icon>
            </v-badge>
            <v-icon v-else color="goldColor">mdi-cart</v-icon>
          </v-col>

          <!-- <treeselect
                v-model="multiGold"
                :multiple="multiple"
                :clearable="clearable"
                :searchable="searchable"
                :open-on-click="openOnClick"
                :clear-on-select="clearOnSelect"
                :options="options"
                :flatten-search-results="true"
                :limit="15"
                :max-height="200"
              /> -->

          <!-- {{ multi
              Gold }} -->
        </v-row>
      </v-col>
      <v-col cols="12" :sm="cartStore == true ? 8 : 12">
        <v-card class="elavation-1">
          <v-data-table
            height="75vh"
            :headers="headers"
            :items="filterTable"
            item-key="name"
            disable-sort
          >
            <template v-slot:item.sell="{ item }">
              <v-icon small @click="onPlusData(item)"> mdi-plus </v-icon>
            </template>
            <template #[`item.sellGold`]="{ item }">
              <span>{{ $formatnumber(item.sellGold) }}</span>
            </template>
          </v-data-table></v-card
        >
      </v-col>

      <v-navigation-drawer
        v-model="rightDrawer"
        right
        temporary
        app
        fix
        width="50vh"
        height="100vh"
        style="overflow: visible"
      >
        <v-list>
          <v-row class="px-2">
            <v-col
              cols="12"
              class="d-flex justify-end pr-6 pt-5"
              @click="toggleRightDrawer()"
            >
              <!-- v-if="numberCart > 0" -->
              <v-badge
                v-if="listItemsSellOutToChange.length > 0"
                bordered
                color="primary"
                :content="listItemsSellOutToChange.length"
              >
                <v-icon color="goldColor">mdi-cart</v-icon>
              </v-badge>
              <v-icon v-else color="goldColor">mdi-cart</v-icon>
            </v-col>
            <v-col cols="6" sm="6" xs="12">
              <v-autocomplete
                v-model="modelGold"
                :items="goldTypes"
                :item-text="(item) => item.typeName"
                :item-value="(item) => item.typeName"
                outlined
                dense
                hide-details="auto"
                class="rounded-lg"
                clearable
                label="ປະເພດຄຳ"
              ></v-autocomplete>
            </v-col>
            <v-col cols="6" sm="6" xs="12" v-if="modelGold != 'ທອງຄຳແທ່ງ'">
              <v-autocomplete
                label="ປະເພດຮູບປະພັນ"
                v-model="modelGoldType"
                :items="goldShape"
                :item-text="(item) => item.shapeName"
                :item-value="(item) => item.shapeName"
                outlined
                dense
                hide-details="auto"
                class="rounded-lg"
                clearable
              ></v-autocomplete>
            </v-col>
            <v-col cols="6" sm="6" xs="12" v-if="modelGold != 'ທອງຄຳແທ່ງ'">
              <v-autocomplete
                label="ລາຍ"
                v-model="modelGoldLine"
                :items="goldShapeLine"
                :item-text="(item) => item.shapeLineName"
                :item-value="(item) => item.shapeLineName"
                outlined
                dense
                hide-details="auto"
                class="rounded-lg"
                clearable
              ></v-autocomplete>
            </v-col>
            <v-col cols="6" sm="6" xs="12">
              <v-autocomplete
                label="ນ້ຳໜັກ"
                v-model="modelGoldWeigt"
                :items="amount"
                :item-text="(item) => item.amount"
                :item-value="(item) => item.amount"
                outlined
                dense
                hide-details="auto"
                class="rounded-lg"
                clearable
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6" xs="12">
              <v-autocomplete
                label="ປະເພດນ້ຳໜັກ"
                v-model="modelGoldWeightType"
                :items="weightType"
                :item-text="(item) => item.weightName"
                :item-value="(item) => item.weightName"
                outlined
                dense
                hide-details="auto"
                class="rounded-lg"
                clearable
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="12" v-if="rightDrawer == true">
              <v-card>
                <v-card-title style="height: 10vh">
                  <h6>
                    <span style="color: brown">{{ "#" }}</span>
                    &nbsp;ລາຍການຂາຍຄຳ
                  </h6>
                </v-card-title>
                <v-card-text
                  class="px-4 py-0"
                  style="overflow-y: auto; height: 50vh"
                >
                  <br />
                  <div v-if="listItemsSellOutToChange?.length == 0">
                    <WidgetNoData
                      message="ບໍ່​ມີ​ລາຍການຂາຍ"
                      width="150"
                      height="150"
                    />
                  </div>
                  <v-row
                    v-else
                    class="px-4 py-1"
                    v-for="(item, index) in listItemsSellOutToChange"
                    :key="index"
                  >
                    <v-col
                      class="elevation-1"
                      cols="12"
                      style="
                        border-radius: 4px;
                        height: 100px;
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 5px;
                      "
                    >
                      <div style="display: flex; align-items: center">
                        <!-- <img
                      src="/goldbar.png"
                      width="80"
                      height="80"
                      style="border-radius: 5px"
                    /> -->
                        <div style="margin-left: 10px">
                          <p style="font-size: 16px; color: #000; margin: 0">
                            {{ item.name }} ({{ item.shape
                            }}{{ item.shapeLine }})
                          </p>
                          <p style="font-size: 14px; color: #000; margin: 0">
                            ນ້ຳໜັກ: {{ $formatnumber(item.weight) }}
                            {{ item.weightType }}
                          </p>
                          <p style="font-size: 14px; color: #000; margin: 0">
                            ລາຄາ/ຈໍາ​ນວນ: {{ $formatnumber(item.price) }}
                          </p>
                          <!-- <p style="font-size: 14px; color: #000; margin: 0">
                        ຄ່າຫຼູ້ຍຫ້ຽນ: {{ $formatnumber(item.lost) }}
                      </p> -->
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
                          @click="SET_DECREMENT_SELL_TO_CHANGE(index)"
                          style="
                            color: #000;
                            cursor: pointer;
                            margin-right: 4px;
                          "
                        >
                          mdi-minus
                        </v-icon>
                        <p style="font-size: 18px; color: #000; margin: 0 8px">
                          <b>{{ item.amount }}</b>
                        </p>
                        <v-icon
                          class="icon ma-0"
                          small
                          @click="SET_INCREMENT_SELL_TO_CHANGE(index)"
                          style="color: #000; cursor: pointer; margin-left: 4px"
                        >
                          mdi-plus
                        </v-icon>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions style="height: 10vh">
                  <v-btn
                    :disabled="listItemsSellOutToChange?.length == 0"
                    style="width: 48%; color: #fff; border-radius: 5px"
                    color="error"
                    @click="ClearAllDataSellToChange"
                  >
                    ລົບທັງໝົດ
                  </v-btn>
                  <v-btn
                    v-if="!isExchange"
                    :disabled="listItemsSellOutToChange?.length == 0"
                    style="width: 48%; color: #fff; border-radius: 5px"
                    color="goldColor"
                    @click="myChildFuncPrint()"
                  >
                    ຕໍ່ໄປ
                  </v-btn>
                  <v-btn
                    v-else
                    :disabled="listItemsSellOutToChange?.length == 0"
                    style="width: 48%; color: #fff; border-radius: 5px"
                    color="goldColor"
                    @click="
                      () => {
                        this.rightDrawer = !this.rightDrawer;
                        handlePressNext();
                      }
                    "
                  >
                    ຕໍ່ໄປ
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col></v-row
          >
          <!-- <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Right Drawer Item 1</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Right Drawer Item 2</v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
          <!-- Add more items as needed -->
        </v-list>
      </v-navigation-drawer>
      <!-- :style="(isReportSell = true ? 'display:none' : 'display:none')" -->
    </v-row>
    <div :style="(isReportSell = true ? 'display:none' : 'display:none')">
      <SellPrintSell ref="myGlobalTable" />
    </div>
  </div>
</template>
<script>
import Treeselect from "@riophae/vue-treeselect";
import SellPrintSell from "../../components/Sell/PrintSell.vue";
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
export default {
  // layout: "sell",
  components: { Treeselect, SellPrintSell },
  props: {
    isExchange: { type: Boolean, default: false },
    handlePressNext: { type: Function },
  },
  data() {
    return {
      rightDrawer: false,
      cartStore: false,
      multiGold: null,
      options: [
        {
          id: "ທອງຮູບປະພັນ",
          label: "ທອງຮູບປະພັນ",

          children: [
            {
              id: "ສາຍຄໍ",
              label: "ສາຍຄໍ",
              children: [
                // // array of bike objs
                { id: "ລາຍມັງກອນ", label: "ລາຍມັງກອນ" },
                { id: "ລາຍເສືອ", label: "ລາຍເສືອ" },
                { id: "ລາຍງູ", label: "ລາຍງູ" },
                { id: "ລາຍດອກກຸຫຼາບ", label: "ລາຍດອກກຸຫຼາບ" },
                { id: "ລາຍດອກຊາກຸຣະ", label: "ລາຍດອກຊາກຸຣະ" },
              ],
            },
            {
              id: "ສາຍແຂນ",
              label: "ສາຍແຂນ",
              children: [
                // // array of bike objs
                { id: "ລາຍມັງກອນ", label: "ລາຍມັງກອນ" },
                { id: "ລາຍເສືອ", label: "ລາຍເສືອ" },
                { id: "ລາຍງູ", label: "ລາຍງູ" },
                { id: "ລາຍດອກກຸຫຼາບ", label: "ລາຍດອກກຸຫຼາບ" },
                { id: "ລາຍດອກຊາກຸຣະ", label: "ລາຍດອກຊາກຸຣະ" },
              ],
            },
            {
              id: "ແຫວນ",
              label: "ແຫວນ",
              children: [
                // // array of bike objs
                { id: "ລາຍມັງກອນ", label: "ລາຍມັງກອນ" },
                { id: "ລາຍເສືອ", label: "ລາຍເສືອ" },
                { id: "ລາຍງູ", label: "ລາຍງູ" },
                { id: "ລາຍດອກກຸຫຼາບ", label: "ລາຍດອກກຸຫຼາບ" },
                { id: "ລາຍດອກຊາກຸຣະ", label: "ລາຍດອກຊາກຸຣະ" },
              ],
            },
            {
              id: "ກຳໄລ",
              label: "ກຳໄລ",
              children: [
                // // array of bike objs
                { id: "ລາຍມັງກອນ", label: "ລາຍມັງກອນ" },
                { id: "ລາຍເສືອ", label: "ລາຍເສືອ" },
                { id: "ລາຍງູ", label: "ລາຍງູ" },
                { id: "ລາຍດອກກຸຫຼາບ", label: "ລາຍດອກກຸຫຼາບ" },
                { id: "ລາຍດອກຊາກຸຣະ", label: "ລາຍດອກຊາກຸຣະ" },
              ],
            },
          ],
        },
        {
          id: "ທອງຄຳແທ່ງ",
          label: "ທອງຄຳແທ່ງ",
          children: [
            // array of car objs
          ],
        },
      ],
      amount: [
        { id: 1, amount: "1" },
        { id: 2, amount: "2" },
        { id: 3, amount: "3" },
        { id: 4, amount: " 4" },
        { id: 5, amount: "5" },
        { id: 6, amount: "6" },
        { id: 7, amount: "7" },
        { id: 8, amount: "8" },
        { id: 9, amount: "9" },
        { id: 10, amount: "10" },
      ],
      //====
      searchGoldTypes: "",
      goldShapeLine: [
        { id: 1, shapeLineName: "ລາຍມັງກອນ" },
        { id: 2, shapeLineName: "ລາຍເສືອ" },
        { id: 3, shapeLineName: "ລາຍງູ" },
        { id: 4, shapeLineName: "ລາຍດອກກຸຫຼາບ" },
        { id: 5, shapeLineName: "ລາຍດອກຊາກຸຣະ" },
      ],
      goldShape: [
        { id: 1, shapeName: "ສາຍຄໍ" },
        { id: 2, shapeName: "ສາຍແຂນ" },
        { id: 3, shapeName: "ແຫວນ" },
        { id: 4, shapeName: "ກຳໄລ" },
      ],
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
      headers: [
        { text: "ລະຫັດ", value: "id" },
        { text: "ປະເພດຄຳ", value: "typGold" },
        { text: "ປະເພດຮູບປະຄຳ", value: "optionGole" },
        { text: "ລາຍ", value: "typeLine" },
        { text: "ນ້ຳໜັກ", value: "wight" },
        { text: "ປະເພດນ້ຳໜັກ", value: "typwight" },
        { text: "ລາຄາຂາຍ", value: "sellGold" },
        { text: "ຂາຍ", value: "sell" },
        // Add more headers as per your data structure
      ],
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
      items: [
        {
          id: "pk1",
          typGold: "ທອງຮູບປະພັນ",
          optionGole: "ສາຍຄໍ",
          typeLine: "ລາຍງູ",
          wight: 2,
          typwight: "ຫຸນ",
          sellGold: 1500000,
        },
        {
          id: "pk2",
          typGold: "ທອງຮູບປະພັນ",
          optionGole: "ແຫວນ",
          typeLine: "ລາຍງູ",
          wight: 3,
          typwight: "ຫູນ",
          sellGold: 2500000,
        },
        {
          id: "pk3",
          typGold: "ທອງຄຳແທ່ງ",
          optionGole: "",
          typeLine: "",
          wight: 2,
          typwight: "ບາດ",
          sellGold: 30000000,
        },
        // Add more items as per your data structure
      ],
      numberCart: 0,
      listGoldJewellery: [
        { img: "/chain.jpg" },
        { img: "/necklace.jpg" },
        { img: "/chain.jpg" },
        { img: "/necklace.jpg" },
        { img: "/chain.jpg" },
        { img: "/necklace.jpg" },
        { img: "/chain.jpg" },
        { img: "/necklace.jpg" },
        { img: "/chain.jpg" },
        { img: "/necklace.jpg" },
        { img: "/chain.jpg" },
        { img: "/necklace.jpg" },
        { img: "/chain.jpg" },
        { img: "/necklace.jpg" },
        { img: "/chain.jpg" },
        { img: "/necklace.jpg" },
        { img: "/chain.jpg" },
        { img: "/necklace.jpg" },
        { img: "/chain.jpg" },
        { img: "/necklace.jpg" },
      ],
      listGoldBar: [
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
      ],

      modelGold: "",
      modelGoldType: "",
      modelGoldLine: "",
      modelGoldWeigt: "",
      modelGoldWeightType: "",
      modelAmount: 1,
    };
  },
  computed: {
    ...mapGetters("change", ["listItemsSellOutToChange"]),

    filterTable() {
      if (
        this.modelGold ||
        this.modelGoldType ||
        this.modelGoldLine ||
        this.modelGoldWeigt ||
        this.modelGoldWeightType
      ) {
        let g = this.items.filter(
          (x) =>
            JSON.stringify(x).includes(
              this.modelGold == null ? "" : this.modelGold
            ) &&
            JSON.stringify(x).includes(
              this.modelGoldType == null ? "" : this.modelGoldType
            ) &&
            JSON.stringify(x).includes(
              this.modelGoldLine == null ? "" : this.modelGoldLine
            ) &&
            JSON.stringify(x).includes(
              this.modelGoldWeigt == null ? "" : this.modelGoldWeigt
            ) &&
            JSON.stringify(x).includes(
              this.modelGoldWeightType == null ? "" : this.modelGoldWeightType
            )
        );
        return g;
      } else {
        return this.items;
      }
    },
  },
  mounted() {
    this.setHeader("ຂາຍອອກ");
  },

  watch: {
    listItemsSellOutToChange: function (val) {
      if (val.length == 1) {
        this.rightDrawer = true;
      }
    },
  },
  methods: {
    ...mapActions("main", ["setHeader"]),
    ...mapActions("change", [
      "ClearAllDataSellToChange",
      "addOrUpdateItemSellToChange",
    ]),
    ...mapMutations("change", [
      "SET_ITEMS_SELL_TO_CHANGE",
      "SET_DECREMENT_SELL_TO_CHANGE",
      "SET_INCREMENT_SELL_TO_CHANGE",
    ]),
    myChildFuncPrint() {
      // this.loadingPrint = true
      this.$refs.myGlobalTable.OnPrintBill();
      // try {
      //   this.$refs.myGlobalTable.OnPrintBill()
      // } catch (error) {
      //   this.$swal({
      //     text: 'ບໍ່ມີຂໍ້ມູນ',
      //     type: 'info',
      //     timer: 5000,
      //     timerProgressBar: true,
      //     showConfirmButton: true,
      //   })
      // } finally {
      //   // this.loadingPrint = false
      // }
    },
    toggleRightDrawer() {
      this.rightDrawer = !this.rightDrawer;
    },
    onPlusData(item) {
      const newItem = {
        id: item.id,
        name: item.typGold,
        shape: item.optionGole,
        shapeLine: item.typeLine,
        weight: item.wight,
        weightType: item.typwight,
        price: item.sellGold,
        amount: this.modelAmount,
      };
      console.log(newItem);
      this.addOrUpdateItemSellToChange(newItem);
    },
    ShowCart() {
      // console.log("test");
      this.cartStore = !this.cartStore;
    },
  },
};
</script>
<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css">
.truncate {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
