<template>
  <v-app>
    <!-- <v-navigation-drawer
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
    </v-navigation-drawer> -->
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      elevation="5"
      color="goldColor"
      class="white--text"
    >
      <v-row>
        <v-col
          :cols="mobileDevice ? '8' : '12'"
          sm="4"
          class="d-flex align-center justify-start"
        >
          <h3 style="cursor: pointer">ຮ້ານຄຳ ຫວຽດສະຫວັນ</h3>
        </v-col>

        <v-col cols="12" sm="8" style="overflow-x: auto">
          <div class="d-flex align-center justify-end">
            <div :class="focusingMenu === 1 ? 'onFocusMenu' : ''">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn text v-bind="attrs" v-on="on" class="white--text">
                    ການຂາຍ
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="myRouting('/sell', 1)">
                    <v-list-item-title>ຂາຍ</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="myRouting('/historysell', 1)">
                    <v-list-item-title>ປະຫວັດການຂາຍ</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <div :class="focusingMenu === 2 ? 'onFocusMenu' : ''">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn text v-bind="attrs" v-on="on" class="white--text">
                    ການຊື້
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="myRouting('/buy', 2)">
                    <v-list-item-title>ຊື້</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="myRouting('/historybuy', 2)">
                    <v-list-item-title>ປະຫວັດການຊື້</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <div :class="focusingMenu === 3 ? 'onFocusMenu' : ''">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn text v-bind="attrs" v-on="on" class="white--text">
                    ການປ່ຽນ
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="myRouting('/change', 3)">
                    <v-list-item-title>ປ່ຽນ</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="myRouting('/change', 3)">
                    <v-list-item-title>ປະຫວັດການປ່ຽນ</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <div :class="focusingMenu === 4 ? 'onFocusMenu' : ''">
              <v-btn text class="white--text" @click="myRouting('/gold', 4)">
                ທອງ
              </v-btn>
            </div>
            <div :class="focusingMenu === 5 ? 'onFocusMenu' : ''">
              <v-btn
                text
                class="white--text"
                @click="myRouting('/customer/list', 5)"
              >
                ລູກຄ້າ
              </v-btn>
            </div>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon size="40" color="white">
                    mdi-account-circle-outline
                  </v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item @click="logout">
                  <v-list-item-icon>
                    <v-icon color="error">mdi-logout-variant</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>ອອກ​ຈາກ​ລະ​ບົບ</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <!-- <GlobalsHeader /> -->
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
      drawer: true,
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
          title: "ປະຫວັດການຂາຍ",
          icon: "mdi-cash-clock",
          path: "/historysell",
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
  computed: {
    ...mapState("main", ["focusingMenu"]),
  },
  created() {},
  destroyed() {},
  mounted() {},
  methods: {
    myRouting(path, focusing) {
      this.$store.commit("main/SET_FOCUSING_MENU", focusing);
      this.$router.push(path);
    },
    logout() {
      secureStorage.removeItem("token");
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
.onFocusMenu {
  border-bottom: 2px solid white;
  transition: border-bottom 0.1s ease;
}
.onHover:hover {
  background-color: whitesmoke;
}
</style>
