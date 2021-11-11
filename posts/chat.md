---
title: "Reimagining Chat"
description: "A fresh take on team chat"
---

# Reimagining Chat

Last week [flowdock](http://status.flowdock.com/) a popular chat software for startups went down for a non-insignificant amount of time (over a day). It's users obviously politely expressed their disappointment on twitter. It got me thinking why haven't those users alreaady moved to a new platform.

Flowdock has been stagant for years, they don't even have dark-mode 😱. The reality is that there aren't many better alternatives.
Flowdock has a great threading implementation that for some reason no product manager has copied.

I haven't used all platforms out there but I'd choose flowdock over slack anyday even with their reliability track record. This is only because it mostly encourages you to reply in thread, and because with threads it's easy to asynchronously read conversations. With slack found that I had to read things in realtime and I couldn't easily go back, find & follow a conversation.

At my previous job we used slack, and most of the team only had experience with email for work coms. It was a shit show, you'd constantly have to explain to new employees how to use slack effectively. `@noob please reply in thread.`, `@noob wrong channel.`, `@noob please only @me if it\'s an emergency.`... sound familiar?

Why don't these apps encourage or better yet enforce best practices? Below I've outlined some good practices I've learnt along the way and how software could
guide the user to do the right thing.

<h4 class="mb-8 text-4xl font-bold tracking-tighter leading-tight">Best practices:</h4>

1. **Always chat in-thread.** - This is particularly important in busy channels when you have concurrent conversations. Most chat systems have support for this with varying capabilities. I know in slack, people are constantly forgetting and instead replying out of thread making it really hard to follow conversations if you are reading them later and often threads are split with half the team replying in thread an the other half directly in the channel.

We could encourage the right behaviour by making it harder to start a new thread than reply to a thread. Creating new threads should happen atleast ~10 times less than replies, so the interface should optimize for replies rather than thread creation like most currently do.

<hr/>

2. **Don't post the wrong message in the wrong channel.** - How many times have you seen a new employee accidentally post a new design to `/marketing` when there is actually a `/design` channel. Worse still there are often cases where channels are ambigious or dead which means you have to maintain a seperate wiki to onboard new employees to instructing on what content goes where.

We could avoid this by getting rid of channels all together. I have reservations about how this would scale in a bigger orgs. But it'd make everything a lot simpler and transparent for smaller teams and if the threading abstraction is powerful enough you may be able to get away with it.

<hr/>

3. **Discuss in the open.** - It's generally better to have discussions in public so the rest of the team can learn from your dicussion or offer insight if they happen to read it.

Direct messages are great for inside jokes and swapping bread recipes but the problem is that it can quickly go from: `Can you send that sourdough recipe?` to: `I'm getting webpack build errors please help me?`.
The latter should be out in the open so anyone can jump in and help if they are around, and in the future more team members can search and learn from.

This may seem harsh, but I'd recommend disabling direct messages all together. I think eventually everyone would get pretty comfortable with chatting in the open. Even if it's social chat. And if you really need to discuss things in private, you can use email or some other medium. The whole point is to encourage best practices in this case it maybe, a touch draconian, so I'm open to better ideas?

<hr/>

4. **Don't distract your teammates.** - I'll never understand how someone accomplishes anything with their chat notifications turned on. Every couple of minutes a popup appears top-right and you have to decided whether to abandon your current work or it ignore and push ahead.

This has to be solved with a new notifications model. I'd propose two ways of calling for attention a `mention`, which is done by simply `@username` in the message as is currently convention and a new more aggressive measure a `ping`, which is exposed with via a button with a confirmation dialogue.

This would mean that users could check their mentions at their own pace. A ping would trigger a immediate OS notification and is only used only for emergencies. This means that no-one has to specifically set notification settings for their work hours and have other methods for emergencies. It's a sensible default.

<hr/>

5. **Always Acknowledge** - A common complaint with any fast paced communication system is that messages are often missed. How many times has a colleague asked you did you see my message on slack? Often when making an announcement, for instance `@dev-team deploy v1.0.1 is going out in 1hr please test your changes`. It's super important that all those mentioned, should ack that message. Right now there aren't great ways to do this, most teams just use emoji's or some arbitrary convention but then it's up to the sender to validate that everyone has responded.

Instead it should provide you with info on has not ack'd the message, `11/12 of the @dev-team` have ack'd this. @hobochild has not seen it yet <would you like to ping them?>.`

<hr/>

These are just a few ideas on how we could make communication at work better. I have a few others brewing, like forking, merging and tagging threads. I plan to build a prototype to see how these ideas work in practice, a sort of middleground between slack and whatsapp aimed at small businesses. If you have feedback or would like to be a beta tester please <a href="mailto:hobochildster@gmail.com">reach out</a>.
