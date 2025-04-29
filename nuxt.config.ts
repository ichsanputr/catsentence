import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: '%s - CatSentence',
      link: [
        { rel: 'icon', type: 'image/ico', href: '/favicon.ico' },
      ],
    },
  },

  build: {
    transpile: ['vuetify']
  },

  ssr: true,
  plugins: ['~/plugins/iconify.ts', '~/plugins/pinia.ts'],

  modules: [
    '@nuxt/eslint',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],

  css: ["~/assets/css/global.css"],

  alias: {
    '~/stores': '/stores',
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },

  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
      SSO_URL: process.env.SSO_URL,
      APP_URL: process.env.APP_URL,
      PROFILE_URL: process.env.PROFILE_URL
    }
  },

  compatibilityDate: '2025-01-12',
})