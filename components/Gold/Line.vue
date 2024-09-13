<template>
  <v-dialog v-model="dialog" width="1000">
    <v-form ref="form" v-model="valid">
      <v-card>
        <v-card-title style="background-color: #e7e6e6">
          <div style="display: flex; width: 100%; align-items: center; justify-content: center;">
            <div style="display: flex; align-items: center">
              <v-icon large color="grey">mdi-notebook-plus-outline</v-icon>
              <h4 class="mx-2">ເພີ່ມລາຍ</h4>
            </div>
            <v-spacer></v-spacer>
            <div style="border-radius: 100%; width: 40px; height: 40px; background-color: white; display: flex; align-items: center; justify-content: center">
              <v-icon @click="onClose()" large color="grey">mdi-close</v-icon>
            </div>
          </div>
          <!-- <v-row>
            <v-col cols="9" sm="10" style="display: flex; align-items: start; justify-content: start;">
              ເພີ່ມລາຍ
            </v-col>
            <v-col cols="3" sm="2" style="display: flex; align-items: end; justify-content: end;">
              <v-btn @click="onClose()" color="error">ຍົກເລີກ</v-btn>
            </v-col>
          </v-row> -->
        </v-card-title>
        <v-card-text>
          <div style="display: flex;" class="pb-6 mt-4">
            <div style="display: flex; align-items: center; justify-content: center; min-width: 100%;">
              <v-text-field
                v-model="name"
                dense
                label="ຊື່ລາຍ"
                hide-details="auto"
                outlined
              ></v-text-field>
              <v-btn @click="onAdd()" class="mx-1" style="height: 40px;" color="primary">ເພີ່ມ</v-btn>
            </div>
          </div>
          <v-row>
            <!-- <v-col cols="9" sm="10" style="display: flex; align-items: center; justify-content: center;">
              <v-text-field
                v-model="name"
                dense
                label="ຊື່ລາຍ"
                hide-details="auto"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="3" sm="2" style="display: flex; align-items: center; justify-content: end;">
              <v-btn @click="onAdd()" class="mx-1" color="primary">ເພີ່ມ</v-btn>
            </v-col> -->
            <v-col cols="12">
              <v-data-table
                :headers="headers"
                :items="lines"
                :page.sync="page"
                class="elevation-1 rounded-lg"
                :items-per-page="limit"
                fixed-header
                height="550"
                hide-default-footer
                loading-text="ກຳລັງໂຫລດຂໍ້ມູນ..."
                :loading="loading"
                no-data-text="ບໍ່ມີຂໍ້ມູນ"
                :search="search"
              >
                <template v-slot:header="props">
                  <tr style="background-color: rgba(0, 0, 0, 0.09)">
                    <td
                      colspan="9"
                      style="padding: 10px; padding-left: 20px"
                      align="left"
                    >
                      <h3 style="font-size: 18px; color: gray">
                        ສິນຄ້າທັງໝົດ:
                        <b style="font-size: 18px; color: #c62828">
                          {{ lines.length || 0 }}
                        </b>
                      </h3>
                    </td>
                  </tr>
                </template>
                <template #footer>
                  <div
                    style="
                      border-top: thin solid rgba(0, 0, 0, 0.12);
                      display: flex;
                      align-items: center;
                      justify-content: flex-end;
                    "
                  >
                    <div class="mx-2">
                      <span>ຈຳນວນແຖວ</span>
                    </div>
                    <div class="mx-2">
                      <v-select
                        v-model="limit"
                        style="width: 50px"
                        :items="listLimit"
                        @change="page = 1"
                      ></v-select>
                    </div>

                    <div class="mx-2">
                      <span v-if="totalPage > 0">
                        {{ page }}-{{ totalPage }}
                      </span>
                      <span v-else> --- </span>
                    </div>
                    <div class="ml-2 mr-1">
                      <v-icon @click="page > 1 ? (page -= 1) : void 0">
                        mdi-chevron-left
                      </v-icon>
                    </div>

                    <div class="mr-2">
                      <v-icon @click="page < totalPage ? (page += 1) : void 0">
                        mdi-chevron-right
                      </v-icon>
                    </div>
                  </div>
                </template>
                <template #item.no="{ index, item }">
                  <div>
                    {{ ((page || 1) - 1) * limit + index + 1 }}
                  </div>
                </template>
                <template #[`item.create_at`]="{ item }">
                  <span>{{
                    item.create_at ? $FormatDateTime(item.create_at) : "-"
                  }}</span>
                </template>
                <template #[`item.update_at`]="{ item }">
                  <span>{{
                    item.update_at ? $FormatDateTime(item.update_at) : "-"
                  }}</span>
                </template>
                <template #item.actions="{ index, item }">
                  <div class="d-flex justify-center align-center">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          @click="onOpenUpdate(item, index)"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon color="primary">
                            mdi-square-edit-outline
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>ແກ້ໄຂຊື່ລາຍ</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          @click="onDelete(item?.lai_id)"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon color="error">
                            mdi-delete-empty-outline
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>ລົບລາຍ</span>
                    </v-tooltip>
                  </div>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-card-text>
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="onAdd()" color="primary" text>ເພີ່ມ</v-btn>
          <v-btn @click="onClose()" color="error" text>ຍົກເລີກ</v-btn>
        </v-card-actions> -->
      </v-card>
    </v-form>
    <GoldDeleteLine ref="GoldDeleteLine" v-on:getLines="getLines" />
    <GoldUpdateLine ref="GoldUpdateLine" v-on:getLines="getLines" />
  </v-dialog>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      name: "",
      search: "",
      listLimit: [5, 10, 15, 20, 30, 50],
      loading: true,
      page: 1,
      limit: 15,
      valid: false,
      headers: [
        {
          text: "ລຳດັບ",
          value: "no",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-2",
          width: "10px",
          sortable: false,
          align: "center",
        },
        {
          text: "ຊື່ລາຍ",
          value: "lai_name",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          width: "80px",
          align: "center",
          sortable: false,
        },
        {
          text: "ສ້າງເມື່ອ",
          value: "create_at",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          width: "150px",
          align: "center",
          sortable: false,
        },
        {
          text: "ອັບເດດເມື່ອ",
          value: "update_at",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          width: "150px",
          align: "center",
          sortable: false,
        },
        {
          text: "ຈັດການ",
          value: "actions",
          class: "blue-grey lighten-4 text-subtitle-2 font-weight-black px-5",
          width: "80px",
          align: "center",
          sortable: false,
        },
      ],
      lines: [],
    };
  },
  computed: {
    totalPage() {
      return Math.ceil((this?.lines?.length || 0) / this.limit);
    },
  },
  methods: {
    ...mapActions("gold", ["CreateLines", "GetLines"]),
    onClose() {
      this.dialog = false;
      this.loading = true;
      this.$refs.form.reset();
    },
    async onAdd() {
      try {
        let item = {
          name: this.name,
        };
        const res = await this.CreateLines(item);
        if (res?.data?.status == 201 || res?.data?.msg == "success") {
          this.$swal({
            toast: true,
            text: "ເພີ່ມສຳເລັດ",
            type: "success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
          });
          this.getLines();
        }
      } catch (error) {
        console.log(error.response);
        if (error?.response?.data?.status == 301) {
          this.$swal({
            toast: true,
            text: "ກະລຸນາປ້ອນຈຂໍ້ມູນໃຫ້ຄົບ",
            type: "error",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
          });
        } else {
          this.$swal({
            toast: true,
            text: error?.response?.data?.msg,
            type: "error",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
          });
        }
      }
    },
    async getLines() {
      try {
        const newLines = await this.GetLines();
        if (newLines?.data?.status == 200) {
          this.lines = newLines?.data?.resultData;
          this.limit = 15;
          this.name = "";
        }
      } catch (error) {
        console.log(error);
      }
    },
    async onDelete(id) {
      try {
        this.$refs.GoldDeleteLine.dialog = true;
        this.$refs.GoldDeleteLine.id = id;
      } catch (error) {
        console.log(error);
      }
    },
    onOpenUpdate(items, index) {
      try {
        const item = JSON.parse(JSON.stringify(items));
        this.$refs.GoldUpdateLine.dialog = true;
        this.$refs.GoldUpdateLine.lai_name = item?.lai_name;
        this.$refs.GoldUpdateLine.lai_id = item?.lai_id;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
