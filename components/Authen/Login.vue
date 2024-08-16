<template>
  <v-container>
    <v-card
      width="600"
      class="mx-auto"
      style="border-radius: 50px; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px"
    >
      <v-row class="mt-15 px-6 pt-4 pb-8">
        <v-col cols="12" class="img">
          <!-- <img
            width="250"
            height="250"
            style="border-radius: 50px"
            src="../../assets/images/kimbup.jpeg"
            draggable="false"
          /> -->
          <v-card color="primary" style="width: 200px; height: 200px"> </v-card>
        </v-col>
        <v-col cols="12" class="img">
          <v-row>
            <v-col cols="12" align="center">
              <h3>ເຂົ້າສູ່ລະບົບ</h3>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-text-field
                v-model="username"
                label="ຊື່ເຂົ້າໃຊ້"
                name="username"
                placeholder="ກະລູນາປ້ອນຊື່ເຂົ້າໃຊ້"
                prepend-inner-icon="mdi-account"
                color="grey darken-1"
                style="font-size: 14px"
                @keyup.enter="authen"
                :rules="[rules.required1]"
                outlined
              />
            </v-col>

            <v-col cols="12" class="py-0">
              <v-text-field
                v-model="password"
                prepend-inner-icon="mdi-lock"
                label="ລະຫັດຜ່ານ"
                outlined
                placeholder="ກະລູນາປ້ອນລະຫັດຜ່ານ"
                :rules="[rules.required2]"
                name="password"
                :type="show ? 'text' : 'password'"
                color="grey darken-1"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                style="font-size: 14px"
                @click:append="show = !show"
                @keyup.enter="login"
              />
            </v-col>

            <v-col cols="12" class="pt-0">
              <v-btn
                :disabled="username == '' || password == ''"
                :loading="isLoading"
                color="red"
                style="
                  width: 100%;
                  color: white;
                  height: 50px;
                  font-size: 18px;
                  border-radius: 50px;
                "
                @click="login"
              >
                ເຂົ້າສູ່ລະບົບ
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import secureStorage from "../../plugins/secure-storage.js";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      show: false,
      rules: {
        required1: (v) => !!v || "ກະລູນາປ້ອນຊື່ເຂົ້າໃຊ້",
        required2: (v) => !!v || "ກະລູນາປ້ອນລະຫັດຜ່ານ",
      },
    };
  },
  mounted() {
    if (secureStorage.getItem("token")) {
      this.$router.replace("/Sell");
    }
  },
  methods: {},
  computed: {
    ...mapGetters("authen", ["isLoading"]),
  },
  methods: {
    ...mapActions("authen", ["Login"]),
    async login() {
      try {
        if (this.username || this.password) {
          // const body = {
          //   username: this.username,
          //   password: this.password,
          // };
          // const resp = await this.Login(body);
          // if (resp?.data?.access_token && resp.status == 201) {
          //   secureStorage.setItem("token", resp?.data?.access_token);
          //   this.$swal({
          //     toast: true,
          //     text: "ເຂົ້າສູ່ລະບົບສຳເລັດ!",
          //     type: "success",
          //     timer: 1500,
          //     timerProgressBar: true,
          //     showConfirmButton: false,
          //     position: "top-end",
          //   });
          this.$router.replace("/");
          // } else {
          //   this.$swal({
          //     toast: true,
          //     text: "ກະລຸນາລອງໃຫມ່ອີກຄັ້ງ!",
          //     type: "error",
          //     timer: 1500,
          //     timerProgressBar: true,
          //     showConfirmButton: false,
          //     position: "top-end",
          //   });
          // }
        } else {
          this.$swal({
            toast: true,
            text: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ!",
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
          text: "ກະລຸນາລອງໃຫມ່ອີກຄັ້ງ!",
          type: "error",
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

<style scoped>
.img {
  display: flex;
  justify-content: center;
}
</style>
