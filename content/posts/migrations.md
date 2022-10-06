---
title: "Migration practices"
description: "Migration practices"
date: 2022-10-04
---

I've been looking into [edgedb]() [prisma]() & [planetscale]() out of curiosity for new database tooling. All of them have a migration story, from prisma's migration generators, which automatically generate migrations for you to planetscale's migration branches and live schema changes. It got me wondering what are my real pain points with migrations and what would I look for in new tooling.

I'll start by establishing migration practices that I've previously employed and then see what shortcomings we can pick out.

## Migration practices

The last company I worked for had a set of python micro-services. They all used sqlalchemy as an ORM and Alembic to generate migrations. Alembic is a tool which reads your sqlalchemy class models and your current schema and if there is a change it'll generate sqlalchemy code to upgrade the database schema.

## Auto-generated migrations 

Typically alembic would work well for small changes like adding a new column. But for any other changes you'd typically need to go in and customize the migration yourself. You'd also have to watch out for pitfalls, like changing a column type on a large table. In those cases Alembic would generate a migration for you that would lock the table and write to every row, which could result in brief outages. 

We also never used migration rollbacks. The ideas was that we'd never write destructive migrations, so while Alembic generated them it was the understanding that we'd never use them in production. We'd instead create small additive migrations. This meant two things:

1. Migrations were typically safe.
2. Some migrations took a long time to deploy. 

For instance if you wanted to change a column type.

You would have to follow these five steps each time.
 
1. Add the new column.
2. Add code to write to the new & old column.
3. Backfill the new column.
4. Remove code writing to the old column.
5. Drop the old column. 

In this case we clearly traded speed for safety.

The migrations were run in a pre-deploy hook on code deploy. It was great that database schema changes followed the same process as any other code deployment, but because of our migration path listed above it meant that your deployment cadence directly affected the speed of migrations.

Because our cluster used some proprietary 

## Findings 

### Migration generation tools are fragmented.  

## Problem 

Alembic is a SQLchemy specific tool. It would be great if there was a language agnostic tool that generated migrations. It looks like edgedb and prisma are solving this problem, however prisma seems solely focused on the JavaScript ecosystem.

## Solution

I think the approach edgedb & prisma have taken here is the right one. Having a language agnostic schema and a single tool to generate migrations is great. It has other benefits like automatically generated type declarations.

### Migration generation tools don't handle complex cases.

### Problem

The auto-generated migration tools I've used usually only cover the naive approach. Which means you'll usually have to manually write migrations and run a drawn out multi-stage migration or briefly take down your service.

### Solution

Online schema changes can solve this, they work by creating a copy of the table and streaming new updates & inserts via triggers or replication stream to the new table, once the copy is complete it replaces the old table name with the newly copied one. This is a complex process [as decribed by Planetscale here](https://planetscale.com/docs/learn/how-online-schema-change-tools-work), but there are many tools in this space, though I haven't run one in production. Planetscale currently support this it would be great to see other tools/databases support it too.

### Problem   

### Running a database for every PR is hard 

### Problem

If you want a preview instance for each branch you'll need to run a server for each active branch, most setups for that I've seen work with a single database. However as soon as you have schema changes then your two preview instances can't work with the same database.  

### Solution

Probably the simplest is to run a new database for every branch. Companies like [neon]() could make this simple. The other option is some sort of branching of schema, but I'm not sure this is a route worth pursuing.
