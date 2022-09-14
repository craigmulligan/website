---
title: "Tiny tools"
description: "A list of tools I've made"
---

# Tiny tools

This is incomplete list of small tools I've written to make my life marginally easier.

## The wave cal

The [Bristol wave pool's website](http://thewave.com/) was really hard to use because you couldn't view all the sessions in one view. [The wave cal](https://thewave.craigmulligan.com) is a script which scrapes the site and outputs an ical file for easy viewing. 

## Toolbox

This is a [docker container](https://github.com/craigmulligan/toolbox) with some common networking utilities to help debugging in docker based environments. I used it to pin down [this dns issue](/posts/gke-horror-story).

## Burner

Is a [website](https://craigmulligan.github.io/burner/) which can help you use your phone as a backup bike light. Of coarse use at your own risk and get a real bike light.

## Supertube

Supertube is a [small cli](https://github.com/craigmulligan/supertube) to pipe data from one machine to another via [patchbay](https://patchbay.pub/index.html).

## Bump

This is a [tiny cli](https://github.com/craigmulligan/bump) to bump git tags in a specific format we used at [beryl](https://beryl.cc/).

## Isolate changes

This is a [github action](https://github.com/craigmulligan/isolate-changes-action) which restricts changes to specific files per PR. For instance if you want migrations to always be merged without code changes, you can add this CI check to ensure files aren't touched in migrations + any other folder.

## Occupied

My first flat share in London was a three story with 6 people and one bathroom, so running down the stairs to check if the bathroom was occupied became a common annoyance for everyone in the house. I [hooked up a raspberrypi to a reed-switch](https://hackster.io/craigmulligan/occupied-507dc6) with a fancy front-end to text people when it's their turn for the bathroom.
