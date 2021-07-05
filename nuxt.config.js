import colors from 'vuetify/es5/util/colors'
import { AUTH } from './store/auth'

export default {
  server: {
    port: 8080, // default: 3000
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - storiesapp',
    title: 'storiesapp',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    link: [
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,500;1,500&display=swap',
      },
    ],
  },

  loading: '~/components/LoadingComponent.vue',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/app.sass'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vee-validate.client.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // 'nuxt-vite',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
    'nuxt-i18n',
    'cookie-universal-nuxt',
  ],

  firebase: {
    config: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    },
    services: {
      auth: {
        persistence: 'local',
        initialize: {
          onAuthStateChangedAction: AUTH.ACTIONS.ON_AUTH_STATE_CHANGED_ACTION,
        },
        ssr: true,
        emulatorPort: process.env.NODE_ENV === 'development' ? 9099 : null,
        emulatorHost:
          process.env.NODE_ENV === 'development' ? 'http://localhost' : null,
        disableEmulatorWarnings: true,
      },
      firestore: {
        emulatorPort: process.env.NODE_ENV === 'development' ? 8081 : null,
        emulatorHost:
          process.env.NODE_ENV === 'development' ? 'localhost' : null,
      },
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
      meta: false,
      icon: false,

      workbox: {
        importScripts: [
          // ...
          '/firebase-auth-sw.js',
        ],
        // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
        // only set this true for testing and remember to always clear your browser cache in development
        dev: process.env.NODE_ENV === 'development',
      },
    },
  },

  // vite: {
  //   ssr: true,
  // },

  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.json',
      },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    lazy: true,
    langDir: '~/assets/locales/',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  router: {
    middleware: ['auth'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
