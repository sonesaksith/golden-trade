<template>
  <HistorySell />
</template>
<script>
export default {
  // middleware: ["checkAuth"],
  data() {
    return {};
  },
  mounted() {
    this.$store.commit("main/SET_HEADER_TITLE", "ປະຫວັດການຂາຍ");
  },
  computed: {},
  methods: {},
};
</script>
