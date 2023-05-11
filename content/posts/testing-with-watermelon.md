---
title: "Testing with watermelon db"
description: "Some tips on using jest react-native and watermelon db together"
date: 2023-04-11
---

# Testing with watermelon db

I've been working on [an open-source cycling computer](https://github.com/RespectableThieves/hypecycle) with [my brother](https://www.shaunmulligan.com/) for a few weeks now. It's built with react-native expo and because it's a fairly data intensive and reactive we naturally landed on [watermelon db](https://watermelondb.dev/docs) for our database/ORM. 

Their docs are great but are a little light on how to test your watermelon backed app.  

## The setup 

When you run your react-native app with jest it'll run in a `react-native` like environment with many of the mobile API'S mocked out because the test suite isn't running on a real device. If you try run `jest` test with watermelon you'll likely run into this error:

```bash
Diagnostic error: NativeModules.DatabaseBridge is not defined! This means that you haven\'t properly linked WatermelonDB native module. Refer to docs for more details
```

This is telling us that the native API isn't implemented. To get our tests running we need to mock this interaction. I found this [suggestion](https://github.com/Nozbe/WatermelonDB/issues/254) to use lokijs adapter which uses an in memory db instead of the sqlite lib, this worked great but it doesn't support raw queries. We use raw SQL queries in a few cases that are too complex for the ORM, so we needed another solution.

Watermelon also works in a node.js environment which loads real sqlite bindings. To do this you need to intercept the imports in jest and load the node.js adapter.

First install the [node.js sqlite dependencies](https://watermelondb.dev/docs/Installation#nodejs-sqlite-setup):

```bash
yarn add --dev better-sqlite3
```

Then intercept the native calls and load the node module.   

```javascript
// setup.js

jest.mock(
  '@nozbe/watermelondb/adapters/sqlite/makeDispatcher/index.native.js',
  () => {
    return jest.requireActual(
      '@nozbe/watermelondb/adapters/sqlite/makeDispatcher/index.js',
    );
  },
);
```

Now our sqlite dispatcher will issue sqlite queries via `better-sqlite3` rather than the native bridge.  

## Fixtures

Next we'll also want to clear our database between each test. So I added the following [jest hook after each test](https://jestjs.io/docs/setup-teardown#repeating-setup).

```javascript
afterEach(async () => {
  await db.write(async () => {
    await db.unsafeResetDatabase();
  });
});
```

Now you are ready to run a test, remember to run any calls to the database in a [`render.act()`](https://legacy.reactjs.org/docs/test-renderer.html#testrendereract). For example:

```typescript
it('Widget page renders & updates correctly', async () => {
  // write the first realtime row.
  const powerProps = {
    title: 'Power ',
    icon: 'lightning-bolt',
  };

  let record = await getOrCreateRealtimeRecord();
  let updatedRecord!: RealtimeDataModel;

  // Check the widget is using the realtime table.
  // initial value should be 0
  const widget = screen.findByProps({...powerProps, data: null});
  expect(widget).toBeTruthy();

  // write to the db updating the realtime table.
  await renderer.act(async () => {
    updatedRecord = await updateRealTimeRecord(record);
  });

  // again check the component to see that it's re-rendered correctly
  const updatedWidget = tree.root.findByProps({
    ...powerProps,
    data: updatedRecord.instantPower,
  });
  expect(updatedWidget).toBeTruthy();
});
```

That should be it! [Let me know](https://github.com/craigmulligan/website/issues/new) if you have any issues. 
