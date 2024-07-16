<template>
  <div>
    <v-container>
      <v-row>
        <!-- <v-col cols="12" sm="12" md="12" lg="12" xl="12">
          <h4>
            <span style="color: brown">{{ "#" }}</span>
            ລູກຄ້າ
          </h4>
        </v-col> -->
        <v-col cols="10" sm="3" xs="12">
          <v-text-field
            outlined
            dense
            hide-details="auto"
            class="rounded-lg"
            label="ຄົ້ນຫາ"
            v-model="searchGoldTypes"
          >
            <template #append>
              <v-btn small icon class="goldColor" color="white">
                <v-icon small>mdi-magnify</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-col></v-row
      >
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      customer_list: [
        {
          id: 1,
          tel: "+1-549-414-7700",
          name: "OvEBlt",
          surname: "HgUCeLLeD",
          address: "9938 LUkbKnObI Street, PhTGBi City, aaGQ State, 54966",
        },
        {
          id: 2,
          tel: "+1-148-529-9260",
          name: "oDTTt",
          surname: "OolVVzTTZ",
          address: "8811 jRqENqZYb Street, OntykDQ City, ZLaZAE State, 88710",
        },
        {
          id: 3,
          tel: "+1-494-276-8794",
          name: "xKLgrEBRa",
          surname: "LOEn",
          address: "4202 qnNxetie Street, jBClo City, lSWoh State, 28821",
        },
        {
          id: 4,
          tel: "+1-417-916-4830",
          name: "JIq",
          surname: "yEopc",
          address:
            "8703 BdVcOWxNlD Street, HhZaDikFE City, mGoPiqtNf State, 92638",
        },
        {
          id: 5,
          tel: "+1-729-967-7751",
          name: "OkN",
          surname: "Snp",
          address: "8419 tCLUrJEte Street, kxwbrZ City, KxHqzqEz State, 47104",
        },
        {
          id: 6,
          tel: "+1-183-246-6597",
          name: "wwmnflNE",
          surname: "lnbEpuYc",
          address: "5248 bASGLrd Street, hbDqa City, IWxV State, 75526",
        },
        {
          id: 7,
          tel: "+1-176-550-6837",
          name: "wxYghdLfb",
          surname: "WWrxct",
          address: "9551 HMV Street, hIklONMRiA City, rGfvo State, 60763",
        },
        {
          id: 8,
          tel: "+1-591-137-1547",
          name: "LraE",
          surname: "sIzXE",
          address:
            "6962 HvJNUyhhsb Street, ynMKizoHM City, zZLoFX State, 69938",
        },
        {
          id: 9,
          tel: "+1-416-169-8737",
          name: "HdUcRz",
          surname: "VQAZfpIrcL",
          address: "6903 vIDcKAQj Street, tNQikR City, LHXiK State, 63449",
        },
        {
          id: 10,
          tel: "+1-142-594-3398",
          name: "dSmOJDGm",
          surname: "PGuzCZBcPFrK",
          address: "9419 gOBF Street, xrEywYVSru City, PbYT State, 82375",
        },
        {
          id: 11,
          tel: "+1-977-573-9731",
          name: "arxUDDou",
          surname: "UXWgCDrvgS",
          address: "3219 ekSMkHXh Street, HjrOT City, xWN State, 62553",
        },
        {
          id: 12,
          tel: "+1-685-341-2760",
          name: "khbPz",
          surname: "QxZedr",
          address: "2202 jfxttVurz Street, WuqVMtEhY City, FyD State, 65182",
        },
        {
          id: 13,
          tel: "+1-481-296-9469",
          name: "PgVWeIDnA",
          surname: "ALZtSAgxFiqp",
          address: "2363 DOfwSJfUE Street, TAv City, ErQ State, 61980",
        },
        {
          id: 14,
          tel: "+1-697-395-8297",
          name: "HxK",
          surname: "ACwnNH",
          address: "1516 lwqtnD Street, eqeG City, ckFhgvTpO State, 41019",
        },
        {
          id: 15,
          tel: "+1-789-423-2664",
          name: "nlvlNj",
          surname: "ixqM",
          address: "6964 MpzwxqA Street, IAqDH City, aDlnzQZfx State, 37322",
        },
        {
          id: 16,
          tel: "+1-850-710-8919",
          name: "JnE",
          surname: "VqbYLB",
          address: "5343 tFH Street, aRGfLAogw City, fDQS State, 79289",
        },
        {
          id: 17,
          tel: "+1-771-859-4374",
          name: "SHmHKkduR",
          surname: "pvNcjf",
          address:
            "9624 lLzNZ Street, foXvKxwrEd City, gbbewRNcrp State, 32659",
        },
        {
          id: 18,
          tel: "+1-865-133-7688",
          name: "GHQeccjWWr",
          surname: "Ozj",
          address: "9557 RWztXFcN Street, mMed City, DiJGaRt State, 66991",
        },
        {
          id: 19,
          tel: "+1-164-224-8827",
          name: "mIHiaPrwk",
          surname: "iNsawev",
          address: "9724 uwoP Street, gsSgmySv City, YJDSe State, 84752",
        },
        {
          id: 20,
          tel: "+1-236-105-5774",
          name: "gfUDSNUwx",
          surname: "BPGWTumw",
          address: "4440 OCGWNryHw Street, cYzIlWaHZ City, nZsu State, 95219",
        },
      ],
    };
  },
};
</script>
<style lang="scss"></style>
