<template>
  <div>
    <!-- <Change /> -->
    <ChangeStepper :step="steps" />
  </div>
</template>
<script>
import Change from "../../components/Change";
import Buy from "../../components/Buy";
import Sell from "../Sell";

export default {
  components: {
    Change,
  },
  data() {
    return {
      steps: [
        {
          id: 1,
          title: "ຊື້ເຂົ້າ",
          content: Buy,
        },
        {
          id: 2,
          title: "ຂາຍອອກ",
          content: Sell,
        },
        {
          id: 3,
          title: "ສະຫຼຸບຍອດ",
          content: Change,
        },
      ],
    };
  },
};
</script>
<style lang="scss"></style>
