<template>
  <div>
    <CustomerAdd ref="addCusRef" />
    <v-dialog v-model="dialog">
      <v-card style="min-height: 650px">
        <v-container>
          <v-row>
            <v-col cols="9" sm="7" class="pr-0">
              <v-text-field
                v-model="search"
                dense
                hide-details="auto"
                outlined
                label="ຄົ້ນຫາ"
              ></v-text-field>
            </v-col>
            <v-col cols="3" sm="2" class="pl-1">
              <v-btn color="goldColor" dark>ຄົ້ນຫາ</v-btn>
            </v-col>

            <v-col cols="12" sm="3" align="right">
              <v-btn color="primary" @click="onAddCus()">ເພີ່ມລູກຄ້າ</v-btn>
            </v-col>
            <v-col cols="12" style="max-height: 600px; overflow-y: auto">
              <div v-for="(item, index) in filteredData" class="py-2">
                <div class="d-flex align-center">
                  <div
                    class="d-flex align-center justify-center"
                    style="width: 8%"
                  >
                    {{ index + 1 }}
                  </div>
                  <div style="width: 80%">
                    <div>
                      {{ item.customer_name }} {{ item.customer_surname }}
                    </div>
                    <div>{{ item.customer_tel }}</div>
                  </div>
                  <div
                    class="d-flex align-center justify-center"
                    style="width: 15%"
                  >
                    <v-icon color="success" @click="onSelectCus(item)"
                      >mdi-check-bold</v-icon
                    >
                  </div>
                </div>
                <v-divider class="mt-2"></v-divider>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      search: "",
    };
  },
  computed: {
    ...mapState("customer", ["listCustomer", "selectingCus"]),
    ...mapState("newsell", ["cusData"]),
    filteredData() {
      const search = String(this.search || "")
        .trim()
        .toLowerCase();
      return this.cusData.filter((item) => {
        const matchesSearch =
          item.customer_name.toLowerCase().includes(search) ||
          item.customer_surname.toLowerCase().includes(search) ||
          item.customer_tel.toLowerCase().includes(search);

        return matchesSearch;
      });
    },
  },
  methods: {
    onSelectCus(item) {
      this.$store.commit("customer/SET_SELECTING_CUSTOMER", item);
      this.dialog = false;
    },
    onAddCus() {
      this.dialog = false;
      this.$refs.addCusRef.dialog = true;
    },
  },
};
</script>
