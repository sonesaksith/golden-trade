<template>
  <div
    class="d-flex justify-center align-center"
    style="width: 100vw; height: 93vh; margin-top: 20px"
  >
    <v-container>
      <v-row>
        <v-col v-for="(item, index) in menus" :key="index" cols="6" sm="4">
          <v-card
            @click="myRouting(item.path)"
            color="#FFFFFF"
            style="
              width: 250px;
              height: 250px;

              display: flex;
              align-items: center;
              justify-content: center;
            "
            rounded="xl"
          >
            <div style="text-align: center; padding: 8px">
              <v-icon v-text="item.icon" color="#354154" size="80"></v-icon>

              <h1 class="#354154--text">{{ item.title }}</h1>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import secureStorage from "~/plugins/secure-storage";
export default {
  // middleware: ["checkAuth"],
  name: "IndexPage",
  data() {
    return {
      menus: [
        {
          title: "ຊື້ - ຂາຍ",
          path: "/newsell",
          icon: "mdi-cart-outline",
        },
        // {
        //   title: "ຊື້",
        //   path: "/buy",
        //   icon: "mdi-cash-multiple",
        // },
        // {
        //   title: "ປ່ຽນ",
        //   path: "/change",
        //   icon: "mdi-swap-horizontal-bold",
        // },
        {
          title: "ປະຫວັດຂາຍ",
          path: "/historysell",
          icon: "mdi-clipboard-text-clock-outline",
        },
        {
          title: "ປະຫວັດຊື້",
          path: "/historybuy",
          icon: "mdi-clipboard-text-clock-outline",
        },
        {
          title: "ປະຫວັດເທີນ",
          path: "/historytrun",
          icon: "mdi-clipboard-text-clock-outline",
        },
        // {
        //   title: "ປະຫວັດປ່ຽນ",
        //   path: "/change",
        //   icon: "mdi-clipboard-text-clock-outline",
        // },
        {
          title: "ທອງ",
          path: "gold",
          icon: "mdi-gold",
        },
        {
          title: "ລູກຄ້າ",
          path: "/customer/list",
          icon: "mdi-account-group-outline",
        },
        {
          title: "ລາຄາຄຳ",
          path: "/rate",
          icon: "mdi-chart-areaspline",
        },
      ],
    };
  },
  mounted() {
    // if (secureStorage.getItem("token")) {
    //   this.$router.replace({ path: "/Sell" });
    // } else {
    //   this.$router.replace({ path: "/authen/login" });
    // }
  },
  computed: {},
  methods: {
    myRouting(path) {
      this.$router.push(path);
    },
  },
};
</script>
