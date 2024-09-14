<template>
  <div>
    <SellShowdetails ref="refShowdetail" />
    <v-row class="px-3">
      <v-col cols="12" sm="12">
        <v-col
          cols="12"
          style="position: sticky; top: 0; z-index: 1"
          class="white py-5"
        >
          <v-row>
            <v-col cols="10" sm="11" xs="10">
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
              sm="1"
              xs="2"
              class="d-flex justify-end pr-5 pt-5"
              @click="toggleRightDrawer()"
            >
              <!-- v-if="numberCart > 0" -->
              <v-badge
                v-if="listItems.length > 0"
                bordered
                color="primary"
                :content="listItems.length"
              >
                <v-icon color="goldColor" size="35">mdi-cart</v-icon>
              </v-badge>
              <v-icon v-else color="goldColor" size="35">mdi-cart</v-icon>
            </v-col>
            <v-col cols="6" sm="3" xs="6">
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
            <!-- v-if="modelGold != 'ທອງຄຳແທ່ງ'" -->
            <v-col cols="6" sm="2" xs="12">
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
            <v-col cols="6" sm="2" xs="3">
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
            <v-col cols="6" sm="2" xs="12">
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
            <v-col cols="12" sm="2" xs="12">
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
          </v-row>
        </v-col>
        <!-- :sm="cartStore == true ? 8 : 12" -->
        <v-col cols="12"
          ><v-row>
            <v-col
              cols="12"
              v-for="(item, index) in filterTable"
              :key="index"
              sm="4"
              md="3"
            >
              <v-card>
                <v-card-title> {{ item.typGold }} </v-card-title>
                <v-card-subtitle>
                  <div>
                    <span>ປະເພດຄຳ :</span>
                    <span> {{ item.optionGole || "--" }}</span>
                  </div>
                  <div>
                    <span>ປະເພດຮູບປະພັນ :</span>
                    <span>{{ item.typeLine || "--" }} </span>
                  </div>
                  <div>
                    <span>ນ້ຳໜັກ :</span>
                    <span>{{ item.wight }} {{ item.typwight }}</span>
                  </div>
                  <div>
                    <span>ລາຄາ : </span
                    ><span
                      >{{
                        $formatnumber(item.sellGold * amountGard[index])
                      }}
                      ກີບ</span
                    >
                  </div>

                  <div class="d-flex">
                    <div class="me-auto"><span>ຈຳນວນ : </span></div>
                    <div class="d-flex">
                      <p
                        class="red-btn rounded-circle"
                        style="
                          width: 22px;
                          display: flex;
                          justify-content: space-evenly;
                        "
                        @click="deleteAmount(index)"
                      >
                        -
                      </p>
                      &nbsp; &nbsp;
                      <span>{{ amountGard[index] }}</span>
                      &nbsp; &nbsp;
                      <button
                        class="green-btn rounded-circle"
                        style="
                          width: 25px;
                          display: flex;
                          justify-content: space-evenly;
                        "
                        @click="plusAmount(index)"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </v-card-subtitle>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    rounded
                    color="goldColor"
                    style="color: white"
                    class="py-3 px-1"
                    @click="onPlusData(item, index)"
                  >
                    <v-icon class="rounded-circle pa-1 white" color="goldColor">
                      mdi-cart-minus
                    </v-icon>
                    &nbsp; ເພີ່ມເຂົ້າກະຕ່າ
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
              <!-- <v-card class="elavation-1">
            <v-data-table
              :search="searchGoldTypes"
              height="75vh"
              :headers="headers"
              :items="filterTable"
              item-key="name"
              disable-sort
            >
              <template v-slot:[`item.sell`]="{ item }">
                <v-icon small @click="onPlusData(item)"> mdi-plus </v-icon>
              </template>
              <template #[`item.sellGold`]="{ item }">
                <span>{{ $formatnumber(item.sellGold) }}</span>
              </template>
            </v-data-table>
          </v-card> -->
            </v-col>
          </v-row>
        </v-col>
      </v-col>

      <v-navigation-drawer
        v-model="rightDrawer"
        right
        temporary
        app
        fix
        width="100%"
        height="100vh"
        style="overflow: visible"
      >
        <div>
          <v-list>
            <v-row class="px-2">
              <v-col
                cols="12"
                class="d-flex justify-end pr-6 pt-5"
                @click="toggleRightDrawer()"
              >
                <!-- v-if="numberCart > 0" -->
                <v-badge
                  v-if="listItems.length > 0"
                  bordered
                  color="primary"
                  :content="listItems.length"
                >
                  <v-icon color="goldColor" size="35">mdi-cart</v-icon>
                </v-badge>
                <v-icon v-else color="goldColor" size="35">mdi-cart</v-icon>
              </v-col>
              <v-col cols="12" sm="12">
                <v-list>
                  <v-row class="px-2">
                    <v-col cols="12" sm="6">
                      <v-card
                        style="height: 100%"
                        class="rounded-lg mb-2"
                        elevation="4"
                      >
                        <v-card-text>
                          <v-row>
                            <v-col
                              cols="8"
                              v-if="!selectedCustomer"
                              class="pb-0"
                            >
                              <v-text-field
                                v-model="search"
                                outlined
                                dense
                                hide-details="auto"
                                label="ຄົ້ນຫາ"
                              >
                                <template #append>
                                  <v-btn
                                    small
                                    icon
                                    class="goldColor"
                                    color="white"
                                  >
                                    <v-icon small>mdi-magnify</v-icon>
                                  </v-btn>
                                </template>
                              </v-text-field>
                            </v-col>
                            <v-col
                              cols="4"
                              v-if="!selectedCustomer"
                              class="pb-0"
                            >
                              <v-btn
                                style="
                                  width: 100%;
                                  color: #fff;
                                  border-radius: 5px;
                                "
                                color="success"
                                @click="openAdd"
                              >
                                ເພີ່ມລູກຄ້າ
                              </v-btn>
                            </v-col>
                            <v-col
                              cols="12"
                              v-if="!selectedCustomer"
                              class="py-0"
                            >
                              <v-data-table
                                :headers="headersCus"
                                :items="listCustomer || []"
                                class="elevation-1"
                                :items-per-page="listCustomer.length"
                                hide-default-footer
                                fixed-header
                                height="100%"
                                style="max-height: 600px; overflow-y: auto"
                                loading-text="ກຳລັງໂຫລດຂໍ້ມູນ..."
                                no-data-text="ບໍ່ມີຂໍ້ມູນ"
                                :search="search"
                              >
                                <template #[`item.no`]="{ index }">
                                  <span>{{ index + 1 }} </span>
                                </template>
                                <template #[`item.name`]="{ item }">
                                  <div>
                                    {{ item.name }} {{ item.surname }} <br />{{
                                      item.tel
                                    }}
                                  </div>
                                </template>
                                <!-- <template #[`item.tel`]="{ item }">
                                <div>{{ item.tel ? item.tel : "-" }}</div>
                              </template>
                              <template #[`item.address`]="{ item }">
                                <div>
                                  {{ item.address ? item.address : "-" }}
                                </div>
                              </template> -->
                                <template #[`item.action`]="{ item }">
                                  <v-container align="center">
                                    <v-icon
                                      @click="selectMyCustomer(item)"
                                      color="success"
                                    >
                                      mdi-check-bold
                                    </v-icon>
                                  </v-container>
                                </template>
                              </v-data-table>
                            </v-col>
                            <v-col cols="12" v-else>
                              <v-row style="height: auto">
                                <v-col cols="12">
                                  <p
                                    style="
                                      font-size: 18px;
                                      font-weight: 600;
                                      color: #000;
                                      text-align: center;
                                    "
                                  >
                                    ຂໍ້ມູນລູກຄ້າ
                                  </p>
                                  <p
                                    style="
                                      font-size: 16px;
                                      font-weight: 600;
                                      color: #000;
                                    "
                                  >
                                    ຊື່ ແລະ ນາມສະກຸນ: {{ myCustomer.name }}
                                    {{ myCustomer.surname }}
                                  </p>
                                  <p
                                    style="
                                      font-size: 16px;
                                      font-weight: 600;
                                      color: #000;
                                    "
                                  >
                                    ເບີໂທ: {{ myCustomer.tel }}
                                  </p>
                                  <p
                                    style="
                                      font-size: 16px;
                                      font-weight: 600;
                                      color: #000;
                                    "
                                  >
                                    ທີ່ຢູ່: {{ myCustomer.address }}
                                  </p>
                                </v-col>
                                <!-- <v-col
                    cols="12"
                    style="
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                  >
                    <v-btn @click="removeMyCustomer()">
                      ປ່ຽນລູກຄ້າ
                    </v-btn>
                  </v-col> -->
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-card-text>
                        <v-card-actions
                          cols="12"
                          class="px-4"
                          v-if="selectedCustomer"
                          style="
                            display: flex;
                            justify-content: center;
                            position: absolute;
                            bottom: 10px;
                            width: 100%;
                          "
                        >
                          <v-btn color="info" @click="removeMyCustomer()">
                            ປ່ຽນລູກຄ້າ
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-btn
                        :disabled="listItems?.length == 0"
                        style="width: 100%; color: #fff; border-radius: 5px"
                        color="error"
                        @click="ClearAllData"
                      >
                        ລົບທັງໝົດ
                      </v-btn>
                      <v-card style="height: auto">
                        <v-card-title>
                          <h6>
                            <span style="color: brown">{{ "#" }}</span>
                            &nbsp;ລາຍການຂາຍຄຳ
                          </h6>
                        </v-card-title>
                        <v-card-text
                          class="px-4 py-0"
                          style="overflow-y: auto; height: 55vh"
                        >
                          <div>
                            <br />
                            <div v-if="listItems?.length == 0">
                              <WidgetNoData
                                message="ບໍ່​ມີ​ລາຍການຂາຍ"
                                width="150"
                                height="150"
                              />
                            </div>
                            <v-row
                              v-else
                              class="px-4 py-1"
                              v-for="(item, index) in listItems"
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
                                  <div style="margin-left: 10px">
                                    <p
                                      style="
                                        font-size: 16px;
                                        color: #000;
                                        margin: 0;
                                      "
                                    >
                                      {{ item.name }} ({{ item.shape
                                      }}{{ item.shapeLine }})
                                    </p>
                                    <p
                                      style="
                                        font-size: 14px;
                                        color: #000;
                                        margin: 0;
                                      "
                                    >
                                      ນ້ຳໜັກ: {{ $formatnumber(item.weight) }}
                                      {{ item.weightType }}
                                    </p>
                                    <p
                                      style="
                                        font-size: 14px;
                                        color: #000;
                                        margin: 0;
                                      "
                                    >
                                      ລາຄາ/ຈໍາ​ນວນ:
                                      {{ $formatnumber(item.price) }}
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
                                    @click="
                                      SET_DECREMENT({ index, item }),
                                        SET_AMOUNT_ALL(item)
                                    "
                                    style="
                                      color: #000;
                                      cursor: pointer;
                                      margin-right: 4px;
                                    "
                                  >
                                    mdi-minus
                                  </v-icon>
                                  <p
                                    style="
                                      font-size: 18px;
                                      color: #000;
                                      margin: 0 8px;
                                    "
                                  >
                                    <b>{{ item.amount }}</b>
                                  </p>
                                  <v-icon
                                    class="icon ma-0"
                                    small
                                    @click="
                                      SET_INCREMENT({ index, item }),
                                        SET_AMOUNT_ALL(item)
                                    "
                                    style="
                                      color: #000;
                                      cursor: pointer;
                                      margin-left: 4px;
                                    "
                                  >
                                    mdi-plus
                                  </v-icon>
                                </div>
                              </v-col>
                            </v-row>
                          </div>
                        </v-card-text>
                        <v-card-text>
                          <v-row
                            style="display: flex; height: 100px"
                            class="mx-2"
                          >
                            <v-col cols="6" sm="3"
                              ><h3>ລາຄາລວມທັງໝົດ :</h3></v-col
                            >
                            <v-col cols="6" sm="9">
                              <h3>{{ $formatnumber(priceAll) }} ກີບ</h3></v-col
                            >
                          </v-row>
                        </v-card-text>
                        <v-card-actions>
                          <div
                            style="
                              justify-content: center;
                              position: absolute;
                              bottom: 10px;
                              width: 100%;
                            "
                          >
                            <v-btn
                              :disabled="
                                listItems?.length == 0 || !selectedCustomer
                              "
                              class="rounded-lg btn-pdf"
                              style="
                                width: 25%;
                                height: 50px;
                                color: white;
                                background: #e20303 !important;
                              "
                              @click="pdf()"
                            >
                              <!-- :loading="loadingPdf" -->

                              <v-icon>mdi-file-pdf-box</v-icon> PDF
                            </v-btn>
                            <v-btn
                              :disabled="
                                listItems?.length == 0 || !selectedCustomer
                              "
                              :loading="loadingPrint"
                              outlined
                              class="rounded-lg"
                              style="width: 25%; height: 50px"
                              @click="print()"
                            >
                              <v-icon>mdi-printer</v-icon> ພິມ
                            </v-btn>
                            <v-btn
                              :disabled="
                                listItems?.length == 0 || !selectedCustomer
                              "
                              style="
                                width: 45%;
                                height: 50px;
                                color: #fff;
                                border-radius: 5px;
                              "
                              color="success"
                              @click="comfirm"
                            >
                              ຢືນຢັນ
                            </v-btn>
                          </div>
                        </v-card-actions>
                      </v-card>
                    </v-col></v-row
                  >
                </v-list>
              </v-col>
            </v-row>
          </v-list>
        </div>
      </v-navigation-drawer>
    </v-row>
    <BuyAddCustomer
      ref="myCompAddCus"
      @selectMyCustomer="selectMyCustomer"
      @setLength="setLength"
    />
    <div style="display: none">
      <SellPrintSell
        :key="1"
        :myCus="myCustomer"
        :billNo="myBillOn"
        :currentDateTime="updateDateTime().currentDateTime"
        :currentDate="updateDateTime().currentDate"
        ref="myCompBill"
      />
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
      show: false,
      totalPrice: 0,
      loadingPDF: false,
      loadingPrint: false,
      myBillOn: "",
      page: 1,
      length: 0,
      limit: 10,
      amountGard: [],
      gotoPage: 0,
      rightDrawer: false,
      cartStore: false,
      multiGold: null,
      headersCus: [
        // {
        //   text: "ລຳດັບ",
        //   value: "no",
        //   width: "auto",
        //   class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-2",
        //   sortable: false,
        //   align: "center",
        // },
        {
          text: "ລູກຄ້າ",
          value: "name",
          width: "auto",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-2",
          sortable: false,
          align: "center",
        },
        // {
        //   text: "ເບີໂທ",
        //   value: "tel",
        //   width: "auto",
        //   class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
        //   align: "center",
        //   sortable: false,
        // },
        // {
        //   text: "ທີ່ຢູ່",
        //   value: "address",
        //   width: "auto",
        //   class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
        //   sortable: false,
        //   align: "center",
        // },
        {
          text: "ເລືອກ",
          value: "action",
          width: "auto",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          sortable: false,
          align: "center",
        },
      ],
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
      search: "",
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
        { text: "ປະເພດຮູບປະພັນ", value: "optionGole" },
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
          typwight: "ຫູນ",
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
    // ...mapState("buy", ["selectedCustomer", "myCustomer"]),
    ...mapState("customer", ["listCustomer"]),
    ...mapGetters("sellStore", ["listItems", "priceAll"]),
    ...mapState("sellStore", ["selectedCustomer", "myCustomer"]),
    ...mapState("gold", ["listGold"]),
    filterTable() {
      if (
        this.modelGold ||
        this.modelGoldType ||
        this.modelGoldLine ||
        this.modelGoldWeigt ||
        this.modelGoldWeightType
      ) {
        let g = this.listGold.filter(
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
        return this.listGold;
      }
    },
  },
  mounted() {
    this.myBillOn = this.generateRandomNumber(10);
    this.setHeader("ຂາຍອອກ");
    this.$store.commit("customer/SET_GOING_TO_BILL", "sell");
    this.setLength();
    this.filterTable.forEach((element) => {
      this.amountGard.push(1);
    });
    this.$store.commit("main/SET_HEADER_TITLE", "ຂາຍ");
  },

  watch: {
    listItems: function (val) {
      if (val.length == 0) {
        this.myBillOn = this.generateRandomNumber(10);
      }
    },
  },
  methods: {
    ...mapActions("main", ["setHeader"]),

    ...mapActions("sellStore", ["ClearAllData", "addOrUpdateItem"]),
    ...mapMutations("sellStore", [
      "SET_ITEMS",
      "SET_DECREMENT",
      "SET_INCREMENT",
      "SET_AMOUNT_ALL",
      "SET_CUSTOMER",
      "SET_CUSTOMER_BOOL",
      "SET_HISTORY_ITEMS",
    ]),
    plusAmount(index) {
      let amount = JSON.stringify(this.amountGard);
      amount = JSON.parse(amount);
      amount[index] += 1;
      this.amountGard = amount;
    },
    deleteAmount(index) {
      let amount = JSON.stringify(this.amountGard);
      amount = JSON.parse(amount);

      if (amount[index] > 1) {
        amount[index] -= 1;
        this.amountGard = amount;
      }
    },
    removeMyCustomer() {
      this.SET_CUSTOMER({});
      this.SET_CUSTOMER_BOOL(false);
    },
    NextPage() {
      this.gotoPage = this.page * this.limit - this.limit;
    },
    openAdd() {
      this.$refs.myCompAddCus.dialog = true;
    },
    selectMyCustomer(cus) {
      this.SET_CUSTOMER(cus);
      this.SET_CUSTOMER_BOOL(true);
    },
    setLength() {
      this.length = Math.ceil(this.listCustomer?.length / this.limit);
    },
    Next() {
      console.log(this.listItems);
      this.$router.push("/customer/");
    },
    myChildFuncPrint() {
      // this.loadingPrint = true
      this.$refs.myGlobalTable.OnPrintBill();
    },
    toggleRightDrawer() {
      this.rightDrawer = !this.rightDrawer;
    },
    onPlusData(item, index) {
      const newItem = {
        id: item.id,
        name: item.typGold,
        shape: item.optionGole,
        shapeLine: item.typeLine,
        weight: item.wight,
        weightType: item.typwight,
        price: item.sellGold * this.amountGard[index],
        amount: this.amountGard[index],
      };
      this.addOrUpdateItem(newItem);
    },
    ShowCart() {
      // console.log("test");
      this.cartStore = !this.cartStore;
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
            };
            this.SET_HISTORY_ITEMS(item);
            this.SET_CLEAR_ALL([]);
          } else {
            let item = {
              listItems: this.listItems,
              cus: this.myCustomer,
              billNo: this.myBillOn,
              date: this.updateDateTime().currentDateTime,
            };
            this.SET_HISTORY_ITEMS(item);
            this.SET_CLEAR_ALL([]);
            this.removeMyCustomer();
          }
        });
      } catch (error) {
        console.log(error);
      }
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
.btn-pdf {
  color: white;
  background: #e20303 !important;
}
.red-btn {
  background-color: red;
  color: #ffff;
}
.green-btn {
  background-color: rgb(16, 162, 16);
  color: #ffff;
}
</style>
