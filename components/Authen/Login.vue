<template>
  <v-container>
    <v-card
      width="600"
      class="mx-auto"
      style="border-radius: 50px; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px"
    >
      <v-row class="mt-15 px-6 pt-4 pb-8">
        <v-col cols="12" class="login_form">
          <img
            width="250"
            height="250"
            src="https://randomuser.me/api/portraits/men/85.jpg"
            draggable="false"
          />
        </v-col>
        <v-col cols="12" class="login_form">
          <v-row>
            <v-col cols="12" align="center">
              <h3>ເຂົ້າສູ່ລະບົບ ສະມາຊິກ</h3>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-text-field
                label="ເບີໂທລະສັບ"
                name="username"
                placeholder="ກະລຸນາປ້ອນເບີໂທລະສັບ"
                prepend-inner-icon="mdi-phone"
                color="grey darken-1"
                style="font-size: 14px"
                outlined
              />
            </v-col>

            <v-col cols="12" class="py-0">
              <v-text-field
                prepend-inner-icon="mdi-lock"
                label="ລະຫັດຜ່ານ"
                outlined
                placeholder="ກະລຸນາປ້ອນລະຫັດຜ່ານ"
                name="password"
                :type="show ? 'text' : 'password'"
                color="grey darken-1"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                style="font-size: 14px"
              />
            </v-col>

            <v-col cols="12" class="pt-0">
              <!--   :disabled="username === '' || password === ''"-->
              <v-btn
                color="red"
                style="
                  width: 100%;
                  color: white;
                  height: 50px;
                  font-size: 18px;
                  border-radius: 50px;
                "
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
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      username: '',
      password: '',
      show: false,
    }
  },
  mounted() {},
  methods: {},
  computed: {
  },
  methods: {

  },
}
</script>

<style scoped>
.login_form {
  display: flex;
  justify-content: center;
}
</style>

