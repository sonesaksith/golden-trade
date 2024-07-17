<template>
  <div>
    <div class="d-flex" style="background-color: #DAA520; height: 57px">
      <div
        style="display: flex; align-items: center; cursor: pointer"
        @click="goBlack"
      >
        <v-icon large color="white darken-2"> mdi-chevron-left </v-icon>
        <p style="font-weight: 600; text-align: center; color: white;" class="ma-0">ຍ້ອນກັບ</p>
      </div>
      <v-spacer></v-spacer>
    </div>
    <div class="d-flex">
        <v-spacer></v-spacer>
      <div>
        <v-btn
          style="font-size: 14px; margin-top: 10px"
          class="rounded-lg ml-1 mr-1 btn-pdf"
          @click="OnPrintPdf()"
        >
          <v-icon>mdi-file-pdf-box</v-icon> &nbsp; PDF
        </v-btn>
      </div>
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
    </div>

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
      <!-- <v-card
        class="hide-on-mobile"
        style="margin-block: 40px; margin-inline: 10px"
        outlined
      >
        <v-card-title class="pa-2">
          <v-row class="mx-0">
            <v-col cols="12" md="6" sm="6" class="pb-0">
              <h4><u>ຮ້ານຄຳ.........</u></h4>
              <p style="font-size: 14px" class="ma-0">No: {{ billNo }}</p>
              <p style="font-size: 14px" class="ma-0">
                ວັນທີ: {{ currentDate }}
              </p>
              <p style="font-size: 14px" class="ma-0">ພະນັກງານ: Luna</p>
            </v-col>
            <v-col cols="12" md="6" sm="6" class="text-right">
              <p style="font-size: 14px" class="ma-0">
                {{ "." }}
              </p>
              <div
                style="
                  display: flex;
                  max-width: 300px;
                  height: 80px;
                  justify-content: center;
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
                    text-align: center;
                    font-size: 24px;
                    border-top-left-radius: 3px;
                    border-bottom-left-radius: 3px;
                  "
                >
                  ປ່ຽນ
                </div>
                <div
                  style="
                    font-weight: 600;
                    border: 1px solid gray;
                    width: 50%;
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
            </v-col>
            <v-col cols="12" class="py-0">
              <p style="font-size: 14px" class="ma-0">
                ລ/ຄ: ນ. ເພັດສະໝອນ/2095608229/Barcelona//A7XB9Z3
              </p>
            </v-col>
          </v-row>
        </v-card-title>
        <br />
        <v-card-title class="pa-2">
          <v-row class="mx-0">
            <v-col cols="8" md="10" sm="10" class="py-0">
              <p style="font-size: 14px" class="ma-0">ລາຍການຊື້ເຂົ້າ</p>
            </v-col>
            <v-col cols="4" md="2" sm="2" class="text-right py-0">
              <p style="font-size: 14px" class="ma-0">ເປັນເງິນ</p>
            </v-col>
            <v-col
              cols="3"
              md="2"
              sm="2"
              class="py-0"
              style="display: flex; align-items: center"
            >
              <p style="font-size: 15px; font-weight: 600" class="ma-0">
                [ຊື້ເຂົ້າ]
              </p>
            </v-col>
            <v-col cols="9" md="10" sm="10">
              <div class="dot-divider"></div>
            </v-col>

            <v-col cols="12">
              <v-row v-for="(n, index) in items" :key="index">
                <v-col cols="8" md="10" sm="10" class="text-left py-0">
                  <span style="font-size: 16px" class="ma-0"
                    >{{ index + 1 }}- {{ n?.shape ? "(" + n?.shape : ""
                    }}{{
                      n?.shapeLine ? n?.shapeLine + ")" : n?.shape ? ")" : ""
                    }}
                    {{ n.weight + n.weightType }}
                  </span>
                </v-col>
                <v-col cols="4" md="2" sm="2" class="text-right py-0">
                  <span style="font-size: 14px; font-weight: 400" class="ma-0">
                    {{ $formatnumber(n.price) }}
                  </span>
                </v-col>
                <v-col cols="12" class="pa-2">
                  <v-divider></v-divider>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="5" md="5" sm="5" class="text-left py-0">
              <span style="font-size: 16px; font-weight: 600" class="ma-0">
                ລາ​ຄາ​ລວມ:
              </span>
            </v-col>
            <v-col cols="7" md="7" sm="7" class="text-right py-0">
              <span style="font-size: 16px; font-weight: 600" class="ma-0">
                {{ $formatnumber(32100) }}
              </span>
            </v-col>
            <v-col cols="12" class="pa-2">
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12" class="text-left py-0">
              <span style="font-size: 16px" class="ma-0"
                >ລາຍ​ລະ​ອຽດ​ການ​ຊໍາ​ລະ​ເງິນ
              </span>
            </v-col>
            <v-col cols="6" md="6" sm="6" class="text-left py-0">
              <span style="font-size: 16px; font-weight: 600" class="ma-0">
                {{ $formatnumber(32100) }} x {{ $formatnumber2(750) }}
              </span>
            </v-col>
            <v-col cols="6" md="6" sm="6" class="text-right py-0">
              <span style="font-size: 16px; font-weight: 600" class="ma-0">
                {{ $formatnumber(32100 * 750) }} LAK
              </span>
            </v-col>

            <v-col cols="5" md="5" sm="5" class="text-left">
              <span style="font-size: 16px; font-weight: 600" class="ma-0">
                ຜູ້ກວດບິນ
              </span>
            </v-col>
            <v-col cols="7" md="7" sm="7" class="text-right">
              <span style="font-size: 16px; font-weight: 600" class="ma-0">
                {{ currentDateTime }}
              </span>
            </v-col>
          </v-row>
          <br />
          <br />
          <br />
        </v-card-title>
      </v-card> -->

      <v-card
        class="hide-on-mobile mx-auto"
        style="margin-block: 40px; margin-inline: 10px"
        max-width="1000"
        outlined
        v-if="listItems.length > 0"
      >
        <v-card-title class="pa-4">
          <div
            style="display: flex; justify-content: space-between; width: 100%"
            class="ma-0"
          >
            <div class="pb-0">
              <h4><u>ຮ້ານຄຳ.........</u></h4>
              <p style="font-size: 14px" class="ma-0">No: {{ billNo }}</p>
              <p style="font-size: 14px" class="ma-0">
                ວັນທີ: {{ currentDate }}
              </p>
              <p style="font-size: 14px" class="ma-0">ພະນັກງານ: {{ userinfo.username }}</p>
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
                ປ່ຽນ
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
              ລ/ຄ: ນ. ເພັດສະໝອນ/2095608229/Barcelona//A7XB9Z3
            </p>
          </div>
          <div
            style="display: flex; justify-content: space-between; width: 100%"
            class="ma-0"
          >
            <div class="py-0">
              <p style="font-size: 16px; font-weight: 600" class="ma-0">ລາຍການຊື້ເຂົ້າ</p>
            </div>
            <div class="text-right py-0">
              <p style="font-size: 16px; font-weight: 600" class="ma-0">ເປັນເງິນ</p>
            </div>
          </div>
          <!-- <div
            style="display: flex; justify-content: space-between; width: 100%"
            class="ma-0"
          >
            <div class="py-0">
              <p style="font-size: 15px; font-weight: 600" class="ma-0">
                [ຊື້ເຂົ້າ]
              </p>
            </div>
            <div class="dot-divider"></div>
          </div> -->
          <div
            v-for="(n, index) in listItems"
            :key="index"
            style="display: flex; flex-direction: column; width: 100%"
          >
            <div
              style="display: flex; justify-content: space-between; width: 100%"
              class="ma-0"
            >
              <div class="text-left py-0">
                <span style="font-size: 16px" class="ma-0"
                  >{{ index + 1 }}- {{ n.name }}
                  {{ n?.shape ? "(" + n?.shape : ""
                  }}{{
                    n?.shapeLine ? n?.shapeLine + ")" : n?.shape ? ")" : ""
                  }}
                  {{ n.weight + n.weightType }}
                  ຈໍາ​ນວນ: {{ n.amount }}
                </span>
              </div>
              <div class="text-right py-0">
                <span style="font-size: 16px; font-weight: 400" class="ma-0">
                  {{ $formatnumber(n.price * n.amount) }}
                </span>
              </div>
            </div>
            <v-divider></v-divider>
          </div>
          <div
            style="display: flex; justify-content: space-between; width: 100%"
          >
            <div class="text-left py-0">
              <span style="font-size: 16px; font-weight: 600" class="ma-0">
                ລາ​ຄາ​ລວມ:
              </span>
            </div>
            <div class="text-right py-0">
              <span style="font-size: 16px; font-weight: 600" class="ma-0">
                {{ $formatnumber(totalPrice) }} LAK
              </span>
            </div>
          </div>
          <div
            style="display: flex; justify-content: space-between; width: 100%"
          >
            <div class="text-left py-0">
              <span style="font-size: 16px; font-weight: 600" class="ma-0">
                ຫັກຄ່າຫຼູ້ຍຫ້ຽນ:
              </span>
            </div>
            <div class="text-right py-0">
              <span style="font-size: 16px; font-weight: 600" class="ma-0">
                {{ $formatnumber(totalLost) }} LAK
              </span>
            </div>
          </div>
          <div
            style="display: flex; justify-content: space-between; width: 100%"
          >
            <div class="text-left py-0">
              <span style="font-size: 16px; font-weight: 600" class="ma-0">
                ລວມເປັນເງິນທັງໝົດ:
              </span>
            </div>
            <div class="text-right py-0">
              <span style="font-size: 16px; font-weight: 600" class="ma-0">
                {{ $formatnumber(totalPayment) }} LAK
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
          <div
            style="display: flex; justify-content: space-between; width: 100%"
          >
            <div class="text-left">
              <span style="font-size: 16px; font-weight: 600" class="ma-0">
                ຜູ້ກວດບິນ
              </span>
            </div>
            <div class="text-right">
              <span style="font-size: 16px; font-weight: 600" class="ma-0">
                {{ currentDateTime }}
              </span>
            </div>
          </div>
        </v-card-title>
      </v-card>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import html2pdf from "html2pdf.js";
