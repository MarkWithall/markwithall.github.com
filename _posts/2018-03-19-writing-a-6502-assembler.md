---
layout: post
title: Writing a 6502 Assembler
description: An account of the beginning of my adventure writing a 6502 assembler for the C64.
categories: programming
---
Recently, I rediscovered the joy of the Commodore 64. The C64 was one of my first computers and I spent hours programming in Basic on it. However, possibly due to the lack of the Internet at the time, I never learned to program it in machine code. I always felt rather disappointed by this. It seemed to me that so much more could be done in machine code but the resources of my local library did not support learning such things. Oddly, the thing that I most wanted to do back then was to have a loading screen on my Basic programs; that drew a picture and played music while bringing the program in from the cassette.

Now, with most of the books on C64 programming being freely available on the Internet, along with many other resources, I felt it was time to finally learn 6502 assembly programming (actually, 6510 on the C64).

Initially, I picked up a copy of Jim Butterfield's "Machine Language" and began working through it using Supermon on the VICE C64 emulator. But after a while I became frustrated with the speed of development on the machine itself and decided to write the code on the PC and cross-assemble. I looked into various existing assemblers and IDEs but thought it would be more fun to try writing my own; to give me a better understanding of the instructions available.

The project is still a work in progress but you can follow how it is going on [GitHub](https://github.com/MarkWithall/Assembler6502). I’m killing two birds with one stone here and finally taking a look at .NET Core and developing on both Windows and MacOS at the same time. Line endings aside, the process has turned out to be quite smooth; using Visual Studio Professional 2017 on the PC and Visual Studio for Mac Community Edition. I’m regularly feeling the pain of the lack of ReSharper for the Mac though; even though the refactoring tools built in to Visual Studio are coming along nicely. I’m following a relatively ‘pragmatic’ TDD approach to development and committing the code on every green or refactoring, to allow the process to be followed easily.

It is my intention to record a video of the development at some point and writing that down here might actually make it happen.

Once the assembler is complete, at least in first draft, I shall write [Conway’s Game of Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life) for the C64 and see how it is to work with and if any adjustments are needed. Maybe the next step will be writing an IDE too with nice refactoring and static analysis features.

Hopefully, more updates on progress to follow.
