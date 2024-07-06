import Vue from "vue";
import moment from "moment";

Vue.prototype.$formatnumber = (value) => {
  if (!value) return "0";
  value = Number(value).toFixed(0);
  value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return value;
};
Vue.prototype.$formatnumber2 = (value) => {
  if (!value) return "0.00";
  value = Number(value).toFixed(2);
  value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return value;
};
Vue.prototype.$convertGoldToGrams = (number, unit, purity) => {
  const gramPerBaht = 15.244;
  if (!purity) {
    purity = 99;
  }
  let grams;

  switch (unit) {
    case "ບາດ":
      grams = number * gramPerBaht;
      break;
    case "ຫູນ":
      grams = number * (gramPerBaht / 4);
      break;
    case "ສະຫຼຶງ":
      grams = number * (gramPerBaht / 40);
      break;
    default:
      throw new Error("ຫົວໜ່ວຍບໍ່ຖືກຕ້ອງ ກະລຸນາໃຊ້ ບາດ, ຫູນ ຫລື ສະຫຼຶງ");
  }

  const pureGoldWeight = grams * (purity / 100);

  return pureGoldWeight;
};
Vue.prototype.$convertGramsToGold = (weight, unit, purity) => {
  const gramPerBaht = 15.244;
  if (!purity) {
    purity = 99;
  }
  let weightInGrams;

  switch (unit) {
    case "gram":
      weightInGrams = weight;
      break;
    case "kg":
      weightInGrams = weight * 1000;
      break;
    default:
      throw new Error("ຫົວໜ່ວຍບໍ່ຖືກຕ້ອງ ກະລຸນາໃຊ້ ບາດ, ຫູນ ຫລື ສະຫຼຶງ");
  }

  const pureGoldWeight = weightInGrams / (purity / 100);

  const baht = Math.floor(pureGoldWeight / gramPerBaht);
  const remainingGramsAfterBaht = pureGoldWeight % gramPerBaht;

  const salueng = Math.floor(remainingGramsAfterBaht / (gramPerBaht / 4));
  const remainingGramsAfterSalueng =
    remainingGramsAfterBaht % (gramPerBaht / 4);

  const hun = Math.floor(remainingGramsAfterSalueng / (gramPerBaht / 40));

  return {
    baht: baht,
    salueng: salueng,
    hun: hun,
  };
};
Vue.prototype.$convertGoldToMoney = (
  weight,
  unit,
  purity,
  deductBroken = 0
) => {
  if (!purity) {
    purity = 99;
  }
  const gramPerBaht = 15.244;
  const pricePerBaht = 29000000;
  let weightInGrams;

  switch (unit) {
    case "gram":
      weightInGrams = weight;
      break;
    case "kg":
      weightInGrams = weight * 1000;
      break;
    case "ບາດ":
      weightInGrams = weight * gramPerBaht;
      break;
    case "ສະຫຼຶງ":
      weightInGrams = weight * (gramPerBaht / 4);
      break;
    case "ຫູນ":
      weightInGrams = weight * (gramPerBaht / 40);
      break;
    default:
      throw new Error("ຫົວໜ່ວຍບໍ່ຖືກຕ້ອງ ກະລຸນາໃຊ້ ບາດ, ຫູນ ຫລື ສະຫຼຶງ");
  }

  if (weightInGrams < 0) {
    throw new Error("ນ້ຳໜັກບໍ່ສາມາດຕ່ຳກວ່າ 0 ໄດ້");
  }

  const pureGoldWeight = weightInGrams * (purity / 100);

  const goldValuePerGram = pricePerBaht / gramPerBaht;
  const goldValue = pureGoldWeight * goldValuePerGram;

  return goldValue - deductBroken;
};
Vue.prototype.$formatdate2 = (date) => {
  if (date) {
    return (date = moment(String(date)).format("YYYY-MM-DD"));
  }
};
Vue.prototype.$formatdate = (date) => {
  if (date) {
    return (date = moment(String(date)).format("DD/MM/YYYY"));
  }
};
Vue.prototype.$FormatDateTime = (date) => {
  if (date) {
    return (date = moment.utc(String(date)).format("DD/MM/YYYY HH:mm:ss"));
  }
};
Vue.config.debug = false;
Vue.config.devtools = false;
Vue.config.silent = true;
