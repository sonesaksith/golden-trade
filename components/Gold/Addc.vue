<template>
  <v-dialog v-model="dialog" width="500">
    <v-form ref="form" v-model="valid">
      <v-card>
        <v-card-title> ເພີ່ມລາຍຊື່ລູກຄ້າ </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="id"
                dense
                label="ລະຫັດສິນຄ້າ"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-autocomplete
                v-model="typGold"
                :items="goldTypes"
                :item-text="(item) => item.typeName"
                :item-value="(item) => item.typeName"
                outlined
                dense
                hide-details="auto"
                class="rounded-lg"
                clearable
                label="ປະເພດຄຳ"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6">
              <!-- <v-autocomplete
                label="ປະເພດຮູບປະພັນ"
                v-model="optionGole"
                :items="goldShape"
                :item-text="(item) => item.shapeName"
                :item-value="(item) => item.shapeName"
                outlined
                dense
                hide-details="auto"
                class="rounded-lg"
                clearable
              ></v-autocomplete> -->
              <v-text-field
                v-model="optionGole"
                dense
                label="ປະເພດຮູບປະພັນ"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <!-- <v-autocomplete
                label="ລາຍ"
                v-model="typeLine"
                :items="goldShapeLine"
                :item-text="(item) => item.shapeLineName"
                :item-value="(item) => item.shapeLineName"
                outlined
                dense
                hide-details="auto"
                class="rounded-lg"
                clearable
              ></v-autocomplete> -->
              <v-text-field
                v-model="typeLine"
                dense
                label="ລາຍ"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="wight"
                dense
                label="ນ້ຳໜັກ"
                outlined
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-autocomplete
                label="ປະເພດນ້ຳໜັກ"
                v-model="typwight"
                :items="weightType"
                :item-text="(item) => item.weightName"
                :item-value="(item) => item.weightName"
                outlined
                dense
                hide-details="auto"
                class="rounded-lg"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="sellGold"
                dense
                label="ລາຄາ"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="onAdd()" color="primary" text>ເພີ່ມ</v-btn>
          <v-btn @click="onClose()" color="error" text>ຍົກເລີກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      id: "",
      typGold: "ທອງຮູບປະພັນ",
      optionGole: "",
      typeLine: "",
      wight: 0,
      typwight: "ບາດ",
      sellGold: 0,
      valid: false,
      goldShapeLine: [
        { id: 1, shapeLineName: "ລາຍມັງກອນ" },
        { id: 2, shapeLineName: "ລາຍເສືອ" },
        { id: 3, shapeLineName: "ລາຍງູ" },
        { id: 4, shapeLineName: "ລາຍດອກກຸຫຼາບ" },
        { id: 5, shapeLineName: "ລາຍດອກຊາກຸຣະ" },
      ],
      goldShape: [
        { id: 1, shapeName: "ສາຍຄໍ" },
        { id: 2, shapeName: "ສາຍແຂນ" },
        { id: 3, shapeName: "ແຫວນ" },
        { id: 4, shapeName: "ກຳໄລ" },
      ],
      goldTypes: [
        {
          id: 1,
          typeName: "ທອງຮູບປະພັນ",
        },
        {
          id: 2,
          typeName: "ທອງຄຳແທ່ງ",
        },
      ],
      weightType: [
        {
          id: 1,
          weightName: "gram",
        },
        {
          id: 2,
          weightName: "kg",
        },
        {
          id: 3,
          weightName: "ຫູນ",
        },
        {
          id: 4,
          weightName: "ສະຫຼຶງ",
        },
        {
          id: 5,
          weightName: "ບາດ",
        },
      ],
    };
  },

  methods: {
    onClose() {
      this.dialog = false;
      this.$refs.form.reset();
    },
    onAdd() {
      const data = {
        id: this.id,
        typGold: this.typGold,
        optionGole: this.optionGole,
        typeLine: this.typeLine,
        wight: this.wight,
        typwight: this.typwight,
        sellGold: this.sellGold,
      };
      this.$store.commit("gold/ADD_GOLD", data);

      this.dialog = false;
      this.$refs.form.reset();
    },
  },
};
</script>
