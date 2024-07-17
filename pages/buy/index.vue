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
  },
  computed: {},
  methods: {
    ...mapActions("main", ["setHeader"]),
  },
};
</script>
