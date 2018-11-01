// vue.config.js配 置说明
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/online/' : '/',
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    port: 8080, // 端口号
    host: 'localhost',
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    proxy: {
      '/api': {
        target: 'https://api.douban.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
