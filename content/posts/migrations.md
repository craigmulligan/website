---
title: "Migration tools"
description: "Migration tools"
date: 2022-04-16
---

# New database tooling & migrations

I've been looking into [edgedb](https://www.edgedb.com/), [prisma](https://www.prisma.io/), [neon](https://neon.tech/) & [planetscale](https://planetscale.com/) out of curiosity for new database tooling. Most of them have a migration story, from prisma's migration and ORM generators to planetscale's migration branches and live schema changes. It got me wondering what are my real pain points with migrations and what would I look for in new tooling.

Here is a short list of issues I've experienced and some possible solutions provided by these tools.

### Migration generation tools are not language agnostic. 

#### Issue 

At my previous job, we used [Alembic](https://alembic.sqlalchemy.org/en/latest/) which is a tool that will auto-generate migrations based on SQLchemy models. It worked fairly well for simple cases, but if I move to a new stack I'll need to learn a new tool. It would be great if there was a language agnostic migration generation tool we could all rally around.

#### Solution

I think having a dedicated schema language and a tool which generates migrations based on changes to that schema manifest is a good solution. Both Prisma and edgedb have taken this approach. 

Having a separate manifest for your data models has other tangential benefits too like:

* Automatically generated type declarations for your data.
* Automatically generated ORMs. (I find ORMs useful in unit tests and simple cases but generally prefer SQL queries for most business logic.)
* Simplifies some of the complexities around declaring sql schema. For instance creating relationships.
* Generated migrations should encourage best practices think using `CONCURRENTLY` for building indexes.
* Creates a single source of truth for data models without needing access to the database.

---

### Migration generation tools don't handle complex cases.

#### Issue 

Auto-generated migration tools like Alembic only cover the naive approach. Which means you'll usually have to manually write migrations and run a drawn out multi-stage migration or briefly take down your service while you lock a table.

For instance if you wanted to change a column type safely. You would have to follow these five steps each time.

1. Add the new column.
2. Add code to write to the new & old column. 
3. Backfill the new column.                 
4. Remove code writing to the old column.
5. Drop the old column.

In this case we have clearly traded speed for uptime. Couldn't we have both?

#### Solution

Online schema changes can solve this, they work by creating a copy of the table and streaming new updates & inserts via triggers or replication stream to the new table, once the copy is complete it replaces the old table name with the newly copied one. This is a complex process [as described by Planetscale here](https://planetscale.com/docs/learn/how-online-schema-change-tools-work). Planetscale currently support this but there are also lots of other single purpose tools [github's gh-ost](https://github.com/github/gh-ost) and [facebook's OSC](https://github.com/facebookincubator/OnlineSchemaChange).

---

### A database for every PR is hard.

#### Issue 

Vercel popularized the notion of per branch instances of your application. These preview instances allow PR reviewers and the rest of your org test features before merging and deploying to shared environments. However generally the database is an issue with these setups. Most times I've seen these preview environments point at a single database which doesn't work if you have different branches with differing schema.

#### Solution

The simplest solution is to run a new database for every branch, but this can be expensive and slow. Products like [neon](https://neon.tech) have made this simple. Because they have isolated the storage and the compute of postgres they can provide features like [branching](https://neon.tech/docs/conceptual-guides/branching/). Where you could spawn a branch with "production" data and run your migrations and previews. I imagine sqlite databases like cloud flares [D1](https://blog.cloudflare.com/introducing-d1/) database would also enable these sorts of use cases.   

---

## Predictions

Database tooling is a huge problem space to tackle. It feels like most of the tools I've looked at solve a subset of issues. It will be interesting to see how they interop or co-opted each others features. 

I'd bet that in the future there will be a standardised "schema" language to define data models. Databases will accept these declarative schema files and migrate their schema and data to the new desired state, therefore making migrations declarative and mostly invisible to the application developer.
