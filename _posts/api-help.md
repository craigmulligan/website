---
title: 'Why dont APIs have the --help option?'
date: '2020-03-16'
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
---

I was diagnosing a bug with a internal api at work awhile back and it gave me a potentially novel idea. The endpoint I was debugging was returning a `422`, the status code for invalid input. Because the api was undocumented, I had to open my text editor and take a look at the code to see what input was expected. As I was fumbling through the source code, I thought, wouldn't it be great if APIs had the same `--help` option as CLIs.

For those unfamiliar, it's common practice for a commandline program to write usage instructions to standard out when a `--help` option is passed, it is conventional enough to warrant a [wikipedia](https://en.wikipedia.org/wiki/Usage_message) but it is not a standard.

Imagine you could just do `curl -x POST http://my-api.com/user?help` And it returned some nice `.html` or `.txt` explaining how to use the endpoint? You could take this further and have the catch all (404) route return a list of domains that are exposed by this service for easily finding endpoints. You could also print the usage information on errors.

I'm not sure this is the case for all teams, but our internal CLI tools are better documented than our APIs. I think this is because most CLI frameworks come with the `--help` functionality baked in and for most http-frameworks documentation is an out of scope addon. There are standards like openAPI but in practice I rarely see it used, especially for internal endpoints. Maybe I'm in a circle of lazy developers but I haven't see an easily way to maintain it and keep the documentation close to the code.

To test this idea I created an [express.js middleware](https://github.com/hobochild/express-help-middleware) to add the `--help` convention to an endpoint. It should be fairly self explanatory with some code samples.

Here is a basic api, it has a greeting endpoint and a catch all to return 404s on unmatched urls.

```
const express = require('express')
const app = express()

app.get(
  '/greeting/:name',
  function(req, res) {
    res.send(`Hello ${req.params.name}!`)
  }
)

app.use(
  (req, res, next) => {
    res.status(404)
    next()
  },
)

...
```

Now lets add some helpful documentation. The `help` function takes a single string as a parameter and the only convention is that you lead with a description and then optionally follow with a line break and more detailed instructions.

```
const express = require('express')
const app = express()
const help = require('express-help-middleware')

app.get(
  '/greeting/:name',
  help(`
  Returns a greeting

  params:
    name: A word that would would like to be called by
  `),
  function(req, res) {
    res.send(`Hello ${req.params.name}!`)
  }
)

app.use(
  (req, res, next) => {
    res.status(404)
    next()
  },
  // display full routes on 404
  help('Welcome to my greeting API')
)

...
```

Now we can use our favourite http client to explore our API.

First we just hit the host. That will match our catch all route and Welcome users to our api, as well as print all our available routes.

So:

```
curl localhost?help
```

Returns

```
Welcome to my greeting API

[GET]:/greeting/:name - Returns a greeting
```

I can then do:

```
curl localhost/greeting/:name?help
```

And I'll get:

```
Returns a greeting

  params:
	  name: A word that you would like to be called by
```

The middleware api is intentionally basic, the only structure it enforces is that you provide a message when a user asks for help. Sure it's not machine readable but often it's just a human on the other end trying to figure out how to use your software.

I'm still chewing on this idea, if you have thoughts [please let me know](https://twitter.com/hobochildster)!
