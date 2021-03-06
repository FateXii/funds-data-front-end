module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/funds-data-front-end/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/scss/main.scss";',
      },
    },
  },
};
