<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-container>
        <v-card-title> ຢືນຢັນການລົບ </v-card-title>
        <v-card-subtitle> ທ່ານຕ້ອງການລົບຜູ້ໃຊ້ານີ້ ແທ້ຫຼືບໍ່? </v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :loading="loading"
            :disabled="loading"
            color="error"
            @click="onDelete()"
            >ລົບ</v-btn
          >
          <v-btn :disabled="loading" color="primary" @click="dialog = false"
            >ຍົກເລີກ</v-btn
          >
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      id: 0,
      loading: false,
    };
  },
  methods: {
    ...mapActions("user", ["deleteUser"]),
    async onDelete() {
      // this.$store.commit("customer/DELETE_CUSTOMER_BY_NO", this.id);
      try {
        const resp = await this.deleteUser(this.id);
        if (resp.status == 200 && resp.data.msg == "success") {
          this.$emit("getCustomer");
          this.$swal({
            toast: true,
            text: "ລົບຂໍ້ມູນລຸກຄ້າສຳເລັດ!",
            type: "success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
          });
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
    },
  },
};
</script>
