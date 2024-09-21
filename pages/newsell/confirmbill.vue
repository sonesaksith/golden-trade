<template>
  <div>
    <NewsellBill :key="2" ref="myBillSell" v-show="false" />
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="8">
          <v-card style="border-radius: 10px; height: 100%">
            <v-card-text>
              <div>
                <div
                  ref="cardbill"
                  id="bill"
                  style="
                    font-family: 'Noto Sans Lao', 'Phetsarath OT',
                      'Saysettha OT', 'Saysettha Lao';
                  "
                >
                  <style>
                    @media print {
                      @page {
                        margin-top: 0.5 cm;
                        margin-bottom: 0.5 cm;
                        margin-left: 0.5 cm;
                        margin-right: 0.5 cm;
                        padding: 0;
                      }
                    }
                  </style>
                  <v-card
                    class="hide-on-mobile mx-auto"
                    style="margin-block: 40px; margin-inline: 10px"
                    max-width="1000"
                    outlined
                    v-if="buyInfoList"
                  >
                    <v-card-title class="pa-4">
                      <div
                        style="
                          display: flex;
                          justify-content: space-between;
                          width: 100%;
                        "
                        class="ma-0"
                      >
                        <div class="pb-0">
                          <h4><u>ຮ້ານຄຳ ຫວຽດສະຫວັນ</u></h4>
                          <p style="font-size: 14px" class="ma-0">No: -</p>
                          <p style="font-size: 14px" class="ma-0">
                            ວັນທີ: {{ $FormatDateTime(curDate) }}
                          </p>
                          <p style="font-size: 14px" class="ma-0">
                            ພະນັກງານ: {{ userInfo?.user_name }}
                            {{ userInfo?.user_surname }}
                          </p>
                        </div>
                        <div
                          style="
                            display: flex;
                            justify-content: right;
                            width: 300px;
                            min-width: 200px;
                          "
                        >
                          <div
                            style="
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              font-weight: 600;
                              border: 1px solid gray;
                              width: 50%;
                              height: 80px;
                              text-align: center;
                              font-size: 24px;
                              border-top-left-radius: 3px;
                              border-bottom-left-radius: 3px;
                            "
                          >
                            {{ boxStatus }}
                            <!-- <div v-if="statusTran === 'ປະຫວັດຊື້'">ຊື້</div>
                        <div v-if="statusTran === 'ປະຫວັດຂາຍ'">ຂາຍ</div>
                        <div v-if="statusTran === 'ປະຫວັດຂາຍ'">ເທີນ</div> -->
                          </div>
                          <div
                            style="
                              font-weight: 600;
                              border: 1px solid gray;
                              width: 50%;
                              height: 80px;
                              text-align: left;
                              font-size: 14px;
                              border-top-right-radius: 3px;
                              border-bottom-right-radius: 3px;
                              padding-left: 10px;
                            "
                          >
                            No:
                          </div>
                        </div>
                      </div>
                      <div style="width: 100%">
                        <p style="font-size: 14px" class="ma-0">
                          ລ/ຄ:
                          {{ cusinfo?.name + " " + cusinfo?.surname }} |
                          {{ cusinfo?.tel }}
                        </p>
                      </div>
                      <div
                        style="
                          display: flex;
                          justify-content: space-between;
                          width: 100%;
                        "
                        class="ma-0"
                      >
                        <div class="py-0" style="width: 45%">
                          <p
                            style="font-size: 16px; font-weight: 600"
                            class="ma-0"
                          >
                            {{ listName }}
                          </p>
                        </div>
                        <div style="width: 10%; text-align: center">
                          <p
                            style="font-size: 16px; font-weight: 600"
                            class="ma-0"
                          >
                            ຈຳນວນ
                          </p>
                        </div>
                        <div
                          class="text-right py-0"
                          style="width: 45%; text-align: end"
                        >
                          <p
                            style="font-size: 16px; font-weight: 600"
                            class="ma-0"
                          >
                            ເປັນເງິນ
                          </p>
                        </div>
                      </div>
                      <div
                        v-if="statusTran === 'ປະຫວັດເທີນ'"
                        style="width: 100%"
                      >
                        <div
                          style="
                            display: flex;
                            justify-content: space-between;
                            width: 100%;
                          "
                          class="ma-0"
                        >
                          <div class="py-0">
                            <p
                              style="font-size: 15px; font-weight: 600"
                              class="ma-0"
                            >
                              [ຂາຍ]
                            </p>
                          </div>
                          <div class="dot-divider"></div>
                        </div>
                        <!-- detail buy -->
                        <div
                          v-for="(n, index) in listCartSell"
                          :key="index + 'ຂາຍ'"
                          style="
                            display: flex;
                            flex-direction: column;
                            width: 100%;
                          "
                        >
                          <div
                            style="
                              display: flex;
                              justify-content: space-between;
                              width: 100%;
                            "
                            class="ma-0"
                          >
                            <div class="text-left py-0" style="width: 45%">
                              <span style="font-size: 16px" class="ma-0"
                                >{{ index + 1 }}. | {{ n.lai_name }} |
                                {{ n?.real_weight }} g
                              </span>
                            </div>
                            <div style="text-align: center; width: 10%">
                              {{ n?.countItem }}
                            </div>

                            <div
                              class="text-right py-0"
                              style="width: 45%; text-align: end"
                            >
                              <span
                                style="font-size: 16px; font-weight: 400"
                                class="ma-0"
                              >
                                <div>
                                  {{ $formatnumber(n.price * n?.countItem) }}
                                </div>
                              </span>
                            </div>
                          </div>
                          <v-divider></v-divider>
                        </div>
                        <div
                          style="
                            display: flex;
                            justify-content: space-between;
                            width: 100%;
                          "
                          class="ma-0"
                        >
                          <div class="py-0">
                            <p
                              style="font-size: 15px; font-weight: 600"
                              class="ma-0"
                            >
                              [ຊື້]
                            </p>
                          </div>
                          <div class="dot-divider"></div>
                        </div>
                        <!-- detail buy -->
                        <div
                          v-for="(n, index) in listCartBuy"
                          :key="index + 'ຊື້'"
                          style="
                            display: flex;
                            flex-direction: column;
                            width: 100%;
                          "
                        >
                          <div
                            style="
                              display: flex;
                              justify-content: space-between;
                              width: 100%;
                            "
                            class="ma-0"
                          >
                            <div class="text-left py-0" style="width: 45%">
                              <span style="font-size: 16px" class="ma-0"
                                >{{ index + 1 }}. | {{ n.purity }} |
                                {{ n?.real_weight }} g
                              </span>
                            </div>
                            <div style="text-align: center; width: 10%">1</div>
                            <div
                              class="text-right py-0"
                              style="width: 45%; text-align: end"
                            >
                              <span
                                style="font-size: 16px; font-weight: 400"
                                class="ma-0"
                              >
                                <div>
                                  {{ $formatnumber(n.price) }}
                                </div>
                              </span>
                            </div>
                          </div>
                          <v-divider></v-divider>
                        </div>
                        <!-- tueam -->
                        <div
                          class="d-flex pa-2"
                          style="justify-content: flex-end; display: flex"
                        >
                          <div>
                            <span v-if="sumListCartSell - sumListCartBuy > 0"
                              >( ຕື່ມ )
                            </span>
                            <span v-else>( ທອນ ) </span>
                          </div>
                          &nbsp;
                          <div>
                            <span style="border: solid 1px black; padding: 2px"
                              >{{
                                $formatnumber(
                                  sumListCartSell - sumListCartBuy < 0
                                    ? (sumListCartSell - sumListCartBuy) * -1
                                    : sumListCartSell - sumListCartBuy
                                )
                              }}
                            </span>
                          </div>
                        </div>
                        <v-divider></v-divider>
                      </div>
                      <div
                        v-if="statusTran === 'ປະຫວັດຂາຍ'"
                        style="width: 100%"
                      >
                        <div
                          style="
                            display: flex;
                            justify-content: space-between;
                            width: 100%;
                          "
                          class="ma-0"
                        >
                          <div class="py-0">
                            <p
                              style="font-size: 15px; font-weight: 600"
                              class="ma-0"
                            >
                              {{ textName }}
                            </p>
                          </div>
                          <div class="dot-divider"></div>
                        </div>
                        <!-- detail buy -->
                        <div
                          v-for="(n, index) in listCartSell"
                          :key="index + '0kp'"
                          style="
                            display: flex;
                            flex-direction: column;
                            width: 100%;
                          "
                        >
                          <div
                            style="
                              display: flex;
                              justify-content: space-between;
                              width: 100%;
                            "
                            class="ma-0"
                          >
                            <div class="text-left py-0" style="width: 45%">
                              <span
                                style="font-size: 16px"
                                class="ma-0"
                                v-if="statusTran === 'ປະຫວັດຂາຍ'"
                                >{{ index + 1 }}. | {{ n.lai_name }} |
                                {{ n?.real_weight }} g
                              </span>
                            </div>
                            <div style="text-align: center; width: 10%">
                              <span
                                style="font-size: 16px"
                                class="ma-0"
                                v-if="statusTran === 'ປະຫວັດຂາຍ'"
                              >
                                {{ n?.countItem }}
                              </span>
                            </div>

                            <div
                              class="text-right py-0"
                              style="width: 45%; text-align: end"
                            >
                              <span
                                style="font-size: 16px; font-weight: 400"
                                class="ma-0"
                              >
                                <div v-if="statusTran === 'ປະຫວັດຂາຍ'">
                                  {{ $formatnumber(n.price * n?.countItem) }}
                                </div>
                              </span>
                            </div>
                          </div>
                          <v-divider></v-divider>
                        </div>
                      </div>
                      <div
                        v-if="statusTran === 'ປະຫວັດຊື້'"
                        style="width: 100%"
                      >
                        <div
                          style="
                            display: flex;
                            justify-content: space-between;
                            width: 100%;
                          "
                          class="ma-0"
                        >
                          <div class="py-0">
                            <p
                              style="font-size: 15px; font-weight: 600"
                              class="ma-0"
                            >
                              {{ textName }}
                            </p>
                          </div>
                          <div class="dot-divider"></div>
                        </div>
                        <!-- detail buy -->
                        <div
                          v-for="(n, index) in listCartBuy"
                          :key="index + 'ຊື້'"
                          style="
                            display: flex;
                            flex-direction: column;
                            width: 100%;
                          "
                        >
                          <div
                            style="
                              display: flex;
                              justify-content: space-between;
                              width: 100%;
                            "
                            class="ma-0"
                          >
                            <div class="text-left py-0" style="width: 45%">
                              <span
                                style="font-size: 16px"
                                class="ma-0"
                                v-if="statusTran === 'ປະຫວັດຊື້'"
                                >{{ index + 1 }}. | {{ n.purity }} |
                                {{ n?.real_weight }} g
                              </span>
                            </div>
                            <div style="text-align: center; width: 10%">
                              <span
                                style="font-size: 16px"
                                class="ma-0"
                                v-if="statusTran === 'ປະຫວັດຊື້'"
                              >
                                1
                              </span>
                            </div>

                            <div
                              class="text-right py-0"
                              style="width: 45%; text-align: end"
                            >
                              <span
                                style="font-size: 16px; font-weight: 400"
                                class="ma-0"
                              >
                                <div v-if="statusTran === 'ປະຫວັດຂາຍ'">
                                  {{ $formatnumber(n.price) }}
                                </div>
                              </span>
                            </div>
                          </div>
                          <v-divider></v-divider>
                        </div>
                      </div>
                      <v-divider></v-divider>

                      <div
                        style="
                          display: flex;
                          justify-content: space-between;
                          width: 100%;
                        "
                      >
                        <div class="text-left py-0">
                          <span
                            style="font-size: 16px; font-weight: 600"
                            class="ma-0"
                          >
                            ລາ​ຄາ​ລວມ:
                          </span>
                        </div>
                        <div class="text-right py-0">
                          <span
                            style="font-size: 16px; font-weight: 600"
                            class="ma-0"
                          >
                            <div v-if="statusTran === 'ປະຫວັດຊື້'">
                              {{ $formatnumber(sumListCartBuy) }} LAK
                            </div>
                            <div v-if="statusTran === 'ປະຫວັດຂາຍ'">
                              {{ $formatnumber(sumListCartSell) }} LAK
                            </div>
                            <div v-if="statusTran === 'ປະຫວັດເທີນ'">
                              <div>
                                ຂາຍ :
                                {{ $formatnumber(sumListCartSell) }}
                                LAK
                              </div>
                              <div>
                                ຊື້ :
                                {{ $formatnumber(sumListCartBuy) }}
                                LAK
                              </div>
                            </div>
                          </span>
                        </div>
                      </div>

                      <!-- <div class="text-left py-0">
              <span style="font-size: 16px" class="ma-0"
                >ລາຍ​ລະ​ອຽດ​ການ​ຊໍາ​ລະ​ເງິນ
              </span>
            </div>
            <div
              style="display: flex; justify-content: space-between; width: 100%"
            >
              <div class="text-left py-0">
                <span style="font-size: 16px; font-weight: 600" class="ma-0">
                  {{ $formatnumber(32100) }} x {{ $formatnumber2(750) }}
                </span>
              </div>
              <div class="text-right py-0">
                <span style="font-size: 16px; font-weight: 600" class="ma-0">
                  {{ $formatnumber(totalPrice) }} LAK
                </span>
              </div>
            </div> -->
                    </v-card-title>
                  </v-card>
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      width: 100%;
                    "
                  >
                    <div class="text-left">
                      <span
                        style="font-size: 16px; font-weight: 600"
                        class="ma-0"
                      >
                        ຜູ້ກວດບິນ
                      </span>
                    </div>
                    <div class="text-right">
                      <span
                        style="font-size: 16px; font-weight: 600"
                        class="ma-0"
                      >
                        {{ $FormatDateTime(buyInfoList?.create_at) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card style="height: 100%">
            <v-form ref="form" v-model="valid">
              <v-container>
                <v-text-field
                  outlined
                  dense
                  v-model="cusinfo.tel"
                  label="ເບີໂທ"
                ></v-text-field>
                <p
                  v-if="isMatchingCus && !selectedCus"
                  @click="onSelectExistCus()"
                  class="primary--text"
                >
                  ມີລູກຄ້ານີ້ຢູ່ແລ້ວ! ຕ້ອງການເລືອກບໍ່?
                </p>
                <v-text-field
                  outlined
                  dense
                  v-model="cusinfo.name"
                  label="ຊື່"
                ></v-text-field>
                <v-text-field
                  outlined
                  dense
                  v-model="cusinfo.surname"
                  label="ນາມສະກຸນ"
                ></v-text-field>
                <v-textarea
                  outlined
                  dense
                  v-model="cusinfo.address"
                  label="ທີ່ຢູ່"
                ></v-textarea>
                <v-btn
                  v-if="!selectedCus"
                  block
                  color="primary"
                  :loading="addingCus"
                  :disabled="addingCus"
                  @click="onAdd()"
                  >ເພີ່ມລູກຄ້າ</v-btn
                >
                <div class="d-flex justify-space-between" v-else>
                  <v-btn
                    :loading="isCreatingTransaction"
                    :disabled="isCreatingTransaction"
                    style="width: 45%"
                    color="primary"
                    @click="onConfirm()"
                  >
                    ຢືນຢັນບິນ
                  </v-btn>
                  <v-btn
                    :loading="isCreatingTransaction"
                    :disabled="isCreatingTransaction"
                    style="width: 45%"
                    color="error"
                    @click="onChangeCus()"
                    >ປ່ຽນລູກຄ້າ</v-btn
                  >
                </div>
              </v-container>
            </v-form>
          </v-card>
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
      curDate: new Date(),
      userInfo: {},
      dialog: false,
      Title: "",
      boxStatus: "",
      listName: "",
      isMatchingCus: false,
      textName: "",
      cusinfo: { tel: "", name: "", surname: "", address: "" },
      valid: false,
      selectedCus: false,
      isCreatingTransaction: false,
      addingCus: false,
      askPrintBillDialog: false,
      dataRate: {},
    };
  },
  async mounted() {
    await this.GetCus();
    this.dataRate = secureStorage.getItem("rate");
    this.userInfo = secureStorage.getItem("userinfo");

    if (this.statusTran === "ປະຫວັດຊື້") {
      (this.Title = "ລາຍລະອຽດຊື້ເຂົ້າ"),
        (this.boxStatus = "ຊື້"),
        (this.listName = "ລາຍການຊື້ເຂົ້າ"),
        (this.textName = "[ຊື້ເຂົ້າ]");
    }
    if (this.statusTran === "ປະຫວັດຂາຍ") {
      (this.Title = "ລາຍລະອຽດຂາຍ"),
        (this.boxStatus = "ຂາຍ"),
        (this.listName = "ລາຍການຂາຍ"),
        (this.textName = "[ຂາຍ]");
    }
    if (this.statusTran === "ປະຫວັດເທີນ") {
      (this.Title = "ລາຍລະອຽດເທີນ"),
        (this.boxStatus = "ເທີນ"),
        (this.listName = "ລາຍການເທີນ"),
        (this.textName = "[ເທີນ]");
    }
  },
  watch: {
    "cusinfo.tel": function (newVal, oldVal) {
      const found = this.cusData.some(
        (customer) => customer.customer_tel === newVal
      );

      this.isMatchingCus = found;

      console.log(`Matching customer: ${this.isMatchingCus}`);
    },
    statusTran: function (val) {
      if (val === "ປະຫວັດຊື້") {
        this.Title = "ລາຍລະອຽດຊື້ເຂົ້າ";
        this.boxStatus = "ຊື້";
        this.listName = "ລາຍການຊື້ເຂົ້າ";
        this.textName = "[ຊື້ເຂົ້າ]";
      }
      if (val === "ປະຫວັດຂາຍ") {
        this.Title = "ລາຍລະອຽດຂາຍ";
        this.boxStatus = "ຂາຍ";
        this.listName = "ລາຍການຂາຍ";
        this.textName = "[ຂາຍ]";
      }
      if (val === "ປະຫວັດເທີນ") {
        this.Title = "ລາຍລະອຽດເທີນ";
        this.boxStatus = "ເທີນ";
        this.listName = "ລາຍການເທີນ";
        this.textName = "[ເທີນ]";
      }
    },
  },
  computed: {
    ...mapState("newsell", [
      "buyInfoList",
      "previewBill",
      "statusTran",
      "listCartBuy",
      "listCartSell",
      "cusData",
    ]),
    ...mapState("customer", ["selectingCus"]),
    ...mapGetters("newsell", [
      "sumListCartBuy",
      "sumListCartSell",
      "sumListCartAll",
      "diff",
      "sumSellRealWeight",
      "sumBuyRealWeight",
      ,
    ]),
  },
  methods: {
    ...mapActions("newsell", [
      "TurnProduct",
      "SellProduct",
      "BuyProduct",
      "GetCus",
    ]),
    ...mapActions("gold", ["GetGolds"]),
    ...mapActions("customer", ["createCustomer"]),
    onChangeCus() {
      this.selectedCus = false;
      this.cusinfo = { tel: "", name: "", surname: "", address: "" };
    },
    onSelectExistCus() {
      const existData = this.cusData.filter(
        (customer) => customer.customer_tel === this.cusinfo.tel
      )[0];

      const newData = JSON.parse(JSON.stringify(existData));
      this.cusinfo.name = newData.customer_name;
      this.cusinfo.surname = newData.customer_surname;
      this.cusinfo.tel = newData.customer_tel;
      this.cusinfo.address = newData.customer_address;
      this.selectedCus = true;
      this.$store.commit("customer/SET_SELECTING_CUSTOMER", newData);
    },
    async onAdd() {
      if (this.$refs.form.validate()) {
        this.addingCus = true;
        try {
          const resp = await this.createCustomer(this.cusinfo);
          if (resp.status == 201 && resp.data.msg == "success") {
            this.$store.commit(
              "customer/SET_SELECTING_CUSTOMER",
              resp?.data?.resultData
            );
            const newData = JSON.parse(JSON.stringify(resp?.data?.resultData));
            this.cusinfo.name = newData.customer_name;
            this.cusinfo.surname = newData.customer_surname;
            this.cusinfo.tel = newData.customer_tel;
            this.cusinfo.address = newData.customer_address;
            this.selectedCus = true;
            this.$swal({
              toast: true,
              text: "ເພີ່ມຂໍ້ມູນລຸກຄ້າສຳເລັດ!",
              type: "success",
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
              position: "top-end",
            });
            // this.$refs.form.reset();
            this.dialog = false;
          } else {
            this.$swal({
              toast: true,
              text: resp.data.message,
              type: "warning",
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
              position: "top-end",
            });
          }
        } catch (error) {
          this.$swal({
            toast: true,
            text: error.response?.data.message,
            type: "warning",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
          });
        } finally {
          this.addingCus = false;
        }
      }
    },
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
    onCloseConfirm() {
      this.getGolds();
      this.$refs.myBillSell.OnPrintBill();

      this.$store.commit("customer/SET_SELECTING_CUSTOMER", {});
      this.$store.commit("newsell/CLEAR_LIST_CART_SELL");
      this.$store.commit("newsell/CLEAR_LIST_CART_BUY");
      this.askPrintBillDialog = false;
      this.$router.go(-1);
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
            rateId: this.dataRate.rate_id,
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
            rateId: this.dataRate.rate_id,
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
          this.$refs.myBillSell.statusTran = "ປະຫວັດຂາຍ";
          const body = {
            cusId: this.selectingCus.customer_id,
            srealTotalWeight: this.sumSellRealWeight,
            rateId: this.dataRate.rate_id,
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
