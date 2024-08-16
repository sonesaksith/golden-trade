<template>
  <v-app dark>
    <div>
      <main>
        <v-app-bar
          v-if="isMenuPage"
          color="goldColor"
          height="100"
          style="margin-bottom: 20px"
        >
          <div style="text-align: center; width: 100%">
            <h1 class="white--text">ຮ້ານຄຳ ຫວຽດສະຫວັນ</h1>
          </div>
        </v-app-bar>
        <v-app-bar
          v-else
          color="goldColor"
          height="100"
          style="margin-bottom: 20px"
        >
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: start;
              width: 100%;
            "
          >
            <v-icon color="white" size="70" @click="goBack()"
              >mdi-chevron-left</v-icon
            >
            <h1 class="white--text">{{ title }}</h1>
          </div>
        </v-app-bar>
        <Nuxt />
      </main>
    </div>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "empty",
  data() {
    return {
      isMenuPage: false,
    };
  },
  watch: {
    "$route.path"(newPath, oldPath) {
      this.handlePathChange(newPath, oldPath);
    },
  },
  mounted() {
    if (this.$route.path === "/") {
      this.isMenuPage = true;
    } else {
      this.isMenuPage = false;
    }
  },
  computed: {
    ...mapState("main", ["title"]),
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    handlePathChange(newPath, oldPath) {
      console.log("--->", newPath);
      if (newPath === "/") {
        this.isMenuPage = true;
      } else {
        this.isMenuPage = false;
      }
    },
  },
};
</script>
