<template>
  <div>
    <v-dialog v-model="dialog" persistent width="600px">
      <v-card style="border-radius: 10px">
        <!-- <v-card-title style="justify-content: center; align-items: center">
          <span>ລາຍລະອຽດການຂາຍ</span>
        </v-card-title> -->
        <v-card-title style="background-color: #e7e6e6">
          <div
            style="
              display: flex;
              width: 100%;
              align-items: center;
              justify-content: center;
            "
          >
            <div style="display: flex; align-items: center">
              <v-icon large color="grey">mdi-storefront-plus-outline</v-icon>
              <h4 class="mx-2">
                {{ Title }}
              </h4>
            </div>
            <v-spacer></v-spacer>
            <div
              style="
                border-radius: 100%;
                width: 40px;
                height: 40px;
                background-color: white;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <v-icon @click="dialog = false" large color="grey"
                >mdi-close</v-icon
              >
            </div>
          </div>
        </v-card-title>
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
                        ວັນທີ: {{ updateDateTime().currentDate }}
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
                    <div class="py-0">
                      <p style="font-size: 16px; font-weight: 600" class="ma-0">
                        {{ listName }}
                      </p>
                    </div>
                    <div class="text-right py-0">
                      <p style="font-size: 16px; font-weight: 600" class="ma-0">
                        ເປັນເງິນ
                      </p>
                    </div>
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
                      <p style="font-size: 15px; font-weight: 600" class="ma-0">
                        {{ textName }}
                      </p>
                    </div>
                    <div class="dot-divider"></div>
                  </div>
                  <!-- detail buy -->
                  <div
                    v-for="(n, index) in buyInfoList?.list_detail"
                    :key="index"
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
                      <div class="text-left py-0">
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
                      <div class="text-right py-0">
                        <span
                          style="font-size: 16px; font-weight: 400"
                          class="ma-0"
                        >
                          <div v-if="statusTran === 'ປະຫວັດຊື້'">
                            {{ $formatnumber(n.price) }}
                          </div>
                          <div v-if="statusTran === 'ປະຫວັດຂາຍ'">
                            {{ $formatnumber(n.price_lai) }}
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
                      </span>
                    </div>
                  </div>

                  <v-divider></v-divider>
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
                    {{ updateDateTime().currentDateTime }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div>
            <v-btn
              outlined
              style="font-size: 14px; margin-top: 10px"
              class="rounded-lg ml-1 mr-1"
              @click="OnPrintBill()"
            >
              <v-icon>mdi-printer</v-icon> &nbsp; ພິມ
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    statusTran: { type: String, required: true },
  },
  data() {
    return {
      dialog: false,
      Title: "",
      boxStatus: "",
      listName: "",
      textName: "",
    };
  },
  mounted() {
    // v-if="statusTran === 'ປະຫວັດຊື້'"
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
  },
  computed: {
    ...mapState("historyStore", ["buyInfoList"]),
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
