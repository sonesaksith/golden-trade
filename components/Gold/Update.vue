<template>
  <v-dialog v-model="dialog" width="500">
    <v-form ref="form" v-model="valid">
      <v-card>
        <v-card-title> ແກ້ໄຂຂໍ້ມູນ </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="name"
                dense
                label="ລະຫັດສິນຄ້າ"
                hide-details="auto"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-autocomplete
                v-model="productTypeId"
                :items="dropDown.product_type"
                :item-text="(item) => item.product_type_name"
                :item-value="(item) => item.product_type_id"
                outlined
                dense
                hide-details="auto"
                class="rounded-md"
                clearable
                label="ປະເພດຄຳ"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6">
              <v-autocomplete
                label="ປະເພດຮູບປະພັນ"
                v-model="cateId"
                :items="dropDown.category"
                :item-text="(item) => item.category_name"
                :item-value="(item) => item.category_id"
                outlined
                dense
                hide-details="auto"
                class="rounded-md"
                clearable
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6">
              <v-autocomplete
                label="ລາຍ"
                v-model="laiId"
                :items="dropDown.lai"
                :item-text="(item) => item.lai_name"
                :item-value="(item) => item.lai_id"
                outlined
                dense
                hide-details="auto"
                class="rounded-md"
                clearable
              ></v-autocomplete>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="priceLai"
                label="ລາຄາລາຍ"
                :rules="[(v) => !!v || 'ກະລຸນາປ້ອນລາຄາລາຍ']"
                outlined
                dense
                hide-details="auto"
                class="rounded-md"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="wieght"
                dense
                hide-details="auto"
                label="ນ້ຳໜັກ"
                outlined
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-autocomplete
                label="ປະເພດນ້ຳໜັກ"
                v-model="unitId"
                :items="dropDown.unit"
                :item-text="(item) => item.unit_name"
                :item-value="(item) => item.unit_id"
                outlined
                dense
                hide-details="auto"
                class="rounded-md"
              ></v-autocomplete>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="realWeight"
                label="ນ້ຳໜັກ/ກຣາມ"
                outlined
                hide-details="auto"
                dense
                class="rounded-md"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="pure"
                label="ຄວາມບໍລິສຸດທອງ"
                append-icon="mdi-percent"
                outlined
                dense
                hide-details="auto"
                class="rounded-md"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="fee"
                label="ຄ່າທຳນຽມ"
                outlined
                dense
                hide-details="auto"
                class="rounded-md"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="qty"
                label="ຈຳນວນ"
                outlined
                dense
                hide-details="auto"
                class="rounded-md"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="onEdit()" color="primary" text>ແກ້ໄຂ</v-btn>
          <v-btn @click="onClose()" color="error" text>ຍົກເລີກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      id: "",
      name: "",
      productTypeId: 1,
      cateId: "",
      laiId: "",
      unitId: 1,
      wieght: "",
      pure: 99,
      fee: 0,
      priceLai: "",
      realWeight: "",
      qty: "",

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
  computed: {
    ...mapGetters("dropdown", ["dropDown"]),
  },
  methods: {
    ...mapActions("gold", ["UpdateGolds"]),
    onClose() {
      this.dialog = false;
      this.$refs.form.reset();
    },
    async onEdit() {
      try {
        const item = {
          id: this.id,
          name: this.name,
          productTypeId: this.productTypeId ? this.productTypeId : "",
          cateId: this.cateId ? this.cateId : "",
          laiId: this.laiId ? this.laiId : "",
          unitId: this.unitId ? this.unitId : "",
          wieght: this.wieght,
          pure: this.pure,
          fee: this.fee,
          priceLai: this.priceLai,
          realWeight: this.realWeight,
          qty: this.qty,
        };
        console.log(item);
        const res = await this.UpdateGolds(item);
        if (res?.data?.status == 200 || res?.data?.msg == "success") {
          this.$swal({
            toast: true,
            text: "ແກ້ໄຂສຳເລັດ",
            type: "success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
          });
          this.dialog = false;
          this.$refs.form.reset();
          this.$emit("getGolds");
        }
        // this.$store.commit("gold/UPDATE_GOLD_BY_INDEX", data);

        // this.dialog = false;
        // this.$refs.form.reset();
      } catch (error) {
        console.log(error.response);
        if (error?.response?.data?.status == 301) {
          this.$swal({
            toast: true,
            text: "ກະລຸນາປ້ອນຈຂໍ້ມູນໃຫ້ຄົບ",
            type: "error",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
          });
        } else {
          this.$swal({
            toast: true,
            text: "ແກ້ໄຂບໍ່ສຳເລັດ",
            type: "error",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
          });
        }
        this.dialog = false;
      }
    },
  },
};
</script>
