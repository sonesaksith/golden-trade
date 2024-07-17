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
                  @click="SET_DECREMENT(index)"
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
                  @click="SET_INCREMENT(index)"
                  style="color: #000; cursor: pointer; margin-left: 4px"
                >
                  mdi-plus
                </v-icon>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-divider vertical style="min-height: 60vh"></v-divider>
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
                  @click="SET_DECREMENT(index)"
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
                  @click="SET_INCREMENT(index)"
                  style="color: #000; cursor: pointer; margin-left: 4px"
                >
                  mdi-plus
                </v-icon>
              </div>
            </v-col>
          </v-row>
        </v-col>
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
};
</script>
<style lang="scss"></style>
