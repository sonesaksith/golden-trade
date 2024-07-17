<template>
  <v-card
    class="hide-on-mobile"
    style="margin-block: 40px; margin-inline: 10px"
    outlined
  >
    <v-card-title class="pa-2">
      <v-row class="mx-0">
        <v-col cols="12" md="6" sm="6" class="pb-0">
          <h4><u>ຮ້ານຄຳ.........</u></h4>
          <p style="font-size: 14px" class="ma-0">No: {{ billNo }}</p>
          <p style="font-size: 14px" class="ma-0">ວັນທີ: {{ currentDate }}</p>
          <p style="font-size: 14px" class="ma-0">ພະນັກງານ: Luna</p>
        </v-col>
        <v-col cols="12" md="6" sm="6" class="text-right">
          <p style="font-size: 14px" class="ma-0">
            <!-- {{ $formatnumber(999999999) }}: {{ $formatnumber(31200) }} -->
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
                }}{{ n?.shapeLine ? n?.shapeLine + ")" : n?.shape ? ")" : "" }}
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
        <!-- <v-col
                cols="3"
                md="2"
                sm="2"
                class="py-0"
                style="display: flex; align-items: center"
            >
                <p style="font-size: 15px; font-weight: 600" class="ma-0">
                [ໂອນ]
                </p>
            </v-col>
            <v-col cols="9" md="10" sm="10">
                <div class="dot-divider"></div>
            </v-col> -->
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
  </v-card>
</template>
