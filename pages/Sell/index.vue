<template>
  <div>
    <SellShowdetails ref="refShowdetail" />
    <v-row>
      <v-col
        cols="12"
        style="position: sticky; top: 0; z-index: 1"
        class="white py-5 elevation-2"
      >
        <v-row>
          <v-col cols="4" sm="4" xs="4">
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
          <v-col cols="8" sm="8" class="d-flex justify-end pr-6 pt-5">
            <v-badge
              v-if="numberCart > 0"
              bordered
              color="primary"
              :content="numberCart"
            >
              <v-icon color="goldColor">mdi-cart</v-icon>
            </v-badge>
            <v-icon v-else color="goldColor">mdi-cart</v-icon>
          </v-col>
          <v-col cols="2" sm="2" xs="4">
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
              :max-height="300"
            /> -->
          </v-col>
          <v-col cols="2" sm="2" xs="4">
            <v-autocomplete
              v-model="modelGoldType"
              :items="goldShape"
              :item-text="(item) => item.shapeName"
              :item-value="(item) => item.shapeName"
              outlined
              dense
              hide-details="auto"
              class="rounded-lg"
              clearable
              label="ປະເພດຮູບປະຄຳ"
            ></v-autocomplete>
          </v-col>
          <v-col cols="2" sm="2" xs="4">
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
          <v-col cols="2" sm="2" xs="4">
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
          <v-col cols="2" sm="2" xs="4">
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
          <!-- {{ multi
            Gold }} -->
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="filterTable"
          item-key="name"
          :search="searchGoldTypes"
        >
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Treeselect from "@riophae/vue-treeselect";
export default {
  components: { Treeselect },
  data() {
    return {
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
        // { text: "ລຳດັບ", value: "id" },
        { text: "ປະເພດຄຳ", value: "typGold" },
        { text: "ປະເພດຮູບປະຄຳ", value: "optionGole" },
        { text: "ລາຍ", value: "typeLine" },
        { text: "ນ້ຳໜັກ", value: "wight" },
        { text: "ປະເພດນ້ຳໜັກ", value: "typwight" },
        // Add more headers as per your data structure
      ],
      weightType: [
        {
          id: 1,
          weightName: "ກຣາມ(g)",
        },
        {
          id: 2,
          weightName: "ຫຸນ",
        },
        {
          id: 3,
          weightName: "ສະຫຼຶງ",
        },
        {
          id: 4,
          weightName: "ບາດ",
        },
      ],
      items: [
        {
          // id: 1,
          typGold: "ທອງຮູບປະພັນ",
          optionGole: "ສາຍຄໍ",
          typeLine: "ລາຍງູ",
          wight: 2,
          typwight: "ຫຸນ",
        },
        {
          // id: 2,
          typGold: "ທອງຮູບປະພັນ",
          optionGole: "ແຫວນ",
          typeLine: "ລາຍງູ",
          wight: 3,
          typwight: "ຫູນ",
        },
        {
          // id: 3,
          typGold: "ທອງຄຳແທ່ງ",
          optionGole: "",
          typeLine: "",
          wight: 2,
          typwight: "ບາດ",
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
    };
  },
  computed: {
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
  watch: {},
  mounted() {},
  methods: {},
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
