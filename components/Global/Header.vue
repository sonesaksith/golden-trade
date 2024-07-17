<template>
  <div>
    <v-card
      flat
      tile
      elevation="0"
      style="position: fixed; top: 0; height: 57px; z-index: 99; width: 100%"
    >
      <v-toolbar
        color="#FFD169"
        dense
        align="center"
        height="57px"
        elevation="0"
      >
        <div
          align="center"
          style="color: white; font-weight: bold; width: 100%; font-size: 20px"
        >
          {{ header?.title }}
        </div>
      </v-toolbar>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("main", ["header"]),
  },
  methods: {},
};
</script>
<style></style>
