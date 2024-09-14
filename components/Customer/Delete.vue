<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-container>
        <v-card-title> ຢືນຢັນການລົບ </v-card-title>
        <v-card-subtitle> ທ່ານຕ້ອງການລົບລູກຄ້ານີ້ ແທ້ຫຼືບໍ່? </v-card-subtitle>
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
      cusNo: 0,
      loading: false,
    };
  },
  methods: {
    async onDelete() {
      this.$store.commit("customer/DELETE_CUSTOMER_BY_NO", this.cusNo);
      this.dialog = false;
    },
  },
};
</script>
