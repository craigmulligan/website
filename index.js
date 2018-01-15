const nextExport = require('next/dist/server/export').default
const nextBuild = require('next/dist/server/build').default
const { resolve, join } = require('path')
const resolvers = require('./lib/resolvers')
const typeDefs = require('./lib/typeDefs')
const yargs = require('yargs')
const serve = require('next-static-tools').default
const dev = process.env.NODE_ENV !== 'production'

yargs
  .version()
  .command('dev', 'run dev server', () => {}, async () => {
    const server = await serve({ typeDefs, resolvers })
    server.start().then(({ port }) => console.log(`server on http://localhost:${port}`))
  })
  .command('export', 'export static site', () => {}, async (args) => {
    /* const options = { */
        // silent: args.silent,
        // outdir: args.outdir ? resolve(args.outdir) : resolve(process.cwd(), 'out')
      // }

    // const server = await serve({ typedefs, resolvers })
    // server.start()
    // await nextBuild(process.cwd())
    /* await nextExport(process.cwd(), options) */
    process.exit(0)
  })
  .argv

