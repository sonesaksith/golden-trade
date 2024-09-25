<template>
  <v-dialog v-model="dialog" width="600">
    <v-form ref="form" v-model="valid">
      <v-card>
        <!-- <v-card-title> ແກ້ໄຂຂໍ້ມູນ </v-card-title> -->
        <v-card-title style="background-color: #e7e6e6">
          <div style="display: flex; width: 100%; align-items: center; justify-content: center;">
            <div style="display: flex; align-items: center">
              <v-icon large color="grey">mdi-square-edit-outline</v-icon>
              <h4 class="mx-2">ແກ້ໄຂຂໍ້ມູນ</h4>
            </div>
            <v-spacer></v-spacer>
            <div style="border-radius: 100%; width: 40px; height: 40px; background-color: white; display: flex; align-items: center; justify-content: center">
              <v-icon @click="onClose()" large color="grey">mdi-close</v-icon>
            </div>
          </div>
        </v-card-title>
        <v-card-text>
          <v-row class="mt-4">
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="name"
                dense
                label="ຊື່​ສິນ​ຄ້າ​"
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
                label="ປະເພດ"
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
                label="ຄ່າລາຍ"
                @keyup="fotmatPriceLai()"
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
                @keyup="fotmatWieght()"
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
                label="ນ້ຳໜັກຈິງ"
                append-icon="mdi-weight-gram"
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
        </v-card-text>
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
      productTypeId: "",
      cateId: "",
      laiId: "",
      unitId: "",
      wieght: "",
      pure: "",
      fee: "",
      priceLai: "",
      realWeight: "",
      qty: "",
      valid: false,
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
          wieght: this.wieght.split(",").join(""),
          pure: this.pure,
          fee: this.fee,
          priceLai: this.priceLai.split(",").join(""),
          realWeight: this.realWeight,
          qty: this.qty,
        };
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

        this.dialog = false;
        this.$refs.form.reset();
      } catch (error) {
        console.log(error);
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
            text: error?.response?.data?.message,
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
    fotmatPriceLai() {
      this.priceLai = this.priceLai.split(",").join("");
      let val;
      let valArr = [];
      val = this.priceLai;
      val = val.replace(/[^0-9\.]/g, "");
      if (val != "") {
        valArr = val.split(".");
        valArr[0] = parseInt(valArr[0], 10).toLocaleString();
        val = valArr.join(".");
      }
      this.priceLai = val;
    },
    fotmatWieght() {
      this.wieght = this.wieght.split(",").join("");
      let val;
      let valArr = [];
      val = this.wieght;
      val = val.replace(/[^0-9\.]/g, "");
      if (val != "") {
        valArr = val.split(".");
        valArr[0] = parseInt(valArr[0], 10).toLocaleString();
        val = valArr.join(".");
      }
      this.wieght = val;
    },
  },
};
</script>
