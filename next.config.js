// next.config.js
module.exports = {
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/cv': { page: '/cv' }
    }
  } 
}
