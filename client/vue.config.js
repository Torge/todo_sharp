module.exports = {
  configureWebpack: {
    output: {
      publicPath: process.env.VUE_APP_V == 1 ? '/v1/' : '/v2/'
    }
  }
}
