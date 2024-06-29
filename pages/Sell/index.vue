<template>
  <div>
    <SellShowdetails ref="refShowdetail" />
    <v-row>
      <v-col
        cols="12"
        style="position: sticky; top: 0; z-index: 1"
        class="white py-5 elevation-2"
      >
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              outlined
              dense
              hide-details="auto"
              class="rounded-lg"
              label="ຄົ້ນຫາ"
            >
              <template #append>
                <v-btn small icon class="goldColor" color="white">
                  <v-icon small>mdi-magnify</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="9" sm="4">
            <v-select
              v-model="modelGoldType"
              :items="goldTypes"
              :item-text="(item) => item.typeName"
              :item-value="(item) => item.id"
              label="ປະເພດທອງຄຳ"
              outlined
              dense
              hide-details="auto"
              class="rounded-lg"
            ></v-select>
          </v-col>
          <v-col cols="3" sm="4" class="d-flex justify-end pr-6 pt-5">
            <v-badge
              v-if="numberCart > 0"
              bordered
              color="primary"
              :content="numberCart"
            >
              <v-icon color="goldColor">mdi-cart</v-icon>
            </v-badge>
            <v-icon v-else color="goldColor">mdi-cart</v-icon>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col
            cols="12"
            v-for="(item, index) in listProducts"
            :key="index"
            sm="4"
            md="3"
          >
            <v-card>
              <v-img
                @click="onShowDetails(item)"
                :src="item.img"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.3)"
                height="200px"
              >
                <v-card-title> ທອງຄຳ </v-card-title>
              </v-img>
              <v-card-subtitle @click="onShowDetails(item)">
                <v-expand-transition>
                  <div :class="!show ? 'truncate ' : ''">
                    ທອງຄຳຮູບປະພັນນ້ຳໜັກ 1 ບາດ Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Rerum enim est perferendis
                    praesentium consequuntur. Numquam recusandae aspernatur eum
                    dicta, nisi libero blanditiis, cumque vitae at quam sed odit
                    molestias quia?
                  </div>
                </v-expand-transition>
              </v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  rounded
                  color="goldColor"
                  style="color: white"
                  class="py-3 px-1"
                  @click="numberCart += 1"
                >
                  <v-icon class="rounded-circle pa-1 white" color="goldColor">
                    mdi-cart-minus
                  </v-icon>
                  &nbsp; ເພີ່ມເຂົ້າກະຕ່າ
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      goldTypes: [
        {
          id: 1,
          typeName: "ທອງຮູບປະພັນ",
        },
        {
          id: 2,
          typeName: "ທອງຄຳແທ່ງ",
        },
      ],
      modelGoldType: 1,
      numberCart: 0,
      listGoldJewellery: [
        { img: "/chain.jpg" },
        { img: "/necklace.jpg" },
        { img: "/chain.jpg" },
        { img: "/necklace.jpg" },
        { img: "/chain.jpg" },
        { img: "/necklace.jpg" },
        { img: "/chain.jpg" },
        { img: "/necklace.jpg" },
        { img: "/chain.jpg" },
        { img: "/necklace.jpg" },
        { img: "/chain.jpg" },
        { img: "/necklace.jpg" },
        { img: "/chain.jpg" },
        { img: "/necklace.jpg" },
        { img: "/chain.jpg" },
        { img: "/necklace.jpg" },
        { img: "/chain.jpg" },
        { img: "/necklace.jpg" },
        { img: "/chain.jpg" },
        { img: "/necklace.jpg" },
      ],
      listGoldBar: [
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
        { img: "/goldbar.png" },
      ],
    };
  },
  computed: {
    listProducts() {
      return this.modelGoldType == 1
        ? this.listGoldJewellery
        : this.listGoldBar;
    },
  },
  methods: {
    onShowDetails(item) {
      this.$refs.refShowdetail.img = item.img;
      this.$refs.refShowdetail.dialog = true;
    },
  },
};
</script>
<style>
.truncate {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
