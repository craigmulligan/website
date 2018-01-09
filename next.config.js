// next.config.js
module.exports = {
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
    }
  }, 
  webpack: (config) => {
    config.node = {
      console: false,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
    return config
  }
}
