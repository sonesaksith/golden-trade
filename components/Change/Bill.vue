<template>
  <div class="pa-4">
    <v-card class="rounded-lg pa-4" style="min-height: 60vh">
      <v-row>
        <v-col cols="12" align="center">
          <h3>ລາຍການປ່ຽນ</h3>
          <div class="d-flex">
            <v-spacer></v-spacer>
            <div>
              <v-btn
                dark
                style="
                  font-size: 14px;
                  margin-top: 10px;
                  background-color: #e20303;
                "
                class="rounded-lg ml-1 mr-1 btn-pdf"
                @click="OnPrintPdf()"
              >
                <v-icon color="white">mdi-file-pdf-box</v-icon> &nbsp; PDF
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
          </div></v-col
        >
        <v-col cols="12"> <v-divider></v-divider></v-col>
        <v-col cols="6" class="pa-4">
          <h4 class="mb-4">
            <span style="color: brown">{{ "#" }}</span>
            ຊື້ເຂົ້າ
          </h4>

          <v-row
            class="px-2 py-2"
            v-for="(item, index) in listItemsBuyinToChange"
            :key="index"
          >
            <v-col
              cols="12"
              style="
                background-color: antiquewhite;
                border-radius: 4px;
                height: 100px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 10px;
              "
            >
              <div style="display: flex; align-items: center">
                <img
                  src="/goldbar.png"
                  width="70"
                  height="70"
                  style="border-radius: 5px"
                  class="hide-on-mobile"
                />
                <div style="margin-left: 10px">
                  <p
                    style="
                      font-size: 16px;
                      color: #000;
                      margin: 0;
                      min-width: 180px;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    "
                  >
                    {{ item.name }} {{ item?.shape ? "(" + item?.shape : ""
                    }}{{
                      item?.shapeLine
                        ? item?.shapeLine + ")"
                        : item?.shape
                        ? ")"
                        : ""
                    }}
                  </p>
                  <p style="font-size: 14px; color: #000; margin: 0">
                    ນ້ຳໜັກ: {{ $formatnumber(item.weight) }}
                    {{ item.weightType }}
                    {{
                      item.purity
                        ? `, ທອງຄຳບໍລິສຸດ: ` + item.purity + `%.`
                        : null
                    }}
                  </p>
                  <p style="font-size: 14px; color: #000; margin: 0">
                    ລາຄາ/ຈໍາ​ນວນ: {{ $formatnumber(item.price) }}
                  </p>
                  <p style="font-size: 14px; color: #000; margin: 0">
                    ຄ່າຫຼູ້ຍຫ້ຽນ: {{ $formatnumber(item.lost) }}
                  </p>
                </div>
              </div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  position: absolute;
                  bottom: 8px;
                  right: 8px;
                "
              >
                <v-icon
                  class="icon ma-0"
                  small
                  @click="SET_DECREMENT_BUY_TO_CHANGE(index)"
                  style="color: #000; cursor: pointer; margin-right: 4px"
                >
                  mdi-minus
                </v-icon>
                <p style="font-size: 18px; color: #000; margin: 0 8px">
                  <b>{{ item.amount }}</b>
                </p>
                <v-icon
                  class="icon ma-0"
                  small
                  @click="SET_INCREMENT_BUY_TO_CHANGE(index)"
                  style="color: #000; cursor: pointer; margin-left: 4px"
                >
                  mdi-plus
                </v-icon>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12"> <v-divider class="mt-10"></v-divider></v-col>
            <v-col cols="12"
              ><h4>
                ເປັນເງິນ:
                {{ $formatnumber(sumAmounts(listItemsBuyinToChange)) }}
              </h4></v-col
            ></v-row
          >
        </v-col>
        <v-col cols="6" class="pa-4">
          <h4 class="mb-4">
            <span style="color: brown">{{ "#" }}</span>
            ຂາຍອອກ
          </h4>

          <v-row
            class="px-2 py-2"
            v-for="(item, index) in listItemsSellOutToChange"
            :key="index"
          >
            <v-col
              cols="12"
              style="
                background-color: #f2f4f4;
                border-radius: 4px;
                height: 100px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 10px;
              "
            >
              <div style="display: flex; align-items: center">
                <img
                  src="/goldbar.png"
                  width="70"
                  height="70"
                  style="border-radius: 5px"
                  class="hide-on-mobile"
                />
                <div style="margin-left: 10px">
                  <p
                    style="
                      font-size: 16px;
                      color: #000;
                      margin: 0;
                      min-width: 180px;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    "
                  >
                    {{ item.name }} {{ item?.shape ? "(" + item?.shape : ""
                    }}{{
                      item?.shapeLine
                        ? item?.shapeLine + ")"
                        : item?.shape
                        ? ")"
                        : ""
                    }}
                  </p>
                  <p style="font-size: 14px; color: #000; margin: 0">
                    ນ້ຳໜັກ: {{ $formatnumber(item.weight) }}
                    {{ item.weightType }}
                    {{
                      item.purity
                        ? `, ທອງຄຳບໍລິສຸດ: ` + item.purity + `%.`
                        : null
                    }}
                  </p>
                  <p style="font-size: 14px; color: #000; margin: 0">
                    ລາຄາ/ຈໍາ​ນວນ: {{ $formatnumber(item.price) }}
                  </p>
                  <p style="font-size: 14px; color: #000; margin: 0">
                    ຄ່າຫຼູ້ຍຫ້ຽນ: {{ $formatnumber(item.lost) }}
                  </p>
                </div>
              </div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  position: absolute;
                  bottom: 8px;
                  right: 8px;
                "
              >
                <v-icon
                  class="icon ma-0"
                  small
                  @click="SET_DECREMENT_SELL_TO_CHANGE(index)"
                  style="color: #000; cursor: pointer; margin-right: 4px"
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
          <v-row>
            <v-col cols="12"> <v-divider class="mt-10"></v-divider></v-col>
            <v-col cols="12"
              ><h4>
                ເປັນເງິນ:
                {{ $formatnumber(sumAmounts(listItemsSellOutToChange)) }}
              </h4></v-col
            ></v-row
          >
        </v-col>
        <v-col cols="12"> <v-divider></v-divider></v-col>
        <v-col cols="12" align="right">
          <h3>ຊື້ : {{ $formatnumber(sumAmounts(listItemsBuyinToChange)) }}</h3>
          <h3>
            ຂາຍ : {{ $formatnumber(sumAmounts(listItemsSellOutToChange)) }}
          </h3>
          <h2>
            ສະຫຼຸບບິນ ({{
              checkPaymore(
                sumAmounts(listItemsBuyinToChange),
                sumAmounts(listItemsSellOutToChange)
              )
            }}) :
            {{
              $formatnumber(
                Math.abs(
                  sumAmounts(listItemsBuyinToChange) -
                    sumAmounts(listItemsSellOutToChange)
                )
              )
            }}
          </h2>
        </v-col>
        <v-col cols="12" align="right"
          ><v-btn
            @click="OnPrintBill()"
            dark
            height="50px"
            width="220px"
            color="goldColor"
            >ເທີນຄຳ</v-btn
          ></v-col
        >
      </v-row>
    </v-card>
    <div style="display: none">
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
                    <span
                      >ລູກຄ້າ: {{ selectingCus?.name
                      }}{{ selectingCus?.surname }}/{{ selectingCus?.tel }}
                    </span>
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
            <div>
              <br />
              <div style="display: flex; justify-content: space-between">
                <div><u>ລາຍການປ່ຽນ</u></div>
                <div><u>ເປັນເງິນ</u></div>
              </div>
            </div>
            <div>
              <div
                style="display: flex; justify-content: space-between"
                class="mt-4"
              >
                <div style="margin-right: 2px"><h5>[ຊື້]</h5></div>
                <div style="width: 100%; align-self: center">
                  <hr />
                </div>
              </div>
              <div
                style="display: flex; justify-content: space-between"
                v-for="(item, index) in listItemsBuyinToChange"
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
              <div style="display: flex; justify-content: space-between">
                <div style="margin-right: 2px"><h5>[ຂາຍ]</h5></div>
                <div style="width: 100%; align-self: center">
                  <hr />
                </div>
              </div>
              <div
                style="display: flex; justify-content: space-between"
                v-for="(item, index) in listItemsSellOutToChange"
                :key="index + item.name"
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
            <v-divider color="black" class="my-2"></v-divider>
            <div style="display: flex; justify-content: flex-end" class="mt-4">
              <div>
                ຊື້
                <span
                  >{{
                    $formatnumber(sumAmounts(listItemsBuyinToChange))
                  }}
                  LAK</span
                >
              </div>
            </div>
            <div style="display: flex; justify-content: flex-end" class="my-2">
              <div>
                ຂາຍ
                <span>
                  {{ $formatnumber(sumAmounts(listItemsSellOutToChange)) }}
                  LAK</span
                >
              </div>
            </div>
            <div style="display: flex; justify-content: flex-end">
              <h4>
                ສະຫຼຸບບິນ ({{
                  checkPaymore(
                    sumAmounts(listItemsBuyinToChange),
                    sumAmounts(listItemsSellOutToChange)
                  )
                }}) :
                {{
                  $formatnumber(
                    Math.abs(
                      sumAmounts(listItemsBuyinToChange) -
                        sumAmounts(listItemsSellOutToChange)
                    )
                  )
                }}
              </h4>
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
                <!-- <span>{{ $formatnumber(priceAll) }} LAK</span> -->
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
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import secureStorage from "~/plugins/secure-storage";
import html2pdf from "html2pdf.js";
export default {
  data() {
    return { currentDateTime: "", currentDate: "", userinfo: [], billNo: "" };
  },
  computed: {
    ...mapGetters("change", [
      "listItemsBuyinToChange",
      "listItemsSellOutToChange",
    ]),
    ...mapState("customer", ["selectingCus"]),
  },
  created() {
    this.updateDateTime();
    // setInterval(this.updateDateTime, 1000);
  },
  mounted() {
    this.userinfo = secureStorage.getItem("userinfo");
    this.billNo = this.generateRandomNumber(10);
  },
  methods: {
    ...mapMutations("change", [
      "SET_ITEMS_BUY_TO_CHANGE",
      "SET_DECREMENT_BUY_TO_CHANGE",
      "SET_INCREMENT_BUY_TO_CHANGE",
      "SET_ITEMS_SELL_TO_CHANGE",
      "SET_DECREMENT_SELL_TO_CHANGE",
      "SET_INCREMENT_SELL_TO_CHANGE",
    ]),
    updateDateTime() {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      this.currentDateTime = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
      this.currentDate = `${day}/${month}/${year}`;
    },
    sumAmounts(objects) {
      return objects.reduce(
        (acc, current) => acc + current.price * current.amount,
        0
      );
    },
    checkPaymore(buyAmount, sellAmount) {
      console.log(buyAmount - sellAmount);
      if (buyAmount - sellAmount > 0) {
        return "ທອນ";
      } else {
        return "ຕື່ມ";
      }
    },
    async OnPrintPdf() {
      try {
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
  },
};
</script>
<style lang="scss"></style>
