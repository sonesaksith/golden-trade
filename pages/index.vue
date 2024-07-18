<template>
  <div></div>
</template>

<script>
import secureStorage from '~/plugins/secure-storage';
export default {
  // middleware: ["checkAuth"],
  name: 'IndexPage',
  data() {
    return {};
  },
  mounted() {
    if (secureStorage.getItem("token")) {
      this.$router.replace({ path: "/Sell" });
    } else {
      this.$router.replace({ path: "/authen/login" });
    }
  },
  computed: {},
  methods: {},
};
</script>
