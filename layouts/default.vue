<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent fixed app>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <img style="width: 50px; height: 50px;" src="../assets/images/kimbup.jpeg" />
        </v-list-item-avatar>

        <v-list-item-title style="display: flex;"><h2 style="color: #3498DB;">P</h2> <h2 style="color: #F7BF11;">O</h2> <h2 style="color: #17A589;">S</h2></v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" :to="item.path" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title><h4>{{ item.title }}</h4></v-list-item-title>
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
      
      <template v-slot:append>
        <!-- <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content @click="logout">
            <v-list-item-title><h4>ອອກ​ຈາກ​ລະ​ບົບ</h4></v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
      </template>
    </v-navigation-drawer>
    
    <v-main>
      <v-container fluid class="pa-0">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import secureStorage from '~/plugins/secure-storage'
import { mapActions, mapState } from "vuex";
export default {
  name: 'DefaultLayout',
  middleware: ["checkAuth"],
  data() {
    return {
      drawer: true,
      items: [
        { title: "ຫນ້າຫຼັກ", icon: "mdi-home", path: '/stock', },
        { title: "ບັນ​ຊີ​ຂອງ​ຂ້ອຍ", icon: "mdi-account", path: '/profile', },
        { title: "ຜູ້ໃຊ້", icon: "mdi-account-group-outline", path: '/users', },
      ],
      mini: true,
    };
  },
  computed: {},
  created() {},
  destroyed() {},
  mounted() {},
  methods: {
    logout() {
      secureStorage.removeItem('token')
      secureStorage.removeItem('userinfo')
      this.$axios.setHeader('Authorization', null)
      this.$router.replace('/authen/login')
    }
  },
};
</script>
<style scoped>
.v-list .v-list-item--active .v-icon {
  color: #17A589 !important;
}
.v-list .v-list-item--active {
  color: #17A589 !important;
  font-weight: bold;
}
</style>
