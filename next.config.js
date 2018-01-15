// next.config.js
const { resolve, join  } = require('path')

const p = join(resolve('.'), '.next', 'next-static-tools.json')
console.log(p)
module.exports = {
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/cv': { page: '/cv' }
    }
  }, 
  webpack: (config, { buildId, dev }) => {
    // Perform customizations to webpack config

    // Important: return the modified config
    config.resolve.alias = {
      '~next': p 
    }
    return config
  }
}
