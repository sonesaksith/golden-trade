<template>
  <v-dialog v-model="dialog" max-width="800">
    <v-card>
      <v-img
        :src="img"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.3)"
        height="400px"
        style="object-fit: cover"
      >
      </v-img>
      <v-card-title> ທອງຄຳ </v-card-title>
      <v-card-subtitle>
        ທອງຄຳຮູບປະພັນນ້ຳໜັກ 1 ບາດ Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Rerum enim est perferendis praesentium consequuntur.
        Numquam recusandae aspernatur eum dicta, nisi libero blanditiis, cumque
        vitae at quam sed odit molestias quia?
      </v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded color="goldColor" style="color: white" class="py-3 px-1">
          <v-icon class="rounded-circle pa-1 white" color="goldColor">
            mdi-cart-minus
          </v-icon>
          &nbsp; ເພີ່ມເຂົ້າກະຕ່າ
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      img: "",
    };
  },
};
</script>
