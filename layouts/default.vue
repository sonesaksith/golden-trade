<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      fixed
      app
      width="180"
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <img
            style="width: 50px; height: 50px"
            src="../assets/images/kimbup.jpeg"
          />
        </v-list-item-avatar>

        <v-list-item-title style="display: flex"
          ><h2 style="color: #3498db">P</h2>
          <h2 style="color: #f7bf11">O</h2>
          <h2 style="color: #17a589">S</h2></v-list-item-title
        >

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group>
          <v-list-item
            v-for="(item, index) in items"
            :key="item.title"
            link
            @click="myRouting(item.path)"
          >
            <v-list-item-icon>
              <v-icon :color="item.color">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                ><h4 class="my-1">{{ item.title }}</h4></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="logout">
            <v-list-item-icon>
              <v-icon color="error">mdi-login-variant</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title><h4>ອອກ​ຈາກ​ລະ​ບົບ</h4></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <GlobalsHeader />
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import secureStorage from "~/plugins/secure-storage";
import { mapActions, mapState } from "vuex";
export default {
  name: "DefaultLayout",
  middleware: ["checkAuth"],
  data() {
    return {
      drawer: false,
      items: [
        {
          title: "ຂາຍ",
          icon: "mdi-cash-multiple",
          path: "/sell",
          color: "goldColor",
        },
        {
          title: "ຊື້ເຂົ້າ",
          icon: "mdi-cash-sync",
          path: "/buy",
          color: "success",
        },
        {
          title: "ປະຫວັດການຊື້ເຂົ້າ",
          icon: "mdi-cash-clock",
          path: "/historybuy",
          color: "info",
        },
        {
          title: "ເທີນ",
          icon: "mdi-swap-horizontal",
          path: "/change",
          color: "primary",
        },
      ],
      mini: true,
    };
  },
  computed: {},
  created() {},
  destroyed() {},
  mounted() {},
  methods: {
    myRouting(path) {
      this.$router.push(path);
    },
    logout() {
      secureStorage.removeItem("token");
      secureStorage.removeItem("userinfo");
      this.$axios.setHeader("Authorization", null);
      this.$router.replace("/authen/login");
    },
  },
};
</script>
<style scoped>
/* .v-list .v-list-item--active .v-icon {
  color: #DAA520 !important;
}
.v-list .v-list-item--active {
  color: #DAA520 !important;
  font-weight: bold;
} */
</style>
