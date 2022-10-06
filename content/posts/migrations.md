---
title: "Migration practices"
description: "Migration practices"
date: 2022-10-04
---

I've been looking into [edgedb]() [prisma]() & [planetscale]() out of curiosity for new database tooling. All of them have a migration story, from prisma's migration generators, which automatically generate migrations for you to planetscale's migration branches and live schema changes. It got me wondering what are my real pain points with migrations and what would I look for in new tooling.

I'll start by establishing migration practices that I've previously employed and then see what shortcomings we can pick out.

## Migration practices

The last company I worked for had a set of python micro-services. They all used sqlalchemy as an ORM and Alembic to generate migrations. Alembic is a tool which reads your sqlalchemy class models and your current schema and if there is a change it'll generate sqlalchemy code to upgrade the database schema.


```

```

Typically it would work well for small changes like adding a new column. But for any other changes you'd typically need to go in and customize the migration yourself. You'd also have to watch out for pitfalls, like changing a column type on a large table. In those cases Alembic would generate a migration for you that would lock the table and write to every row, which could result in brief outages. 

We also never used migration rollbacks. The ideas was that we'd never write destructive migrations, so while Alembic generated them it was the understanding that we'd never use them in production. We'd instead create small additive migrations. This meant two things:

1. Migrations were typically safe. 
2. Some migrations took a long time to execute. 

For instance if you wanted to change a column type. 

You would have to follow these five steps each time.
 
1. Add the new column 
2. Add code to write to the new & old column.
3. Backfill the new column.
4. remove code writing to the old column.
5. Drop the old column. 

In this case we clearly traded speed for safety. 

The migrations were run in a pre-deploy hook on code deploy. In theory this should work well but in practices it had some shortcomings. Because we didn't use schema rollbacks if you were deploying multiple code changes at once you could get in a state where you couldn't rollback code changes. Say you are trying to deploy the following changes. 

* `1.0.1` - [Feature] New exciting Feature. 
* `1.0.2` - [Migration] Add new column.    

Say production is currently on `1.0.0` and we deployed the two changes above and later detected bug with `1.0.1`. We wouldn't be able to easily rollback, because the pre-deploy hook would expect migration from `1.0.2` to be there and would raise `Cant find migration`. Their are lots of possible fixes for this, the most obvious being to make the db schema deploy separately to the code, but we never prioritized this because it was fairly straight forward to tag a new version of code without the changes that contained the bug.

So that's a pretty full picture of our migration setup, there are definitely a lot of things I don't like about it now that I write it down, let's try enumerate the problems.

1.
2. 
3.


