---
title: "A GKE Horror story"
description: "Going down the networking rabbit hole."
date: 2022-01-21
---

# GKE horror story

I'll admit I really like Kubernetes for the most part. It makes it incredibly easy for developers to provision new servers and run jobs
without interfacing with any operations teams or cloud specific APIs. And considering that we've been running it in production for a few years we've only hit a couple of serious issues.

> Below I'll recount a incident that baffled my team and I for a few days.

Around lunch time on my support shift, I noticed a spike in our tail latency with error rates rising to around ~30% as well. Our traffic usually starts to spike around midday, but this particular day's traffic wasn't abnormal. Even though I couldn't see any evidence that our services were overwhelmed I horizontal scaled our core services. As I expected scaling these services didn't have any impact, I then notified the rest of the team and pulled everyone into a call.

We noticed one frequently used endpoint response times were higher that usual. There was an easy optimization we could make to fix this, we released a quick fix but again it didn't noticeably reduce tail latency. At this point we noted that all of our nodes had booted the previous night during our cluster maintenance window. After a little more investigation we realized our cluster and nodes had been upgraded the night before. We then looked at our staging environments as they were on earlier GKE release channels and noticed a when they were updated they also recorded a moderate latency increase. However, because we don't have representative load on our staging environments no alerts were triggered.

> So at this point we knew the issue was triggered by a cluster upgrade. 

We notified google but they weren't aware of any similar reports. Surely if there was an issue with that GKE version there would have been loads of customers experiencing this issue. What was different about our cluster/nodes or workloads? 

Unfortunately our metrics weren't that helpful in diagnosing the issue. Our individual services metrics looked fine but some ~30% of our requests would just hang when being routed between services.

We added some more logging to our proxy server to try get some more info. On deploying this our error rates subsided to a much more manageable 3-5%. We knew we hadn't made any code changes but that pods had shuffled around on deployment. This gave us a clue that it was related to the nodes rather than the running pods or code. 

<mark>Once we grouped our latency graphs by node, it was clear that some nodes were responsible for high latencies while others were perfectly fine.</mark> This powerfully illustrates the downsides of abstracting workloads from the machines they are running on, if we weren't running on k8s we likely would have looked at the underlying machines much sooner.

We sent these node ids to the team at GCP for further investigation. Unfortunately they came back and said all the nodes look perfectly healthy and there were no differences between a good and bad node in our examples.

Huh, back to the drawing board. Because our core services in production were now all scheduled on these "good" nodes and our error rates were at an acceptable level. We decided to freeze any further deploys until we could understand the problem a little better.

This gave us a little more breathing room so I started taking a deeper look at these bad nodes. I ssh'd into one of our running pods and started playing around. I tried to call another service and immediately noticed something strange.

```sh
$ curl -so /dev/null -w '%{time_total}\\n' http://xyz-service
2.514076
```

Woah, 2.5 seconds, usually this endpoint would be a couple hundred milliseconds max. I wonder what's taking so long, could it be DNS? 

```sh
$ curl -so /dev/null -w '%{time_namelookup}\\n' http://xyz-service 
2.504370
```

> Bingo

We are running an alpine image which has it's DNS timeout configured to 2.5s, Debian is usually set to 5s which explains some of the other timings we were seeing.

Surprisingly every 5th call or so would go through without a timeout, sounds like a race condition.

After a little more digging I found [this article](http://web.archive.org/web/20210226064036/https://blog.quentin-machu.fr/2018/06/24/5-15s-DNS-lookups-on-kubernetes/), which explains that there is a race conditions in DNS clients when they do ipv4 and ipv6 queries in parallel using the same socket. It appears to be a kernel specific issue. There is a patch for this in Debian but it is not patched in alpine. However you can get around it by using the `single-request-open` options. I applied the DNS config change and it immediately solved the issue.

```yaml
// deployment.yaml
DNSConfig:
  options:
    - name: single-request-reopen
...
```

Once again I reported this to google engineers who assured me that the patch mentioned in the article was applied to all of our nodes. Could this be a red-herring? While this DNS config change fixes the issue we still don't know the root cause.

A little more digging and I found that all of these bad nodes had a `kube-DNS` service running on them. I experimented by removing the `kube-DNS` service around. And found that service that was co-located on a node with `kube-DNS` would suffer from the DNS-timeout issue.

At this point, I setup a cluster with a single nginx server with 3 separate pods logging calls to the service each second. `DNS-test-colocated`, `DNS-testnot-colocated` and `DNS-test-colocated-with-DNS-fix`.

The results tracked with my current observations.

| Pod                             | Description                                                                                       | Result  |
|---------------------------------|---------------------------------------------------------------------------------------------------|---------|
| DNS-test-colocated              | Pod located on the same node as kube-DNS.                                                         | Fail    |
| DNS-testnot-colocated           | Pod located on a different node to kube-DNS.                                                      | Success |
| DNS-test-colocated-with-DNS-fix | Pod located on the same node as kube-DNS but with the `single-request-reopen` DNS config applied. | Success |

At this point I knew this had nothing to do with our code or workloads so I sent the cluster over to the google engineers to investigate. A few days they came back confirming that GKE `1.18.16` had a bug with DNS clients co-located with kube-DNS while the cluster setting `intra-node network visibility` was enabled. 

I toggled off the intra-node visibility feature and immediately my DNS tests were all passing.

The intra-node setting was enabled by our team a few weeks earlier to try get a better observability of our system outside of our services, fortunately it wasn't in use yet, so it was an easy decision to switch off.

### Lessons learnt and re-learnt.

1. It's almost always DNS.
2. With production systems always stay on the well trodden path.
3. If you want another team to fix something you need to create a minimal reproduce-able reproduction of the issue.

These are a few days I'll never get back but I enjoyed falling down the rabbit hole.
