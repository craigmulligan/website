---
title: "Hide console logging for passing tests and show it for failures with node:test"
description: "Hide console logging for passing tests and show it for failures with node:test - A long time coming"
date: 2023-11-25
---

# Hide console logging for passing tests and show it for failures with node:test

Coming from [`pytest`](https://docs.pytest.org/en/7.4.x/), I was surprised to find that most javascript testing frameworks do no capturing & filtering of console.logs. Which means that you often end up with a noisy output even when a test passes. In the example below it's made worse by using `console.error`.

![A noisy jest test log](/node-suppress-test-log/logs.png)

I've been looking for a solution to this for sometime, and others have too, this [jest issue](https://github.com/jestjs/jest/issues/4156) from 2018 sums it up pretty well. There are two common solutions proposed to this problem. One is to mock the implementation of console.* but this means you loose important context in the event that a test does fail and you need to review the logs. 

The other suggestion is to use a custom reporter, I've tried the one that is suggested in the [jest issue](https://github.com/jestjs/jest/issues/4156) but it'll log all console.logs from the entire test suite if one test fails, which is better but still not what you ideally want.  

A [built in test runner](https://nodejs.org/api/test.html) was introduced in node.js V18 which I feel is likely going to become the defacto as it matures. I noticed they had some docs on custom reporters and so I thought I'd take a look at finding a solution to this age old problem.       

The node.js runner can provide a [TAP](https://testanything.org/) output. Which I thought would be easy to find a good reporter that hides console.logs, but none that I looked at were well maintained or feature complete and so I'd have to build my own. I quite liked the output of the default node.js `spec` reporter and so I abandondoned the TAP reported and set about using that as my starting point.

I ended up building a custom reporter that delegates all behaviour to the builtin `spec` reporter, except for the `test:stderror` and `test:stdout` events where I capture the logs and then only stream them on if a test fails, it ended up being pretty simple once I figure out how [Trasform Streams](https://nodejs.org/api/stream.html#class-streamtransform) worked.

```javascript
import { spec } from "node:test/reporters";
import { Transform } from 'node:stream';

class Reporter extends Transform {
  constructor() {
    super({ writableObjectMode: true })
    this.specReporter = new spec()
    this.logs = []
  }

  addToFailedLogs = (_, data) => {
    this.logs.push(data)
  }

  _transform(event, encoding, callback) {
    switch (event.type) {
      case 'test:stderr':
      case 'test:stdout':
        // Any output from the spec reporter is pushed to this.logs
        this.logs.push(this.specReporter._transform(event, encoding, this.addToFailedLogs));
        callback(null)
        break;
      case 'test:pass':
        this.specReporter._transform(event, encoding, callback);
        this.logs = [];
        break;
      case 'test:fail':
        this.specReporter._transform(event, encoding, this.addToFailedLogs);
        callback(null, this.logs.join(''))
        this.logs = []
        break;
      default:
        this.specReporter._transform(event, encoding, callback);
        break;
    }

  }

  _flush(callback) {
    this.specReporter._flush(callback)
  }
}

export default new Reporter()
```

[gist link](https://gist.github.com/craigmulligan/00aec33f5ca427f236763b12245949f7)

To use this reporter you simply need to run your tests with the `--test-reporter` flag. For example:  

```bash
node node --test-reporter ./reporter.mjs --test ./tests/*.mjs
```

Hope this helps you if you are looking for a little better testing ergonomics in javascript.
