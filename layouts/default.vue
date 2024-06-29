<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>John Leider</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
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
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import secureStorage from '~/plugins/secure-storage'
import { mapActions, mapState } from "vuex";
export default {
  name: "DefaultLayout",
  // middleware: ["checkAuth"],
  data() {
    return {
      drawer: true,
      items: [
        { title: "ຂາຍ", icon: "mdi-gold", path: "/sell/", color: "goldColor" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
      mini: true,
    };
  },
  computed: {},
  created() {},
  destroyed() {},
  methods: {
    myRouting(path) {
      this.$router.push(path);
    },
  },
  mounted() {},
};
</script>
<style scoped></style>
