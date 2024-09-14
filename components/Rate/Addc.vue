<template>
  <v-dialog v-model="dialog" width="500">
    <v-form ref="form" v-model="valid">
      <v-card>
        <v-card-title> ເພີ່ມ Rate </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="buy"
                dense
                label="ຊື້"
                outlined
                :rules="[(v) => !!v || 'ກະລຸນາປ້ອນຊື່']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="sell"
                dense
                label="ຂາຍ"
                outlined
              ></v-text-field>
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
      buy: 0,
      sell: 0,
      dialog: false,
      valid: false,
    };
  },
  computed: {},
  methods: {
    ...mapActions("rate", ["createRate"]),
    onClose() {
      this.dialog = false;
      this.$refs.form.reset();
    },
    async onAdd() {
      if (this.$refs.form.validate()) {
        try {
          const data = {
            rateBuy: this.buy,
            rateSell: this.sell,
          };
          const resp = await this.createRate(data);
          if (resp.status == 201 && resp.data.msg == "success") {
            this.$emit("getRate");
            this.$swal({
              toast: true,
              text: "ເພີ່ມຂໍ້ມູນສຳເລັດ!",
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
          console.log(error);
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
