<template>
  <div>
    <div
      ref="printTable"
      id="bill"
      style="
        font-family: 'Noto Sans Lao', 'Phetsarath OT', 'Saysettha OT',
          'Saysettha Lao';
      "
    >
      <style>
        @media print {
          @page {
            margin-top: 0.5 cm;
            margin-bottom: 0.5 cm;
            margin-left: 0.5 cm;
            margin-right: 0.5 cm;
            padding: 0;
          }
        }
      </style>
      <div style="display: flex; justify-content: space-between">
        <div>
          <div>
            <u>ຮ້ານຄຳມະໄລວັນ</u>
            <div>
              <span>No:953095</span>
            </div>
            <div>
              <span>ວັນທີ:08/07/2024</span>
            </div>
            <div>
              <span>ພະນັກງານ: ປີນາ</span>
            </div>
            <div>
              <span>ລູກຄ້າ: ມະໄລທອງ/2099887865</span>
            </div>
          </div>
        </div>
        <div>
          <span>9999999.99 : 31.200</span>
          <div>ຂາຍ</div>
        </div>
      </div>
      <div>
        <br />
        <div style="display: flex; justify-content: space-between">
          <div><u>ລາຍການຂາຍ</u></div>
          <div><u>ເປັນເງິນ</u></div>
        </div>
        <div style="display: flex; justify-content: space-between">
          <div style="margin-right: 2px"><h5>[ຂາຍ]</h5></div>
          <div style="width: 100%; align-self: center">
            <hr />
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between">
        <div>
          <span
            >1- ລາຍແຂນກີ້ຍອດລວມ 1 B <br />
            &nbsp; &nbsp; &nbsp; 1 x 99RAB
          </span>
        </div>
        <div><span>31,800</span></div>
      </div>
      <div>
        <span>ລາຍລະອຽດການຊຳລະ </span>
      </div>
      <div style="display: flex; justify-content: space-between">
        <div style="margin-right: 2px"><h5>[ໂອນ]</h5></div>
        <div style="width: 100%; align-self: center">
          <hr />
        </div>
      </div>
      <div style="display: flex; justify-content: space-between">
        <div>
          <span>1,500 x 512.00 </span>
        </div>
        <div><span>768,000 LAK</span></div>
      </div>
      <div style="display: flex; justify-content: flex-end">
        <span>BCEL One Pay (KIP)----</span>
      </div>
      <div style="display: flex; justify-content: space-between">
        <div>
          <span>ຜູ້ກວດບິນ</span>
        </div>
        <div>
          <span>({{ currentDateTime }})</span>
        </div>
      </div>
      <!-- detail -->

      <!-- table -->
    </div>
  </div>
</template>
<script>
import secureStorage from "~/plugins/secure-storage";
export default {
  props: {
    //   message: { type: String, required: true },
    //   listTable: {
    //     type: Array,
    //     required: true,
    //   },
    //   Myheader: {
    //     type: Array,
    //     required: true,
    //   },
    //   listtableFooter: {
    //     type: Array,
    //     required: true,
    //   },
    //   detial: {
    //     type: Array,
    //     required: true,
    //   },
    //   mergeTable: {
    //     type: Object,
    //     required: true,
    //   },
    //   setSty: {
    //     type: String,
    //     required: true,
    //   },
  },
  data() {
    return {
      listSecure: "",
      currentDateTime: "",
      header: [],
      filteredData: [],
      dialogSuccess: false,
    };
  },
  async mounted() {
    //   this.listSecure = secureStorage.getItem('userinfo')
    // table
    //   for (let index = 0; index < this.Myheader.length; index++) {
    //     const element = this.Myheader[index]
    //     this.header.push(element.text)
    //   }
    //   for (let index = 0; index < this.listTable.length; index++) {
    //     const element1 = this.listTable[index]
    //     let a = {}
    //     for (let index = 0; index < this.Myheader.length; index++) {
    //       const element = this.Myheader[index]
    //       if (element?.callback) {
    //         a['column' + String(index)] = element.callback(
    //           element1[element.value]
    //         )
    //       } else {
    //         a['column' + String(index)] = element1[element.value]
    //       }
    //     }
    //     this.filteredData.push(a)
    //   }
  },
  created() {
    this.updateDateTime();
    setInterval(this.updateDateTime, 1000);
  },
  methods: {
    // func time
    updateDateTime() {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      this.currentDateTime = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
    },

    // size: ${this.setSty};

    OnPrintBill: async function () {
      const SetPage = `
          @media print {
            @page {
              margin-top: 0.5cm;
              margin-bottom: 0.5cm;
              margin-left: 0.5cm;
              margin-right: 0.5cm;
              padding: 0;
   
  
            }
          }
          body {
            font-family: 'Noto Sans Lao', 'Phetsarath OT','Saysettha OT','Saysettha Lao';
          }
          table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  
  table th {
    padding: 2px;
    text-align: center;
    background-color: #be2a2a;
    color: white;
  }
  td {
      border: 1px solid #ddd;
      padding: 2px;
    }
    table thead{
  font-weight:bold;
  font-family:Verdana;
  
  }
  
        `;
      var divToPrint = this.$refs.printTable;
      try {
        this.$Printd.print(divToPrint, [SetPage]);
      } catch (error) {}
    },
  },
};
</script>
<style>
.custom-table {
  width: 100%;
  border-collapse: collapse;
}
.custom-table th,
.custom-table td {
  border: 1px solid #ddd;
  padding: 2px;
  text-align: left;
}
.custom-table th {
  font-size: 12px;
  background-color: #be2a2a;
  color: white;
}
.custom-table tr {
  font-size: 10px;
}
.Absolute-Center {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.Absolute-End {
  display: flex;
  justify-content: end;
  align-items: end;
  text-align: center;
  flex-direction: column;
  font-size: 12px;
}
</style>
