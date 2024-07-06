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
          <v-col cols="12" sm="4">
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
          <v-col cols="9" sm="4">
            <!-- <v-autocomplete
              v-model="modelGoldType"
              :items="goldTypes"
              :item-text="(item) => item.typeName"
              :item-value="(item) => item.id"
              label="ປະເພດທອງຄຳ"
              outlined
              dense
              hide-details="auto"
              class="rounded-lg"
            ></v-autocomplete> -->
            <treeselect
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
            />
          </v-col>
          <!-- {{ multiGold }} -->

          <v-col cols="3" sm="4" class="d-flex justify-end pr-6 pt-5">
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
        </v-row>
      </v-col>
      <v-col cols="12">
        <!-- <v-row>
          <v-col
            cols="12"
            v-for="(item, index) in listProducts"
            :key="index"
            sm="4"
            md="3"
          >
            <v-card>
              <v-img
                @click="onShowDetails(item)"
                :src="item.img"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.3)"
                height="200px"
              >
                <v-card-title> ທອງຄຳ </v-card-title>
              </v-img>
              <v-card-subtitle @click="onShowDetails(item)">
                <v-expand-transition>
                  <div :class="!show ? 'truncate ' : ''">
                    ທອງຄຳຮູບປະພັນນ້ຳໜັກ 1 ບາດ Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Rerum enim est perferendis
                    praesentium consequuntur. Numquam recusandae aspernatur eum
                    dicta, nisi libero blanditiis, cumque vitae at quam sed odit
                    molestias quia?
                  </div>
                </v-expand-transition>
              </v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  rounded
                  color="goldColor"
                  style="color: white"
                  class="py-3 px-1"
                  @click="numberCart += 1"
                >
                  <v-icon class="rounded-circle pa-1 white" color="goldColor">
                    mdi-cart-minus
                  </v-icon>
                  &nbsp; ເພີ່ມເຂົ້າກະຕ່າ
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row> -->
        {{ multiSearch }}
        <v-data-table
          :headers="headers"
          :items="filteredData"
          item-key="name"
          :search="searchGoldTypes"
        >
          <template
            v-for="(header, i) in headers"
            v-slot:[`header.${header.value}`]="{}"
          >
            <div @click.stop :key="i">
              <v-autocomplete
                v-if="header.text == 'ປະເພດຄຳ'"
                v-model="multiSearch[header.value]"
                :items="goldTypes"
                :item-text="(item) => item.typeName"
                :item-value="(item) => item.typeName"
                outlined
                dense
                hide-details="auto"
                class="rounded-lg"
                clearable
                style="width: 200px"
              ></v-autocomplete>
              <v-autocomplete
                style="width: 200px"
                v-if="header.text == 'ປະເພດຮູບປະຄຳ'"
                v-model="multiSearch[header.value]"
                :items="goldShape"
                :item-text="(item) => item.shapeName"
                :item-value="(item) => item.shapeName"
                outlined
                dense
                hide-details="auto"
                class="rounded-lg"
                clearable
              ></v-autocomplete>
              <v-autocomplete
                style="width: 200px"
                v-if="header.text == 'ລາຍ'"
                v-model="multiSearch[header.value]"
                :items="goldShapeLine"
                :item-text="(item) => item.shapeLineName"
                :item-value="(item) => item.shapeLineName"
                outlined
                dense
                hide-details="auto"
                class="rounded-lg"
                clearable
              ></v-autocomplete>
              <v-autocomplete
                style="width: 200px"
                v-if="header.text == 'ນ້ຳໜັກ'"
                v-model="multiSearch[header.value]"
                :items="amount"
                :item-text="(item) => item.amount"
                :item-value="(item) => item.amount"
                outlined
                dense
                hide-details="auto"
                class="rounded-lg"
                clearable
              ></v-autocomplete>
              <v-autocomplete
                style="width: 200px"
                v-if="header.text == 'ປະເພດນ້ຳໜັກ'"
                v-model="multiSearch[header.value]"
                :items="weightType"
                :item-text="(item) => item.weightName"
                :item-value="(item) => item.weightName"
                outlined
                dense
                hide-details="auto"
                class="rounded-lg"
                clearable
              ></v-autocomplete>
              <br />
              <h2>{{ header.text }}</h2>
            </div>
          </template>
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
      listData: [],
      multiGold: null,
      multiple: true,
      clearable: true,
      searchable: true,
      openOnClick: true,
      clearOnSelect: true,
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
      dataTableSearch: "",
      searchGoldTypes: "",
      selectedItem: [],
      searchTable: "",
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
          weightName: "ຫູນ",
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
      selectedGoldType: null,
      selectedGoldShape: null,
      selectedGoldShapeLine: null,
      selectedOption: null,
      search: "",
      show: false,
      // goldTypes: [
      //   {
      //     id: 1,
      //     typeName: "ທອງຮູບປະພັນ",
      //
      //   },
      //   {
      //     id: 2,
      //     typeName: "ທອງຄຳແທ່ງ",
      //   },
      // ],
      modelGoldType: 1,
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

      multiSearch: {},
    };
  },
  computed: {
    listProducts() {
      return this.modelGoldType == 1
        ? this.listGoldJewellery
        : this.listGoldBar;
    },

    filteredData() {
      // if (this.multiSearch.typGold == null) {
      //   this.multiSearch = {};
      // }
      // if (this.multiSearch.shapeLineName == null) {
      //   this.multiSearch = {};
      // }
      // if (this.multiSearch.shapeName == null) {
      //   this.multiSearch = {};
      // }
      // if (this.multiSearch.typeName == null) {
      //   this.multiSearch = {};
      // }
      // if (this.multiSearch.amount == null) {
      //   this.multiSearch = {};
      // }
      try {
        if (this.multiSearch) {
          return this.items.filter((item) => {
            return Object.entries(this.multiSearch).every(([key, value]) => {
              if (value.includes("|") && !value.includes("!")) {
                let el = value.split("|");
                return el.some((elem) =>
                  (item[key] || "")
                    .toString()
                    .toUpperCase()
                    .startsWith(elem.toString().toUpperCase())
                );
              }
              if (value.substring(0, 1) === "!" && !value.includes("|")) {
                let el = value.split("!");
                return el.some(
                  (elem) =>
                    !(item[key] || "")
                      .toString()
                      .toUpperCase()
                      .startsWith(elem.toString().toUpperCase())
                );
              }
              if (value.includes("|") && value.substring(0, 1) === "!") {
                let el = value.split("!")[1].split("|");
                return !el.some((elem) =>
                  (item[key] || "")
                    .toString()
                    .toUpperCase()
                    .startsWith(elem.toString().toUpperCase())
                );
              }
              if (value.substring(0, 1) === ">") {
                let el = value.split(">");
                if (item[key] !== " ") {
                  return Number(item[key] || "") > el[1];
                }
              }
              if (value.substring(0, 1) === "<") {
                let el = value.split("<");
                if (item[key] !== " ") {
                  return Number(item[key] || "") < el[1];
                }
              }
              if (value.substring(0, 1) === "=") {
                let el = value.split("=");
                // if (item[key] !== " ") {
                //   return Number(item[key] || "") < el[1];
                // }
                return (
                  (item[key] || "").toString().toUpperCase() ===
                  el[1].toString().toUpperCase()
                );
              }
              return (item[key] || "")
                .toString()
                .toUpperCase()
                .includes(value.toString().toUpperCase());
            });
          });
        } else {
          this.multiSearch = {};
          return this.items;
        }
      } catch (error) {
        this.multiSearch = {};
        // console.log("this.multiSearch ", this.multiSearch);
        return this.items;
      }
    },
  },
  watch: {},
  mounted() {
    // this.searchOptions();
  },
  methods: {
    customSearch(value, search, item) {
      console.log("this.multiGold", this.multiGold);

      return Object.values(item).some(
        (v) => v && v.toString().toLowerCase().includes(search)
      );
    },
    searchOptions(options, searchTerm) {
      this.listData = this.item;
      const filteredOptions = [];
      for (const option of this.multiGold) {
        if (
          option.label
            .toLowerCase()
            .includes(this.searchGoldTypes.toLowerCase())
        ) {
          filteredOptions.push(option);
        } else if (option.children) {
          const filteredChildren = searchOptions(
            option.children,
            this.searchGoldTypes
          );
          if (filteredChildren.length > 0) {
            const newOption = { ...option };
            newOption.children = filteredChildren;
            filteredOptions.push(newOption);
          }
        }
      }
      this.listData = filteredOptions;
      // return filteredOptions;
    },
    selectItem(item) {
      this.selectedItem = item;
    },
    onOptionChange() {
      if (this.selectedOption && this.selectedOption.startsWith("type-")) {
        this.selectedOption = null;
      }
    },
    onGoldTypeChange() {
      this.selectedGoldShape = null;
      this.selectedGoldShapeLine = null;
    },
    onGoldShapeChange() {
      this.selectedGoldShapeLine = null;
    },
    onShowDetails(item) {
      this.$refs.refShowdetail.img = item.img;
      this.$refs.refShowdetail.dialog = true;
    },
    getNestedTexts(item) {
      return Object.values(item.find).filter(
        (value) => typeof value === "string"
      );
    },
    updateSelection(selectedItems) {
      // Filter out only the selected goldType, goldShape, and goldShapeLine items
      this.selectedItem = selectedItems.filter((item) => {
        return this.goldTypes.some((goldType) => {
          if (item.type === "goldType" && item.id === goldType.id) {
            return true;
          } else if (item.type === "goldShape") {
            return goldType.goldShape.some((shape) => shape.id === item.id);
          } else if (item.type === "goldShapeLine") {
            return goldType.goldShapeLine.some(
              (shapeLine) => shapeLine.id === item.id
            );
          }
          return false;
        });
      });
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
