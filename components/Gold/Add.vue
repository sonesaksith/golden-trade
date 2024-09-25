<template>
  <v-dialog v-model="dialog" width="600">
    <v-form ref="form" v-model="valid">
      <v-card>
        <!-- <v-card-title> ເພີ່ມທອງ </v-card-title> -->
        <v-card-title style="background-color: #e7e6e6">
          <div
            style="
              display: flex;
              width: 100%;
              align-items: center;
              justify-content: center;
            "
          >
            <div style="display: flex; align-items: center">
              <v-icon large color="grey">mdi-storefront-plus-outline</v-icon>
              <h4 class="mx-2">ເພີ່ມທອງ</h4>
            </div>
            <v-spacer></v-spacer>
            <div
              style="
                border-radius: 100%;
                width: 40px;
                height: 40px;
                background-color: white;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
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
                hide-details="auto"
                label="ຊື່​ສິນ​ຄ້າ​"
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
              <!-- :rules="[(v) => !!v || 'ກະລຸນາປ້ອນລາຄາລາຍ']" -->
              <v-text-field
                v-model="priceLai"
                @keyup="fotmatPriceLai()"
                label="ຄ່າລາຍ"
                outlined
                dense
                hide-details="auto"
                class="rounded-md"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="wieght"
                @keyup="fotmatWieght()"
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
              <!-- :rules="[(v) => !!v || 'ກະລຸນາປ້ອນນ້ຳໜັກແທ້']" -->
              <v-text-field
                v-model="realWeight"
                @keyup="fotmatRealWieght()"
                label="ນ້ຳໜັກຈິງ"
                append-icon="mdi-weight-gram"
                outlined
                hide-details="auto"
                dense
                class="rounded-md"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <!-- :rules="[(v) => !!v || 'ກະລຸນາປ້ອນຄວາມບໍລິສຸດທອງ']" -->
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
              <!-- :rules="[(v) => !!v || 'ກະລຸນາປ້ອນຄ່າທຳນຽມ']" -->
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
              <!-- :rules="[(v) => !!v || 'ກະລຸນາປ້ອນຈຳນວນ']" -->
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
          <v-btn @click="onAdd()" color="primary" text>ເພີ່ມ</v-btn>
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
      name: "",
      productTypeId: "",
      cateId: "",
      laiId: "",
      unitId: "",
      wieght: "",
      pure: 99.99,
      fee: 0,
      priceLai: "",
      realWeight: "",
      qty: "",

      id: "",
      typGold: "ທອງຮູບປະພັນ",
      optionGole: "",
      typeLine: "",
      wight: 0,
      typwight: "ບາດ",
      purity: 99.99,
      fee: 0,
      sellGold: 0,
      valid: false,
    };
  },
  computed: {
    ...mapGetters("dropdown", ["dropDown"]),
  },
  methods: {
    ...mapActions("gold", ["CreateGolds"]),
    onClose() {
      this.dialog = false;
      this.$refs.form.reset();
    },
    async onAdd() {
      try {
        let item = {
          name: this.name,
          productTypeId: this.productTypeId,
          cateId: this.cateId,
          laiId: this.laiId,
          unitId: this.unitId,
          wieght: this.wieght.split(",").join(""),
          pure: this.pure,
          fee: this.fee,
          priceLai: this.priceLai.split(",").join(""),
          realWeight: this.realWeight,
          qty: this.qty,
        };
        const res = await this.CreateGolds(item);
        // this.$store.commit("gold/ADD_GOLD", data);
        if (res?.data?.status == 201 || res?.data?.msg == "success") {
          this.$swal({
            toast: true,
            text: "ເພີ່ມສຳເລັດ",
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
            text: error?.response?.data?.message,
            type: "error",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
          });
        }
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
    fotmatRealWieght() {
      // this.realWeight = this.realWeight.split(",").join("");
      // let val;
      // let valArr = [];
      // val = this.realWeight;
      // val = val.replace(/[^0-9\.]/g, "");
      // if (val != "") {
      //   valArr = val.split(".");
      //   valArr[0] = parseInt(valArr[0], 10).toLocaleString();
      //   val = valArr.join(".");
      // }
      // this.realWeight = val;
    },
  },
};
</script>
