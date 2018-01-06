const { parse } = require('url')
const next = require('next')
const nextExport = require('next/dist/server/export').default
const nextBuild = require('next/dist/server/build').default
const { resolve, join } = require('path')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const { GraphQLServer } = require('graphql-yoga')
const resolvers = require('./lib/resolvers')
const typeDefs = require('./lib/typeDefs')
const yargs = require('yargs')


const middleware = (req, res, next) => {
  // Be sure to pass `true` as the second argument to `url.parse`.
  // This tells it to parse the query portion of the URL.
  const parsedUrl = parse(req.url, true)
  const { pathname, query } = parsedUrl

  if (pathname.startsWith('/playground') || pathname.startsWith('/graphql')) {
    next()
  } else {
    handle(req, res, parsedUrl)
  }
}

const init = () => {
  const options = {
    playgroundEndpoint: '/playground',
    endpoint: '/graphql',
    disablePlayground: false
  }

  const server = new GraphQLServer({ typeDefs, resolvers, options })
  server.express.use(middleware)
  server.start(() => console.log('Server is running on localhost:4000'))
}

yargs
  .version()
  .command('dev', 'run dev server', () => {
    app.prepare().then(init) 
  })
  .command('export', 'export static site', (args) => {
    const options = {
      silent: args.silent,
      outdir: args.outdir ? resolve(args.outdir) : resolve(process.cwd(), 'out')
    }

    init()
    nextBuild(process.cwd())
      .then(() =>{
        console.log('built')
        return nextExport(process.cwd(), options)
      })
      .then(() => {
        process.exit(0)
      })
  })
  .argv


