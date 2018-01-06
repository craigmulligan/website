const md = require('./md')
const fs = require('fs-jetpack')
const path = require('path')
const axios = require('axios')
const CONTENTS_PATH = path.resolve(`${__dirname}/../content`)
const TimestampType = require('./timestampType');
const { getPosts, getUser } = require('medium-posts')
const githubRepos = require('github-repositories') 

const resolvers = {
  Query: {
    content: async (_, { slug = '/about' }) => {
      const raw = await fs.readAsync(`${CONTENTS_PATH}${slug}.md`)
      return md(raw) 
    },
    hello: (_, { name }) => {
      return new Promise((resolve) => {
        setTimeout(() => {
         resolve(`Hello ${name || 'World'}`)
        }, 1000)
      })
    },
    posts: (_, { username, limit }) => {
      return getPosts(username, limit)
    },
    user: (_, { username }) => {
      return getUser(username)
    },
    repos: (_, { username, limit }) => {
      return githubRepos(username).then(repos => {
        return repos
        .filter(p => !p.fork)
        .sort((p, o) => {
          if (new Date(p.created_at) > new Date(o.created_at)) {
            return -1
          } else {
            return 1
          }
        })
        .slice(0, 5)
     })
    }
  },
  Timestamp: TimestampType
}

module.exports = resolvers


