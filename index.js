const next = require('next')
const nextExport = require('next/dist/server/export').default
const nextBuild = require('next/dist/server/build').default
const { resolve, join } = require('path')
const resolvers = require('./lib/resolvers')
const typeDefs = require('./lib/typeDefs')
const yargs = require('yargs')
const serve = require('next-static-tools').default
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })


yargs
  .version()
  .command('dev', 'run dev server', () => {
    const dev = process.env.NODE_ENV !== 'production'
    const app = next({ dev })

    app.prepare().then(() => serve({ typeDefs, resolvers, app })) 
  })
  .command('export', 'export static site', (args) => {
    process.env.node_env = 'production'
    const options = {
        silent: args.silent,
        outdir: args.outdir ? resolve(args.outdir) : resolve(process.cwd(), 'out')
      }


    nextBuild(process.cwd())
      .then(() => {
      const dev = process.env.NODE_ENV !== 'production'
      const app = next({ dev })

            const server = serve({ typeDefs, resolvers, app })
      })
      .then(() =>{
        return nextExport(process.cwd(), options)
      })
      .then(() => {
        process.exit(0)
      })
  })
  .argv

