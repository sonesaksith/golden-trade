<template>
  <div>
    <ChangeStepper :step="steps" ref="exchangeStepper" />
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import Change from "../../components/Change";
import ChangeBill from "../../components/Change/Bill.vue";
import ChangeBuyIntoChange from "../../components/Change/BuyIntoChange.vue";
import ChangeSellOuttoChange from "../../components/Change/SellOuttoChange.vue";
import CustomerTablecus from "../../components/Customer/Tablecus.vue";

export default {
  data() {
    return {
      steps: [
        {
          id: 1,
          title: "ຊື້ເຂົ້າ",
          content: {
            component: ChangeBuyIntoChange,
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
            component: ChangeSellOuttoChange,
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
            component: CustomerTablecus,
            props: {
              isExchange: true,
              handlePressNext: () => {
                this.$refs.exchangeStepper.nextStep();
              },
            },
          },
        },
        {
          id: 4,
          title: "ສະຫຼຸບບິນ",
          content: {
            component: ChangeBill,
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
    this.$store.commit("customer/SET_GOING_TO_BILL", "turn");
  },
  methods: {
    ...mapActions("main", ["setHeader"]),
  },
};
</script>
<style lang="scss"></style>
