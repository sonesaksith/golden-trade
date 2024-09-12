<template>
  <v-dialog v-model="dialog" width="500">
    <v-form ref="form" v-model="valid">
      <v-card>
        <v-card-title> ແກ້ໄຂຂໍ້ມູນ </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="lai_name"
                dense
                label="ຊື່ລາຍ"
                hide-details="auto"
                outlined
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
      lai_id: 0,
      lai_name: "",
      valid: false,
    };
  },
  computed: {
    ...mapGetters("dropdown", ["dropDown"]),
  },
  methods: {
    ...mapActions("gold", ["UpdateLine"]),
    onClose() {
      this.dialog = false;
      this.$refs.form.reset();
    },
    async onEdit() {
      try {
        const item = {
          id: this.lai_id,
          name: this.lai_name,
        };
        console.log(item);
        const res = await this.UpdateLine(item);
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
          this.$emit("getLines");
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
      }
    },
  },
};
</script>
