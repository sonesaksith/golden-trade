<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      left
      temporary
      fixed
      app
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
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title><h4>ອອກ​ຈາກ​ລະ​ບົບ</h4></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="rightDrawer"
      right
      temporary
      
      app
      width="35vh"
    >
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Right Drawer Item 1</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Right Drawer Item 2</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- Add more items as needed -->
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar app>
      <!-- <v-btn icon @click="toggleRightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
      <v-toolbar-title>My Application</v-toolbar-title>
    
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleRightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid class="pa-0">
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
  data() {
    return {
      rightDrawer: false,
      drawer: true,
      drawerr: true,
      items: [
        { title: "ຂາຍ", icon: "mdi-gold", path: "/sell", color: "goldColor" },
        {
          title: "ຊື້ເຂົ້າ",
          icon: "mdi-cash-sync",
          path: "/buy",
          color: "success",
        },
      ],
      mini: true,
      minii: true,
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
    toggleRightDrawer() {
      this.rightDrawer = !this.rightDrawer;
    },
  },
};
</script>
<style scoped>
.v-list .v-list-item--active .v-icon {
  color: #17a589 !important;
}
.v-list .v-list-item--active {
  color: #17a589 !important;
  font-weight: bold;
}
</style>
