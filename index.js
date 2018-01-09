const { parse } = require('url')
const next = require('next')
const nextExport = require('next/dist/server/export').default
const nextBuild = require('next/dist/server/build').default
const { resolve, join } = require('path')
const dev = process.env.NODE_ENV !== 'production'
const resolvers = require('./lib/resolvers')
const typeDefs = require('./lib/typeDefs')
const yargs = require('yargs')
const nextatic = require('nextatic').default

yargs
  .version()
  .command('dev', 'run dev server', () => {
    const app = next({ dev })
    app.prepare().then(() => nextatic({ typeDefs, resolvers, app })) 
  })
  .command('export', 'export static site', (args) => {
    const options = {
      silent: args.silent,
      outdir: args.outdir ? resolve(args.outdir) : resolve(process.cwd(), 'out')
    }

    nextatic({ typeDefs, resolvers })
    nextBuild(process.cwd())
      .then(() =>{
        return nextExport(process.cwd(), options)
      })
      .then(() => {
        process.exit(0)
      })
  })
  .argv

