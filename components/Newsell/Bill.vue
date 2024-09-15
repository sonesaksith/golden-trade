<template>
  <div>
    <div>
      <v-card style="border-radius: 10px">
        <v-card-text>
          <div>
            <div
              ref="cardbill"
              id="bill"
              style="
                font-family: 'Noto Sans Lao', 'Phetsarath OT', 'Saysettha OT',
                  'Saysettha Lao';
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
                      <p style="font-size: 14px" class="ma-0">
                        No: {{ buyInfoList?.bill_number }}
                      </p>
                      <p style="font-size: 14px" class="ma-0">
                        ວັນທີ: {{ $FormatDateTime(buyInfoList?.create_at) }}
                      </p>
                      <p style="font-size: 14px" class="ma-0">
                        ພະນັກງານ: {{ buyInfoList?.seller_info?.user_name }}
                        {{ buyInfoList?.seller_info?.user_surname }}
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
                        <div v-if="statusTran === 'ປະຫວັດເທີນ'">ເທີນ</div> -->
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
                      {{
                        buyInfoList?.customer_info?.customer_name +
                        " " +
                        buyInfoList?.customer_info?.customer_surname
                      }}/{{ buyInfoList?.customer_info?.customer_tel }}/{{
                        buyInfoList?.customer_info?.customer_address
                      }}
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
                      <p style="font-size: 16px; font-weight: 600" class="ma-0">
                        {{ listName }}
                      </p>
                    </div>
                    <div style="width: 10%; text-align: center">
                      <p style="font-size: 16px; font-weight: 600" class="ma-0">
                        ຈຳນວນ
                      </p>
                    </div>
                    <div
                      class="text-right py-0"
                      style="width: 45%; text-align: end"
                    >
                      <p style="font-size: 16px; font-weight: 600" class="ma-0">
                        ເປັນເງິນ
                      </p>
                    </div>
                  </div>
                  <div v-if="statusTran === 'ປະຫວັດເທີນ'" style="width: 100%">
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
                      v-for="(n, index) in buyInfoList?.list_sell"
                      :key="index + 'ຂາຍ'"
                      style="display: flex; flex-direction: column; width: 100%"
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
                          {{ n?.quantity }}
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
                              {{ $formatnumber(n.price) }}
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
                      v-for="(n, index) in buyInfoList?.list_buy"
                      :key="index + 'ຊື້'"
                      style="display: flex; flex-direction: column; width: 100%"
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
                        <span v-if="buyInfoList?.diff > 0">( ຕື່ມ ) </span>
                        <span v-else>( ທອນ ) </span>
                      </div>
                      &nbsp;
                      <div>
                        <span style="border: solid 1px black; padding: 2px"
                          >{{
                            $formatnumber(
                              buyInfoList?.diff < 0
                                ? buyInfoList?.diff * -1
                                : buyInfoList?.diff
                            )
                          }}
                        </span>
                      </div>
                    </div>
                    <v-divider></v-divider>
                  </div>
                  <div v-if="statusTran !== 'ປະຫວັດເທີນ'" style="width: 100%">
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
                      v-for="(n, index) in buyInfoList?.list_detail"
                      :key="index + 'ເທີນ'"
                      style="display: flex; flex-direction: column; width: 100%"
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
                            {{ n?.quantity }}
                          </span>
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
                            <div v-if="statusTran === 'ປະຫວັດຊື້'">
                              {{ $formatnumber(n.price) }}
                            </div>
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
                          {{ $formatnumber(buyInfoList?.total_price) }} LAK
                        </div>
                        <div v-if="statusTran === 'ປະຫວັດຂາຍ'">
                          {{ $formatnumber(buyInfoList?.final_price) }} LAK
                        </div>
                        <div v-if="statusTran === 'ປະຫວັດເທີນ'">
                          <div>
                            ຂາຍ :
                            {{ $formatnumber(buyInfoList?.sell_final_price) }}
                            LAK
                          </div>
                          <div>
                            ຊື້ :
                            {{ $formatnumber(buyInfoList?.buy_total_price) }}
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
                  <span style="font-size: 16px; font-weight: 600" class="ma-0">
                    ຜູ້ກວດບິນ
                  </span>
                </div>
                <div class="text-right">
                  <span style="font-size: 16px; font-weight: 600" class="ma-0">
                    {{ $FormatDateTime(buyInfoList?.create_at) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {},
  data() {
    return {
      dialog: false,
      Title: "",
      boxStatus: "",
      listName: "",
      textName: "",
      statusTran: "",
    };
  },
  mounted() {
    // v-if="statusTran === 'ປະຫວັດຊື້'"
    // ປະຫວັດເທີນ'
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
    ...mapState("newsell", ["buyInfoList"]),
  },
  methods: {
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
    async OnPrintBill() {
      try {
        if (this.buyInfoList) {
          const SetPage = `
                @media print {
                  @page {
                    margin-top: 0.5cm;
                    margin-bottom: 0.5cm;
                    margin-left: 0.5cm;
                    margin-right: 0.5cm;
                    padding: 0;
                    size: ${this.setSty};
                  }
                }
                body {
                  font-family: 'Noto Sans Lao', 'Phetsarath OT','Saysettha OT','Saysettha Lao';
                }
              `;
          var divToPrint = this.$refs.cardbill;
          this.$Printd.print(divToPrint, [SetPage]);
          console.log("aaaaa");
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
      }
    },
  },
};
</script>
