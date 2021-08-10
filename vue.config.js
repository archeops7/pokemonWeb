module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "./src/styles/common.scss";'
      }
    }
  }
}
