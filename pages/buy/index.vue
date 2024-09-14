<template>
  <Buy />
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
export default {
  // middleware: ["checkAuth"],
  data() {
    return {};
  },
  mounted() {
    this.setHeader("ຊື້ເຂົ້າ");
    this.$store.commit("customer/SET_GOING_TO_BILL", "buy");
    this.$store.commit("main/SET_HEADER_TITLE", "ຊື້");
  },
  computed: {},
  methods: {
    ...mapActions("main", ["setHeader"]),
  },
};
</script>
