+++
Title = "Deno with Docker"
Description = "A small experiment in packaging a deno app with docker"
+++

I've been following [deno](https://deno.land) from a far for a while now, I'm particularly interested in it for two reasons.

1. First class typescript support - I hate having to compile things with babel or webpack and then having to run them via node in production it always ends-up being a little brittle & complicated with everyone having their own home grown scripts and workflows for dev and production.
2. Compiled executables - Scripting languages are really neat for making little tools, but they are pretty hard to distribute. For that reason I've been using Go for [small utilities](/#tools), but I'd much prefer to write these tools in something like python or javascript.

So I thought I'd dip my toes in and see how a packaged app would look. Deno has fairly unique dependency story compared to javascript's npm ecosystem. It pulls dependencies from remote urls on first run and then caches them until you clear the cache, very similar to how a browser loads a webpages dependencies. 

> If you want to skip the rest and just check out the code it can be found 👉 [here](https://github.com/hobochild/deno-demo)

The first thing to figure out was how to create a reproducible build, turned out to be fairly easy you can create a lock file with: 

```sh
deno cache --lock=lock.json --lock-write src/deps.ts
```

And then install with that lock file using:

```sh
deno cache --reload --lock=lock.json src/deps.ts
```

The next was how to make that build as small as possible, I did this by using deno's compile feature which can cross-compile standalone binaries (quite similar to vercel's [pkg](https://www.npmjs.com/package/pkg)). The linux executable is dynamically linked with `glibc` so you'll that present, luckily most systems have this. I unfortunately encountered the issue because I tried to use the vanilla apline image.

The results:

[The code](https://github.com/hobochild/deno-demo) is fairly self explanatory. It's a [multi-stage docker build](https://github.com/hobochild/deno-demo/Dockerfile) for a bare-bones `oak` server (comparable to node.js's express). There are 3 useful make targets.

1. `make size_uncompressed` - this will give you the ondisk size of the image.

The on disk size comes out a **53.3mb** (30mb of this is your executable) the rest is the apline image. (Node apline image is 116MB)

1. `make size_compressed` - This will give you the gzipped image size which should be comparable to what you'd pull from a registry.

The compressed size comes in at **21mb**, the node.js apline image by comparison is 38.93 MB

1. `make run` - run the server.


My little experience with deno has been very positive so far. I really like how it's cleaning up typescript & javascript's disparate ecosystem and creating a uniform toolkit for building software. 

Next I'm looking forward to try out their built in test framework too see how that fairs against more established things like jest.
