const resolvers = require('./lib/resolvers')
const typeDefs = require('./lib/typeDefs')
// next.config.js
module.exports = {
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/cv': { page: '/cv' }
    }
  },
  typeDefs,
  resolvers
}
