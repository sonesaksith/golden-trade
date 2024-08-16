<template>
  <div>
    <CustomerTablecus />
  </div>
</template>
<script>
export default {
  // layout: "empty",
  mounted() {
    this.$store.commit("main/SET_HEADER_TITLE", "ລູກຄ້າ");
  },
};
</script>
