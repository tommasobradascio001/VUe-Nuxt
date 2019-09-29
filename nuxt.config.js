const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const pkg = require('./package')
require('dotenv').config()

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: '@/components/generic/Loader.vue',

  /*
  ** Global CSS
  */
  css: ['~/assets/style/app.styl', '~/assets/style/main.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/vuetify', '~/plugins/vuelidate', '~/plugins/mixins'],
  router: {
    middleware: ['auth']
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:9000'
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/sign_in',
            method: 'post',
            propertyName: 'token'
          },
          logout: {
            url: '/auth/sign_out',
            method: 'delete'
          },
          user: {
            url: '/auth/validate_token',
            method: 'get',
            propertyName: false
          }
        }
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/plans/timeline'
    },
    plugins: ['~/plugins/auth.js']
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
