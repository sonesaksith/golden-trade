<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-container>
        <v-card-title> ຢືນຢັນການລົບ </v-card-title>
        <v-card-subtitle> ທ່ານຕ້ອງການລົບປະເພດຮູບປະພັນ ແທ້ຫຼືບໍ່? </v-card-subtitle>
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
    ...mapActions("gold", ["DeleteCategory"]),
    async onDelete() {
      try {
        const res = await this.DeleteCategory(this.id);
        if (res?.data?.status == 200) {
          this.dialog = false;
          this.$emit("getCategory");
          this.$swal({
            toast: true,
            text: "ລົບສຳເລັດ",
            type: "success",
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
          text: "ລົບບໍ່ສຳເລັດ",
          type: "error",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
        this.dialog = false;
      }
      // this.$store.commit("gold/DELETE_GOLD_BY_INDEX", this.id);
      // this.dialog = false;
    },
  },
};
</script>
