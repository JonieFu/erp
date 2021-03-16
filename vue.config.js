module.exports = {
  devServer: {
    overlay: {
      warnings: false,
    },
    proxy: { //配置跨域
      '/api': {
        target: 'http://172.16.7.166:80',
        ws: true,
        changeOrigin: true,//允许跨域
        pathRewrie: {
          '^/api': ''   //请求的时候使用这个api就可以
        }
      }
    }
  },
  lintOnSave: false
}