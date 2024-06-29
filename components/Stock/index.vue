<template>
  <div class="pa-4 pt-6">
    <div class="px-2">
      <v-row>
        <v-col cols="12" sm="2" md="1" lg="1">
          <h4 style="text-align: center; margin-top: 5px">ຫນ້າຫຼັກ</h4>
        </v-col>
        <v-col :cols="myGoldType == 2 ? '6' : '4'" sm="4" md="3" lg="3">
          <v-select
            v-model="myGoldType"
            label="ປະເພດຄໍາ"
            :items="goldsTypes"
            item-text="name"
            item-value="id"
            outlined
            dense
            class="rounded-md"
          ></v-select>
        </v-col>
        <v-col
          v-if="myGoldType == 2"
          :cols="myGoldType == 2 ? '6' : '4'"
          sm="3"
          md="3"
          lg="3"
        >
          <v-select
            v-model="myGoldDif"
            label="ປະເພດຄໍາ"
            :items="goldsDif"
            item-text="name"
            item-value="id"
            outlined
            dense
            class="rounded-md"
          ></v-select>
        </v-col>
        <v-col :cols="myGoldType == 2 ? '6' : '4'" sm="2" md="2" lg="2">
          <v-text-field
            v-model="weight"
            label="ນ້ໍາຫນັກ"
            type="number"
            outlined
            dense
            class="rounded-md"
          ></v-text-field>
        </v-col>
        <v-col :cols="myGoldType == 2 ? '6' : '4'" sm="4" md="3" lg="3">
          <v-select
            v-model="myWeight"
            label="ປະເພດນ້ໍາຫນັກ"
            :items="weightTpyes"
            item-text="name"
            item-value="id"
            outlined
            dense
            class="rounded-md"
          ></v-select>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-row>
        <v-col v-for="(item, index) in golds" :key="index" cols="12" sm="3" md="3" lg="3">
          <v-card class="mx-auto my-2 rounded-lg" max-width="374">
            <v-img
              height="250"
              src="https://www.gcap.co.th/wp-content/uploads/2023/05/Banner-Product-and-Service-GOLD.jpg"
            ></v-img>
            <v-card-title
              class="py-1"
              style="
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
              "
              >{{ item.name }}</v-card-title
            >
            <v-card-text class="py-0" style="display: flex">
              <p class="ma-0">ນ້ຳຫນັກ: {{ item.weight }}</p>
              <v-spacer></v-spacer>
              <p class="ma-0">ລາຄາ: {{ $formatnumber(item.price) }}</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outlined rounded text color="secondary" style="border: 0.5px solid #ffd700;"> ເພີ່ມໃສ່ກະຕ່າ </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      weight: "",
      myGoldType: "",
      goldsTypes: [
        {
          id: 1,
          name: "ທອງຄໍາແທ່ງ",
        },
        {
          id: 2,
          name: "ທອງຄໍາຮູບປະພັນ",
        },
      ],
      myGoldDif: "",
      goldsDif: [
        {
          id: 1,
          name: "ສາຍຄໍ",
        },
        {
          id: 2,
          name: "ສາຍແຂນ",
        },
        {
          id: 3,
          name: "ແຫວນ",
        },
        {
          id: 4,
          name: "ຕຸ້ມຫູ",
        },
        {
          id: 5,
          name: "ເຂັມຂັດ",
        },
      ],
      myWeight: "",
      weightTpyes: [
        {
          id: 1,
          name: "ກຣາມ (Gram: g)",
        },
        {
          id: 2,
          name: "ຫຸ້ນ",
        },
        {
          id: 3,
          name: "ສະລືງ",
        },
        {
          id: 4,
          name: "ບາດ",
        },
      ],
      golds: [
        {
          id: "N001",
          name: "ສາຍຄໍຄໍາບໍລິສຸດ",
          type: "Necklace",
          weight: 15,
          price: 45000,
          design: "Plain Gold",
        },
        {
          id: "N002",
          name: "ສາຍຄໍຄຳຝັງເພັດ",
          type: "Necklace",
          weight: 20,
          price: 120000,
          design: "Gold with Diamond Inlay",
        },
        {
          id: "N003",
          name: "ສາຍຄໍຄຳງາມໆ",
          type: "Necklace",
          weight: 18,
          price: 80000,
          design: "Intricate Patterned Gold",
        },
        {
          id: "B001",
          name: "ສາຍແຂນຄໍາບໍລິສຸດ",
          type: "Bracelet",
          weight: 10,
          price: 30000,
          design: "Plain Gold",
        },
        {
          id: "B002",
          name: "ສາຍແຂນຄໍາຝັງເພັດ",
          type: "Bracelet",
          weight: 12,
          price: 70000,
          design: "Gold with Diamond Inlay",
        },
        {
          id: "B003",
          name: "ສາຍແຂນຄໍາອອກແບບພິເສດ",
          type: "Bracelet",
          weight: 14,
          price: 60000,
          design: "Special Design Gold",
        },
        {
          id: "R001",
          name: "ແຫວນຄໍາ",
          type: "Ring",
          weight: 5,
          price: 15000,
          design: "Simple Gold",
        },
        {
          id: "R002",
          name: "ແຫວນຄໍາຝັງເພັດ",
          type: "Ring",
          weight: 7,
          price: 50000,
          design: "Gold with Diamond Inlay",
        },
        {
          id: "R003",
          name: "ແຫວນຄຳງາມ",
          type: "Ring",
          weight: 6,
          price: 35000,
          design: "Ornate Patterned Gold",
        },
        {
          id: "E001",
          name: "ຕຸ້ມຫູຄໍາບໍລິສຸດ",
          type: "Earrings",
          weight: 4,
          price: 12000,
          design: "Plain Gold",
        },
        {
          id: "E002",
          name: "ຕຸ້ມຫູຄໍາຝັງເພັດ",
          type: "Earrings",
          weight: 5,
          price: 40000,
          design: "Gold with Diamond Inlay",
        },
        {
          id: "E003",
          name: "ຕຸ້ມຫູຄໍາໃນການອອກແບບຕ່າງໆ",
          type: "Earrings",
          weight: 6,
          price: 25000,
          design: "Various Designs Gold",
        },
        {
          id: "P001",
          name: "pendant ຄໍາບໍລິສຸດ",
          type: "Pendant",
          weight: 3,
          price: 9000,
          design: "Plain Gold",
        },
        {
          id: "P002",
          name: "pendant ຝັງເພັດ",
          type: "Pendant",
          weight: 4,
          price: 30000,
          design: "Gold with Diamond Inlay",
        },
        {
          id: "BR001",
          name: "ເຂັມຂັດຄໍາບໍລິສຸດ",
          type: "Brooch",
          weight: 7,
          price: 21000,
          design: "Plain Gold",
        },
        {
          id: "BR002",
          name: "ເຂັມຂັດຝັງເພັດ",
          type: "Brooch",
          weight: 8,
          price: 56000,
          design: "Gold with Diamond Inlay",
        },
      ],
    };
  },
  mounted() {},
  computed: {},
  methods: {},
};
</script>
<style>

</style>
