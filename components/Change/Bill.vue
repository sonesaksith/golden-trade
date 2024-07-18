<template>
  <div class="pa-4">
    <v-card class="rounded-lg pa-4" style="min-height: 60vh">
      <v-row>
        <v-col cols="12" align="center"> <h3>ລາຍການປ່ຽນ</h3></v-col>
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
            <v-col cols="12"> <v-divider class="mt-10"></v-divider></v-col>
            <v-col cols="12"
              ><h4>
                ເປັນເງິນ:
                {{ $formatnumber(sumAmounts(listItemsBuyinToChange)) }}
              </h4></v-col
            >
          </v-row>
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
            <v-col cols="12"> <v-divider class="mt-10"></v-divider></v-col>
            <v-col cols="12"
              ><h4>
                ເປັນເງິນ:
                {{ $formatnumber(sumAmounts(listItemsSellOutToChange)) }}
              </h4></v-col
            >
          </v-row>
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
          ><v-btn dark height="50px" width="220px" color="goldColor"
            >ເທີນຄຳ</v-btn
          ></v-col
        >
      </v-row>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters("change", [
      "listItemsBuyinToChange",
      "listItemsSellOutToChange",
    ]),
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
  },
};
</script>
<style lang="scss"></style>
