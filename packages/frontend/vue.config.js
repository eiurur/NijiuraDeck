module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:12700/'
      }
    },
    host: '127.0.0.1',
    port: 9001 // CHANGE YOUR PORT HERE!
    // https: false,
    // hotOnly: false,
  }
};
