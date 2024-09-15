<template>
  <v-dialog v-model="dialog" width="500">
    <v-form ref="form" v-model="valid">
      <v-card>
        <v-card-title> ແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້ </v-card-title>
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
              <v-text-field
                v-model="password"
                label="ຕັ່ງລະຫັດຜ່ານ"
                dense
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12"
              ><v-select
                v-model="userStatus"
                label="ສະຖານະຜູ້ໃຊ້"
                dense
                :items="role"
                item-text="role"
                item-value="value"
                outlined
              ></v-select
            ></v-col>
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
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      id: null,
      dialog: false,
      name: "",
      surname: "",
      tel: "",
      password: "",
      valid: false,
      userStatus: 1,
      role: [
        { role: "admin", value: 1 },
        { role: "ຜູ້ໃຊ້", value: 2 },
      ],
    };
  },
  computed: {},
  methods: {
    ...mapActions("user", ["updateUser"]),
    onClose() {
      this.dialog = false;
      this.$refs.form.reset();
    },
    async onUpdate() {
      if (this.$refs.form.validate()) {
        try {
          const data = {
            id: this.id,
            name: this.name,
            surname: this.surname,
            tel: this.tel,
            pass: "U2FsdGVkX18Z3TEnTSt7MmFsyil3+GEF2taAd+Gl0jY=",
            userStatusId: this.userStatus,
          };
          const resp = await this.updateUser(data);
          if (resp.status == 200 && resp.data.msg == "success") {
            this.$emit("getCustomer");
            this.$swal({
              toast: true,
              text: "ແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້ສຳເລັດ!",
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
