<template>
  <v-dialog v-model="dialog" width="500">
    <v-form ref="form" v-model="valid">
      <v-card>
        <v-card-title> ແກ້ໄຂຂໍ້ມູນລູກຄ້າ </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="name"
                dense
                label="ຊື່"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="surname"
                dense
                label="ນາມສະກຸນ"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="tel"
                dense
                label="ເບີໂທ"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="address"
                label="ທີ່ຢູ່"
                outlined
                rows="4"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="onUpdate()" color="primary" text>ແກ້ໄຂ</v-btn>
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
      name: "",
      surname: "",
      tel: "",
      address: "",
      valid: false,
      no: 0,
    };
  },
  computed: {
    ...mapState("customer", ["listCustomer"]),
  },
  methods: {
    onClose() {
      this.dialog = false;
      this.$refs.form.reset();
    },
    onUpdate() {
      const data = {
        no: this.no,
        name: this.name,
        surname: this.surname,
        tel: this.tel,
        address: this.address,
      };
      this.$store.commit("customer/UPDATE_CUSTOMER_BY_NO", data);

      this.dialog = false;
      this.$refs.form.reset();
    },
  },
};
</script>
