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
      ref="printTable"
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
      >
        <div class="mx-3">
          <div style="display: flex; justify-content: space-between">
            <div>
              <div>
                <h4><u>ຮ້ານຄຳ ຫວຽດສະຫວັນ</u></h4>
                <div>
                  <span>No: {{ billNo }}</span>
                </div>
                <div>
                  <span>ວັນທີ:{{ currentDate }}</span>
                </div>
                <div>
                  <span>ພະນັກງານ: {{ userinfo?.username }}</span>
                </div>
                <div>
                  ລ/ຄ: {{ myCus.name + myCus.surname }}/{{ myCus.tel }}/{{
                    myCus.address
                  }}
                </div>
              </div>
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
                ຂາຍ
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
          <div>
            <br />
            <div style="display: flex; justify-content: space-between">
              <div><u>ລາຍການຂາຍ</u></div>
              <div><u>ເປັນເງິນ</u></div>
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between">
              <div style="margin-right: 2px"><h5>[ຂາຍ]</h5></div>
              <div style="width: 100%; align-self: center">
                <hr />
              </div>
            </div>
            <div
              style="display: flex; justify-content: space-between"
              v-for="(item, index) in listItems"
              :key="index"
            >
              <div>
                <span
                  >{{ index + 1 }} - {{ item?.name }}- {{ item?.weight }}-{{
                    item?.weightType
                  }}- ຈຳນວນ :{{ item?.amount }}
                  <br />
                  &nbsp; &nbsp; &nbsp; {{ item.shape }} -{{ item.shapeLine }}
                </span>
              </div>
              <div>
                <span>{{ $formatnumber(item.price) }}</span>
              </div>
            </div>
          </div>
          <div>
            <span>ລາຍລະອຽດການຊຳລະ </span>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div style="margin-right: 2px"><h5>[ໂອນ]</h5></div>
            <div style="width: 100%; align-self: center">
              <hr />
            </div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div>
              <span>1,500 x 512.00 </span>
            </div>
            <div>
              <span>{{ $formatnumber(priceAll) }} LAK</span>
            </div>
          </div>
          <div style="display: flex; justify-content: flex-end">
            <span>BCEL One Pay (KIP)----</span>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div>
              <span>ຜູ້ກວດບິນ</span>
            </div>
            <div>
              <span>({{ currentDateTime }})</span>
            </div>
          </div>
        </div>
      </v-card>

      <!-- detail -->

      <!-- table -->
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import secureStorage from "~/plugins/secure-storage";
import html2pdf from "html2pdf.js";
export default {
  props: {
    myCus: {
      type: Object,
      required: true,
    },
    billNo: { type: String, required: true },
    currentDateTime: { type: String, required: true },
    currentDate: { type: String, required: true },
  },
  data() {
    return {
      listSecure: "",
      // currentDateTime: "",
      header: [],
      filteredData: [],
      dialogSuccess: false,
      // currentDate: "",
      userinfo: [],
    };
  },
  async mounted() {
    this.userinfo = secureStorage.getItem("userinfo");
    //   this.listSecure = secureStorage.getItem('userinfo')
    // table
    //   for (let index = 0; index < this.Myheader.length; index++) {
    //     const element = this.Myheader[index]
    //     this.header.push(element.text)
    //   }
    //   for (let index = 0; index < this.listTable.length; index++) {
    //     const element1 = this.listTable[index]
    //     let a = {}
    //     for (let index = 0; index < this.Myheader.length; index++) {
    //       const element = this.Myheader[index]
    //       if (element?.callback) {
    //         a['column' + String(index)] = element.callback(
    //           element1[element.value]
    //         )
    //       } else {
    //         a['column' + String(index)] = element1[element.value]
    //       }
    //     }
    //     this.filteredData.push(a)
    //   }
  },
  created() {
    this.updateDateTime();
    setInterval(this.updateDateTime, 1000);
  },
  computed: {
    ...mapGetters("sellStore", ["listItems", "priceAll"]),
    ...mapState("customer", ["selectingCus"]),
    totalPrice() {
      return this.listItems.reduce((total, item) => {
        return total + item.priceAll;
      }, 0);
    },
  },
  methods: {
    // func time
    updateDateTime() {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      // this.currentDateTime = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
      // this.currentDate = `${day}/${month}/${year}`;
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
    // size: ${this.setSty};
    async OnPrintPdf() {
      try {
        if (this.listItems.length > 0) {
          const element = this.$refs.printTable;
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
            filename: "SellBill.pdf",
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
    OnPrintBill: async function () {
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
          table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  
  table th {
    padding: 2px;
    text-align: center;
    background-color: #be2a2a;
    color: white;
  }
  td {
      border: 1px solid #ddd;
      padding: 2px;
    }
    table thead{
  font-weight:bold;
  font-family:Verdana;
  
  }
  
        `;
      var divToPrint = this.$refs.printTable;
      try {
        this.$Printd.print(divToPrint, [SetPage]);
      } catch (error) {}
    },
  },
};
</script>
<style scoped>
.custom-table {
  width: 100%;
  border-collapse: collapse;
}
.custom-table th,
.custom-table td {
  border: 1px solid #ddd;
  padding: 2px;
  text-align: left;
}
.custom-table th {
  font-size: 12px;
  background-color: #be2a2a;
  color: white;
}
.custom-table tr {
  font-size: 10px;
}
.Absolute-Center {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.Absolute-End {
  display: flex;
  justify-content: end;
  align-items: end;
  text-align: center;
  flex-direction: column;
  font-size: 12px;
}
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
