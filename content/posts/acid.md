---
title: "ACID definition"
description: "A quick description of ACID"
date: 2022-09-12
---

# ACID - a brief definition

Whenever I have been asked by another developer to define ACID. I have always had a bit of a hand wavy definition, describing it as <mark>"the important things that a database handles which you don't have to think about as an application developer"</mark>, I'll then fumble through through the acronym without much conviction. 

Today I was re-reading the ACID chapter of [designing data-intensive applications](https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321) as research for my [toysql project](https://github.com/craigmulligan/toysql) and I thought I'd write a post to improve my future recall and definition.

I'll preface as Kleppmann does by saying that there is some ambiguity on the definition of ACID as many systems differ in their implementation. And so if a system claims to be ACID-complaint it's still worth investigating exactly what that means.

Now onto the "definition" as described by Kleppmann. 

> ACID is an acronym that describes the safety guarantees provided by a database system's transactions.

A - **Atomicity** refers to an operation that cannot be broken down into smaller parts. In a database transaction this guarantees that if the transaction fails, all changes within that transaction will not be committed. This allows the application to safely retry the failed transaction. 

C - **Consistency** refers to the concept of satisfying invariants in your data. For example if you set a unique constraint on a column, the database must ensure that the invariant of having two duplicate values is always satisfied.

I - **Isolation** guarantees that two concurrently executing transactions are isolated from one another. It doesn't determine the isolation level. But it essentially means the client should either see all the changes (serialize-able isolation) or none of the changes (snapshot isolation) of the other client.

D - **Durability** refers to the promise that once a transaction is committed the data will not be lost. Because hard drives are not perfect it means that perfect durability likely does not exist and so some systems guarantees are weaker than others.
