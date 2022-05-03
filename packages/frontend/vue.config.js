module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8701/',
      },
    },
    host: '127.0.0.1',
    port: 9001,
  },
};
