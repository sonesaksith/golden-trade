const CryptoJS = require("crypto-js");
const genPassword = async (data) => {
  const hashPassword = CryptoJS.AES.encrypt(
    data,
    process.env.SIGNATURE_VERIFY
  ).toString();
  return hashPassword;
};
const genSignature = async (data) => {
  const signature = CryptoJS.AES.encrypt(
    JSON.stringify(data) + process.env.SIGNATURE_VERIFY,
    process.env.SIGNATURE_VERIFY
  ).toString();
  return signature;
};

export { genPassword, genSignature };
