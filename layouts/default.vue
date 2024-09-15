<template>
  <v-app dark>
    <div>
      <main style="background-color: #f2f5f9; min-height: 100vh">
        <v-app-bar
          v-if="isMenuPage"
          color="primary"
          height="70"
          style="margin-bottom: 10px; z-index: 10"
        >
          <div style="text-align: center; width: 100%">
            <h1 class="white--text">ຮ້ານຄຳ ຫວຽດສະຫວັນ</h1>
          </div>
        </v-app-bar>
        <v-app-bar
          v-else
          color="primary"
          height="70"
          style="margin-bottom: 10px; z-index: 10"
        >
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: start;
              width: 100%;
            "
          >
            <v-icon color="white" size="40" @click="goBack()"
              >mdi-chevron-left</v-icon
            >
            &nbsp; &nbsp;
            <h2 class="white--text">{{ title }}</h2>
          </div>
        </v-app-bar>
        <Nuxt />
      </main>
    </div>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import secureStorage from "~/plugins/secure-storage";
export default {
  name: "empty",
  middleware: ["checkAuth"],
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
    this.handleGetRate();
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
    ...mapActions("rate", ["getRate"]),
    async handleGetRate() {
      this.loading = true;
      const res = await this.getRate({
        page: 1,
        limit: 1,
        search: "",
      });
      if (res?.data?.msg === "success") {
        secureStorage.setItem("rate", res.data.resultData[0]);
      }

      this.loading = false;
    },
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
