require("dotenv").config();
import colors from "vuetify/es5/util/colors";
export default {
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "golden-trade",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
      { "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/goldbar.png" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/style.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/secure-storage",
    "~/plugins/axios.client.js",
    "~/plugins/global.js",
    { src: "~/plugins/printd.js", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/vuetify"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/dotenv", "nuxt-sweetalert2"],
  axios: {
    retry: { retries: 3 },
    proxy: true,
  },
  proxy: {
    "/api/": {
      target: process.env.VERCEL_BASE_URL_GOLD,
      pathRewrite: { "^/api/": "/" },
    },
    "/gold/": {
      target: process.env.VERCEL_BASE_URL_GOLD,
      pathRewrite: { "^/gold/": "/" },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  vuetify: {
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: "#4055B1",
          accent: colors.grey.darken3,
          secondary: "#9CA8BB",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green,
          goldColor: "#DAA520",
        },
        light: {
          primary: "#4055B1",
          accent: colors.grey.darken3,
          secondary: "#9CA8BB",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green,
          goldColor: "#DAA520",
        },
      },
    },
  },
  build: {},
};
