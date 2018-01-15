## About this site 

This site is built with [`next-static-tools`](https://github.com/hobochild/next-static-tools). It's a collection of incremenatlly adoptable tools to make building static sites with graphql and next.js easy.

`next-static-tools` is heavily inspired by gatsby.js but aims to be simpler and more transparent. Instead of abstracting the grapqhl schema from you like gatsby does it next-static-tools requires you to pass a shema and resolvers.

It then launches a server for you and allows you to use all the features of the appollo client in any of your pages. Of course we don't want to run a production grapqhl server, for a basic static site. So `next-static-tools` instead runs it only in dev mode and then when building the site we write out the queries and the resulting data to json file. The client then loads these json files into the client cache, so you get instant page transitions.  

`next-static-tools` is still a work in progess and should have offline support and a cli shortly, if you have feed back please create an [issue](https://github.com/hobochild/next-static-tools/issues)


