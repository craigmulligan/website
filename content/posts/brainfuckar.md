---
title: "brainfuck-AR"
description: "An Augmented reality brainfuck interpreter"
date: 2023-03-01
---

# An Augmented reality brainfuck interpreter

A few weeks ago I spent some time teaching my 8 year old nephew how to code using hedy [^1]. I assumed that the challenging part would be communicating concepts like variables, memory and scope but instead our biggest hurdle was typing.

I thought every child born in the 2000s could type at 100 words per minute from birth. They spend countless hours on x-boxes and iphones but never touch a keyboard? Huh. I needed to re-access my plan.

My nephew told me he uses voice control for everything, *"why would I type when I can ask siri"*. 
All this to say that we didn't make a lot of progress on our first session, but <mark>it was typing not programming that was slowing us down.</mark>

It left me wondering if there were other ways to program computers that weren't so keyboard centric. 

I devised an experiment to make a coffee table programming card game. One which you could write a program with physical cards and have your phone interpret and run it. 

I guess conceptually it's pretty similar to punch cards except it gives instant feedback and IDE features like time travel debugging and memory visualisation using augmented reality. 

I chose [brainfuck](https://en.wikipedia.org/wiki/Brainfuck) [^2] as the language to implement. As it's name suggests, it's really hard to write, but it's extreme minimalism made it easy to implement an interpreter and print the 8 symbol cards, so that made it a pretty good fit. 

![brainfucks symbol cards on a table](/brainfuckar/cards.jpg)

For context this is a hello world program in brainfuck:

```brainfuck
++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>
---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.
```

BrainfuckAR works by [printing out brainfuck's 8 symbols](https://github.com/craigmulligan/brainfuckAR/blob/master/assets/print/custom/custom-markers.pdf). You can then compose your program by scanning each symbol with your phone. 

![screenshot of scanning](/brainfuckar/screenshot-2.png)

Once you are ready you can step through the program and watch the memory cells mutate on your phone screen and the eventually see the output of your program.

![screenshot of memory](/brainfuckar/screenshot-1.png)

<mark>It's been fun to build but hard to use.</mark> 

The augmented reality works well enough, but the cards are cumbersome to use and because brainfuck is such a verbose language it can take ages program anything. Ironically using a keyboard is way easier. I think if the target language was simpler or if it was more gamified it would be more interesting.

If you'd like to try brainfuck-AR or check out the code you can find it on [github](https://github.com/craigmulligan/brainfuckAR)

- [^1]: [Hedy](https://www.hedy.org/) is a gradual language with an web IDE that guides you through levels, as you progress the language becomes more and more complex until you are eventually writing python.
- [^2]: Brainfuck is an esoteric programming language notable for its extreme minimalism, the language consists of only eight simple commands, a data pointer and an instruction pointer. 
