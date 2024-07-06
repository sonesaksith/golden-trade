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
      this.$router.replace({ path: "/" });
    }
  },
  computed: {},
  methods: {},
};
</script>
