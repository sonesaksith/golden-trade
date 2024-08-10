<template>
  <div>
    <v-form ref="form" lazy-validation>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="800px">
          <v-card style="border-radius: 10px">
            <v-card-title style="justify-content: center; align-items: center">
              <span>ລາຍລະອຽດ</span>
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="items?.listItems"
                class="elevation-1"
                disable-sort
                no-data-text="ບໍ່ມີຂໍ້ມູນ"
                loading-text="Loading..."
                width="400"
              >
                <template #[`item.no`]="{ index }">
                  <span>{{ index + 1 }} </span>
                </template>
                <template #item.name="{ index, item }">
                  <div>{{ item.name ? item.name : "-" }}</div>
                </template>
                <template #item.shape="{ index, item }">
                  <div>{{ item.shape ? item.shape : "-" }}</div>
                </template>
                <template #item.shapeLine="{ index, item }">
                  <div>{{ item.shapeLine ? item.shapeLine : "-" }}</div>
                </template>
                <template #item.lost="{ index, item }">
                  <div>{{ item.lost ? $formatnumber(item.lost) : "-" }}</div>
                </template>
              </v-data-table>
            </v-card-text>
            <v-card-actions>
              <v-btn
                outlined
                class="rounded-lg"
                style="width: 50%"
                @click="print()"
              >
                <v-icon>mdi-printer</v-icon> ພິມໃບບິນໃໝ່
              </v-btn>
              <v-btn
                style="
                  color: #fff;
                  border-radius: 10px;
                  background-color: #e53935;
                  width: 50%;
                "
                text
                @click="dialog = false"
              >
                ອອກ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-form>
    <div v-if="items" style="display: none">
      <BuyBill
        :key="1"
        :myCus="items?.cus"
        :billNo="items?.billNo"
        :currentDateTime="items?.date"
        :currentDate="items?.date?.substring(0, 10)"
        :totalPrice="totalPrice"
        :totalLost="totalLost"
        :totalPayment="totalPayment"
        ref="myCompBill"
        />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      items: [],
      totalPrice: 0,
      totalLost: 0,
      totalPayment: 0,
      headers: [
        {
          text: "ລຳດັບ",
          align: "center",
          sortable: false,
          value: "no",
          width: "50px",
          class: " darken-2 text-subtitle-2 font-weight-black",
        },
        {
          text: 'ປະເພດທອງຄຳ',
          align: 'center',
          value: 'name',
          width: '120px',
          class: ' darken-2 text-subtitle-2 font-weight-black',
        },
        { text: 'ຮູບປະພັນ', align: 'center', value: 'shape', width: '100px', class: ' darken-2 text-subtitle-2 font-weight-black', },
        { text: 'ລາຍຮູບປະພັນ', align: 'center', value: 'shapeLine', width: '120px', class: ' darken-2 text-subtitle-2 font-weight-black', },
        { text: 'ຄວາມບໍລິສຸດທອງ', align: 'center', value: 'purity', width: '150px', class: ' darken-2 text-subtitle-2 font-weight-black', },
        { text: 'ຫັກຄ່າຫຼູ້ຍຫ້ຽນ', align: 'center', value: 'lost', width: '120px', class: ' darken-2 text-subtitle-2 font-weight-black', },
        { text: 'ນ້ຳໜັກທອງຄຳ', align: 'center', value: 'weight', width: '120px', class: ' darken-2 text-subtitle-2 font-weight-black', },
        { text: 'ປະເພດນ້ຳໜັກ', align: 'center', value: 'weightType', width: '120px', class: ' darken-2 text-subtitle-2 font-weight-black', },
        { text: 'ລາຄາ', align: 'center', value: 'price', width: '120px', class: ' darken-2 text-subtitle-2 font-weight-black', },
        { text: 'ຈໍາ​ນວນ', align: 'center', value: 'amount', width: '80px', class: ' darken-2 text-subtitle-2 font-weight-black', },
      ],
    };
  },
  mounted() {
    console.log(this.items);
  },
  computed: {},
  methods: {
    async print() {
      try {
        console.log(this.items);
        this.$refs.myCompBill.OnPrintBill();
      } catch (error) {
        console.log(error);
        this.$swal({
          text: "ບໍ່ມີຂໍ້ມູນ",
          type: "info",
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: true,
        });
      } 
    },
  },
};
</script>

<style></style>
