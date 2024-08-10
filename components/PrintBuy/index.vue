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

      <v-row>
        <!-- <v-col cols="12" align="center" style="font-size: 11px">
          <div><span>ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ</span></div>
          <div>
            <span>ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນະຖາວອນ</span>
          </div>
        </v-col> -->
      </v-row>
      <br />
      <div style="display: flex; justify-content: space-between">
        <div>
          <div style="font-size: 13px">
            <!-- <div>
              <img
                src="../../assets/images/meow.jpeg"
                style="border-radius: 50%"
                width="50px"
                height="50px"
              />
            </div> -->
            <div><span>ຊື່​ຮ້ານ</span></div>
          </div>
          <div style="font-size: 12px">
            <div><span>ເບີໂທ : 02 956 082 29</span></div>
          </div>
        </div>
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            flex-direction: column;
          "
        >
          <div>
            <b style="font-size: 20px">
              {{ message }}
            </b>
          </div>
        </div>
        <div
          style="
            display: flex;
            justify-content: end;
            align-items: end;
            text-align: center;
            flex-direction: column;
            font-size: 12px;
          "
        >
          <div>
            <span>ຜູ້ພິມ: {{ userinfo?.username }} &nbsp; </span>
          </div>
          <div>
            <span>ວັນທີພິມ: {{ currentDateTime }}</span>
          </div>
        </div>
      </div>

      <table class="custom-table" v-if="list != ''">
        <tr style="font-size: 12px; text-align: center; color: #000">
          <th>ລຳດັບ</th>
          <th v-for="(item, index) in header" :key="index">
            {{ item }}
          </th>
        </tr>
        <tbody>
          <tr
            v-for="(items, index) in filteredData"
            :key="index"
            style="font-size: 10px; text-align: center; align-items: center"
          >
            <td>
              {{ index + 1 }}
            </td>
            <td v-for="(item, i) in Object.values(items)" :key="i">
              {{ item ? item : "" }}
            </td>
          </tr>
          <tr
            style="font-size: 10px; text-align: right"
            align="right"
            v-for="(fooItem, index) in setFooter"
            :key="index + 'footer'"
          >
            <td :colspan="mergeTable.text" style="text-align: right">
              {{ fooItem.text }}
            </td>
            <td :colspan="mergeTable.value" style="text-align: center">
              {{ $formatnumber(fooItem.value) }}
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <br />
    </div>
  </div>
</template>
<script>
import html2pdf from "html2pdf.js";
import secureStorage from "~/plugins/secure-storage";
export default {
  props: {
    message: { type: String, required: true },
    list: {
      type: Array,
      required: true,
    },
    setHeader: {
      type: Array,
      required: true,
    },
    setFooter: {
      type: Array,
      required: true,
    },
    mergeTable: {
      type: Object,
      required: true,
    },
    setSty: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      userinfo: "",
      currentDateTime: "",
      header: [],
      filteredData: [],
    };
  },
  async mounted() {
    this.userinfo = secureStorage.getItem("userinfo");
    for (let index = 0; index < this.setHeader.length; index++) {
      const element = this.setHeader[index];
      this.header.push(element.text);
    }
    for (let index = 0; index < this.list.length; index++) {
      const element1 = this.list[index];
      let a = {};
      for (let index = 0; index < this.setHeader.length; index++) {
        const element = this.setHeader[index];
        if (element?.callback) {
          a["column" + String(index)] = element.callback(
            element1[element.value]
          );
        } else {
          a["column" + String(index)] = element1[element.value];
        }
      }
      this.filteredData.push(a);
    }
    let newData = {
      column0: "",
      column1: "",
      column2: "",
      column3: "",
      column4: "",
      column5: "",
      column6: "",
      column7: "",
      column8: "",
    };
    while (this.filteredData.length < 10) {
      let newOne = { ...newData };
      this.filteredData.push(newOne);
    }
  },
  created() {
    this.updateDateTime();
    setInterval(this.updateDateTime, 1000);
  },
  methods: {
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
    downloadPDF() {
      const element = this.$refs.printTable;
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
            color: black;
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
      const style = document.createElement("style");
      style.type = "text/css";
      style.innerHTML = SetPage;
      document.head.appendChild(style);

      const opt = {
        margin: 0.2,
        filename: "report.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: this.setSty },
      };

      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          // Remove the style element after the PDF is generated
          document.head.removeChild(style);
        });
    },
    OnPrintBill: async function () {
      const SetPage = `
          @media print {
            @page {
              margin-top: 0.5cm;
              margin-bottom: 0.5cm;
              margin-left: 0.5cm;
              margin-right: 0.5cm;
              padding: 0;
              size: ${this.setSty};
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
            color: black;
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
      } catch (error) {
        console.log(error);
      }
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
  text-align: center;
}
.custom-table th {
  font-size: 12px;
  /* background-color: #be2a2a; */
  color: black;
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