import secureStorage from "~/plugins/secure-storage";
export default {
  data() {
    return {
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
      billNo: "",
      currentDateTime: "",
      currentDate: "",
      totalPrice: 0,
      totalAmount: 0,
      totalLost: 0,
      totalPayment: 0,
      data: [],
      userinfo: [],
    };
  },
  mounted() {
    this.userinfo = secureStorage.getItem("userinfo");
    this.billNo = this.generateRandomNumber(10);
    this.updateDateTime();
    this.listItems.forEach((item) => {
      this.totalPrice += parseInt(item.price * item.amount, 10);
      this.totalAmount += item.amount;
      this.totalLost += parseInt(item.lost);
    });
    this.totalPayment = (this.totalPrice - this.totalLost)
    if (this.listItems.length == 0) {
        this.$router.replace("/buy/");
    }
  },
  watch: {},
  computed: {
    ...mapGetters("buy", ["listItems"]),
  },
  methods: {
    async OnPrintBill() {
      try {
        if (this.listItems.length > 0) {
          const SetPage = `
              @media print {
                @page {
                  margin-top: 0.5cm;
                  margin-bottom: 0.5cm;
                  margin-left: 0.5cm;
                  margin-right: 0.5cm;
                  padding: 0;
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
    async OnPrintPdf() {
      try {
        if (this.listItems.length > 0) {
          const element = this.$refs.cardbill;
          const SetPage = `
              @media print {
                @page {
                  margin-top: 0.5cm;
                  margin-bottom: 0.5cm;
                  margin-left: 0.5cm;
                  margin-right: 0.5cm;
                  padding: 0;
                }
              }
              body {
                font-family: 'Noto Sans Lao', 'Phetsarath OT','Saysettha OT','Saysettha Lao';
              }
            `;
          const style = document.createElement("style");
          style.type = "text/css";
          style.innerHTML = SetPage;
          document.head.appendChild(style);

          const opt = {
            margin: 0.2,
            filename: "cardbill.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: this.setSty },
          };

          html2pdf()
            .set(opt)
            .from(element)
            .save()
            .then(() => {
              document.head.removeChild(style);
            });
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
      } catch (error) {
        console.log(error);
      }
    },
    goBlack() {
      this.$router.replace("/buy/");
    },
  },
};
</script>
<style scoped>
@media (max-width: 700px) {
  .hide-on-mobile {
    /* display: none; */
    margin: 0;
  }
}
.btn-pdf {
  color: white;
  border-style: solid;
  border-color: #e20303;
  background: #e20303 !important;
}
.dot-divider {
  width: 90%;
  margin-top: 16px;
  height: 4px;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="4" height="4"><rect width="1" height="1" fill="black"/></svg>')
    repeat-x;
}
</style>
