module.exports = {
  devServer: {
    proxy: {
      // '/': {
      //   target: 'https://wap.leyoujia.com/',
      //   changeOrigin: true,
      //   // ws: true,
      //   // pathRewrite: { '^/api': '' }
      // }
      '/': {
        target: 'https://i.leyoujia.com/',
        changeOrigin: true
      }
    }
  }
};
