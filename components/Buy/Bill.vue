<template>
  <div>
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
              <h4><u>ຮ້ານຄຳ ຫວຽດສະຫວັນ</u></h4>
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
              ລ/ຄ: {{myCus.name + myCus.surname}}/{{myCus.tel}}/{{ myCus.address }}
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
  props: {
    myCus: {
      type: Object,
      required: true,
    },
    billNo: { type: String, required: true },

    totalPrice: { type: Number, required: true },
    totalLost: { type: Number, required: true },
    totalPayment: { type: Number, required: true },
    currentDateTime: { type: String, required: true },
    currentDate: { type: String, required: true },
  },
  data() {
    return {
      userinfo: [],
      setSty: "portrait",
    };
  },
  mounted() {
    this.userinfo = secureStorage.getItem("userinfo");
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
  },
};
</script>
<style scoped>
@media (max-width: 700px) {
  .hide-on-mobile {
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
