// const CryptoJS = require('crypto-js')
// const SecureStorage = require('secure-web-storage')
// const secureStorage = new SecureStorage(localStorage, {
//   hash: function hash(key) {
//     key = CryptoJS.SHA256(key, process.env.SECRET_KEY)
//     return key.toString()
//   },
//   encrypt: function encrypt(data) {
//     data = CryptoJS.AES.encrypt(data, process.env.SECRET_KEY)
//     data = data.toString()
//     return data
//   },
//   decrypt: function decrypt(data) {
//     data = CryptoJS.AES.decrypt(data, process.env.SECRET_KEY)
//     data = data.toString(CryptoJS.enc.Utf8)
//     return data
//   },
// })

// export default secureStorage