---
title: "CrowdFactor"
description: "Predicting the best time to surf"
date: 2022-11-21
---

# Crowd Factor

As a [surfer](https://en.m.wikipedia.org/wiki/Surfing) you are constantly trying to assess the best time to surf. This not only involves looking at the forecast and conditions but also gauging when it's going to be most crowded. Sometimes you'll get more waves if you surf when the conditions are a little worse but the spot is less crowded - an exercise in game theory.

In order to make the best decision on when to surf you need forecast data on both the waves conditions and the crowd. The former is easy to get from [surfline](https://www.surfline.com/) but there is no data on surf crowds... YET!

The idea is that Crowdfactor provides an interface similar to google maps _["popular times"](https://blog.google/products/maps/maps101-popular-times-and-live-busyness-information/)_, giving a more quantitative approach on deciding when to surf.

![Google popular times](/img/populartimes.png)

## How it works

Every 10 mins, Crowdfactor will stream a minute of footage from a configured [surfline camera](https://www.surfline.com/surf-report/venice-breakwater/590927576a2e4300134fbed8). It then feeds that footage into a computer vision model to count the number of surfers in the water. The surfer count is then saved to a database along with the [surf rating](https://www.surfline.com/surf-news/surflines-rating-surf-heights-quality/1417) and other weather conditions at the time of recording.

![Vision model counting surfers](/img/prediction.png)

You can then use these readings to train another model which makes predictions on the crowd count based on the other parameters like day, time, wave quality and weather. These crowd count predictions are visualised along side the real recordings and the forecasted [surf ratings](https://support.surfline.com/hc/en-us/articles/5402742348955-Surf-Conditions-Ratings-and-Colors) for the day on a [dashboard](https://crowdfactor.craigmulligan.com).

![Dashboard](/img/dashboard-2.png)

## Next steps

I chose [venice-breakwater](https://www.surfline.com/surf-report/venice-breakwater/590927576a2e4300134fbed8) as an experiment because the camera stream is clear. Next I plan to set it up for a few of my local spots and then make it viewable on an e-ink display that I can mount on my wall.

[You can follow the project on github](https://github.com/craigmulligan/crowdfactor).
