---
title: "brainfuck-AR"
description: "An Augmented reality brainfuck interpreter"
date: 2023-03-01
---

# An Augmented reality brainfuck interpreter

A few weeks ago I spent some time teaching my 8 year old nephew how to code using hedy [^1]. I assumed that the challenging part would be communicating concepts like variables, memory and scope but instead our biggest hurdle was typing. I thought every child from birth could type at 100 words per minute, they spend hours on their phone/x-box, wouldn't this be the first thing they learn at school after reading? 

I was spinning I needed to re-access my plan. My nephew told me he uses voice control for everything, *"why would I type when I can ask siri"*. 
<mark>All this to say that we didn't make a lot of progress on hour first session, but it was typing not programming that was slowing us down.</mark>

It left me wondering if there were other ways to program computers that weren't so keyboard centric. I devised an experiment to make a coffee table programming card game. One which you could write a program with physical cards and have your phone interpret and run it. 

I guess conceptually it's pretty similar to punch cards except it gives instant feedback and IDE features like time travel debugging and memory visualisation using augmented reality. 

As you can tell from the title I chose [brainfuck](https://en.wikipedia.org/wiki/Brainfuck) [^2] as the language to implement. As it's name suggests it's really hard to write any sort of complex program, but it's extreme minimalism made it easy to implement an interpreter and print the 8 card symbols, so that made it a pretty good fit. 

For context this is a hello world program in brainfuck:

```brainfuck
++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>
---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.
```

BrainfuckAR works by [printing brainfuck's 8 symbols](https://github.com/craigmulligan/brainfuckAR/blob/master/assets/print/custom/custom-markers.pdf). You can then compose your program by scanning each symbol with your phone. Once you are ready you can step through the program and watch the memory cells mutate on your phone screen and the eventually see the output of your program. 

<mark>It's been fun to build but hard to use.</mark> The augmented reality works well enough, but it's a bit of a gimmick. I'd prefer using a keyboard so I found the cards cumbersome. That said I do think it's useful tool if you are programming in brainfuck. There is lots of potential to make programming more approachable to those who don't feel comfortable with computers yet. 

If you'd like to try brainfuck-AR or check out the code you can find it on [github](https://github.com/craigmulligan/brainfuckAR)

- [^1]: [Hedy](https://www.hedy.org/) is an amazing tool to teach python. The interesting thing about it is that it the language changes at each level </span>
- [^2]: Brainfuck is an esoteric programming language notable for its extreme minimalism, the language consists of only eight simple commands, a data pointer and an instruction pointer. 
