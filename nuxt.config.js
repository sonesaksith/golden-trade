require('dotenv').config()
export default {
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'golden-trade',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/style.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/secure-storage',
    '~/plugins/axios.client.js',
    '~/plugins/global.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios', 
    '@nuxtjs/dotenv', 
    'nuxt-sweetalert2',
  ],

  // axios: {
  //   retry: { retries: 3 },
  //   proxy: true,
  // },
  // proxy: {
  //   '/api/': {
  //     target: process.env.BASE_URL,
  //     pathRewrite: { '^/api/': '/' },
  //   },
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
