<template>
  <div>
    <ChangeStepper :step="steps" ref="exchangeStepper" />
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import Change from "../../components/Change";
import Buy from "../../components/Buy";
import Sell from "../Sell";
import Customer from "../../components/Customer";

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
          content: {
            component: Buy,
            props: {
              // Add your props here
              isExchange: true,
              handlePressNext: () => {
                this.$refs.exchangeStepper.nextStep();
              },
            },
          },
        },
        {
          id: 2,
          title: "ຂາຍອອກ",
          content: {
            component: Sell,
            props: {
              // Add your props here
              isExchange: true,
              handlePressNext: () => {
                this.$refs.exchangeStepper.nextStep();
              },
            },
          },
        },
        {
          id: 3,
          title: "ລູກຄ້າ",
          content: {
            component: Customer,
            props: {
              isExchange: true,
            },
          },
        },
        {
          id: 4,
          title: "ສະຫຼຸບບິນ",
          content: {
            component: Change,
            props: {
              // Add your props here
              isExchange: true,
            },
          },
        },
      ],
    };
  },
  mounted() {
    this.setHeader("ເທີນຄຳ");
  },
  methods: {
    ...mapActions("main", ["setHeader"]),
  },
};
</script>
<style lang="scss"></style>
