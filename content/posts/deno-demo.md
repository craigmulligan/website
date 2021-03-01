+++
Title = "Deno with Docker"
Description = "A small experiment in packaging a deno app with docker"
+++

I've been following deno from a far for a while now, I'm particularly interested in it for two reasons.

1. First class typescript support - I hate having to compile things with babel or webpack and then having to run them via node it always endsup being a little brittle & complicated with everyone having their own home grown scripts and workflows for dev and production.
2. Compiled executables - Scripting languages are really neat for making little tools, but they are pretty hard to distribute. For that reason I've been using Go for [small utilities](/#tools), but I'd much prefer to write these tools in something like python or javascript.

So I thought I'd dip my toes in and see how a packaged app would look. Deno has fairly unique dependency story compared to javascript's npm ecosystem. It pulls dependencies from remote urls on first run and then caches them until you clear the cache, very similar to how a browser loads a webpages dependencies. 

The first thing to figure out was how to create a reproducable build, turned out to be fairly easy you can create a lock file with 

```
deno cache --lock=lock.json --lock-write src/deps.ts
```

And then install with that lock file using:

```
deno cache --reload --lock=lock.json src/deps.ts
```

The next was how to make that build as small as possible, I did this by using deno's compile feature which can cross-compile standalone binaries (quite similar to vercels [pkg](https://www.npmjs.com/package/pkg)).  

The results:

The code is fairly self explanatory. It's a multi-stage docker build for a barebones `oak` server (comparable to node.js's express). There are 3 useful make targets. 

1. `make size_uncompressed` - this will give you the ondisk size of the image.

The on disk size comes out a 40mb (30mb of this is your executable) the rest is the apline image. (Node apline image is 116MB)

1. `make size_compressed` - This will give you the a gzipped image size which should be comparable to what you'd pull from a registry.

The compressed size comes in at 15mb the node.js apline image at 38.93 MB

1. `make run` - try out the server.


So little expierence with deno has been very positive so far. I really like how it's cleaning up typescript & javascript's disparate ecosystem and creating a uniform toolkit for building software.
