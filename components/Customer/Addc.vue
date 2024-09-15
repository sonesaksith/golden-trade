<template>
  <v-dialog v-model="dialog" width="500">
    <v-form ref="form" v-model="valid">
      <v-card>
        <v-card-title> ເພີ່ມລາຍຊື່ລູກຄ້າ </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="name"
                dense
                label="ຊື່"
                outlined
                :rules="[(v) => !!v || 'ກະລຸນາປ້ອນຊື່']"
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
                :rules="[(v) => !!v || 'ກະລຸນາປ້ອນເບີໂທ']"
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
          <v-btn @click="onAdd()" color="primary" :disabled="!valid" text
            >ເພີ່ມ</v-btn
          >
          <v-btn @click="onClose()" color="error" text>ຍົກເລີກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      name: "",
      surname: "",
      tel: "",
      address: "",
      valid: false,
    };
  },
  computed: {
    ...mapState("customer", ["listCustomer"]),
  },
  methods: {
    ...mapActions("customer", ["createCustomer", "updateCustomer"]),
    onClose() {
      this.dialog = false;
      this.$refs.form.reset();
    },
    async onAdd() {
      if (this.$refs.form.validate()) {
        try {
          const data = {
            name: this.name,
            surname: this.surname,
            tel: this.tel,
            address: this.address,
          };
          const resp = await this.createCustomer(data);
          if (resp.status == 201 && resp.data.msg == "success") {
            this.$emit("getCustomer");
            this.$swal({
              toast: true,
              text: "ເພີ່ມຂໍ້ມູນລຸກຄ້າສຳເລັດ!",
              type: "success",
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
              position: "top-end",
            });
            this.$refs.form.reset();
            this.dialog = false;
          } else {
            this.$swal({
              toast: true,
              text: resp.data.message,
              type: "warning",
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
              position: "top-end",
            });
          }
        } catch (error) {
          this.$swal({
            toast: true,
            text: error.response?.data.message,
            type: "warning",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
          });
        }
      }
    },
  },
};
</script>
