const resolvers = require('./lib/resolvers')
const typeDefs = require('./lib/typeDefs')
const yargs = require('yargs')
const serve = require('next-static-tools').default

yargs
  .version()
  .command('dev', 'run dev server', () => {}, async () => {
    const server = serve({ typeDefs, resolvers })
    server.start().then(({ port }) => console.log(`server on http://localhost:${port}`))
  })
  .command('export', 'export static site', () => {}, async (args) => {
    const server = serve({ typeDefs, resolvers })
    await server.start()
    await server.export()
    process.exit(0)
  })
  .argv

