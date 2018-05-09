module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'demontweeks',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  /*
   ** Build configuration
   */
  /*
   * change c.f. https://qiita.com/uto-usui/items/6b745203fa6fad577877
   *
   build: {
     /*
     ** Run ESLint on save
     */
  /*    extend (config, { isDev, isClient }) {
        if (isDev && isClient) {
          config.module.rules.push({
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/
          })
        }
      }
    }
  */
  //引用  https://qiita.com/uto-usui/items/6b745203fa6fad577877

  build: {
    extend(config) {
      /**
       * vue-loader に オプションを渡す
       */
      const vueLoader = config.module.rules.find(rule => rule.loader === 'vue-loader');
      const {
        options: {
          loaders
        }
      } = vueLoader || {
        options: {}
      }
      if (loaders) {
        for (const loader of Object.values(loaders)) {
          changeLoaderOptions(Array.isArray(loader) ? loader : [loader])
        }
      }
      config.module.rules.forEach(rule => changeLoaderOptions(rule.use))
    }
  }
}

}

/**
 * loader の名前一致でオプションをセットする
 */
function changeLoaderOptions(loaders) {
  if (loaders) {
    for (const loader of loaders) {
      let options;
      switch (loader.loader) {
        case 'sass-loader':
          options = {
            includePaths: [
              path.resolve(__dirname, './assets/sass/foundation/variable/'),
              path.resolve(__dirname, './assets/sass/foundation/mixin/')
            ],
            data: '@import "_variable";\n@import "_mixin";'
          };
          break
          // 他の loader を追加できる
          //        case 'stylus-loader':
          //          options = {
          //            includePaths: [path.resolve(__dirname, './assets/sass/')],
          //            import: ['_import']
          //          }
          //          break
      }
      if (options) {
        Object.assign(loader.options, options)
      }
    }
  }
}
