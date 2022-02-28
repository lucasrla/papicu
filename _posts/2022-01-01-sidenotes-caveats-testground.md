---
layout: post
title: Advanced usage of sidenotes
description: An example post showing the different ways of using sidenotes within Papicu
image: assets/img/screenshot-advanced-sidenotes-light.png
date:	2022-01-01
---

## Advanced examples

Here are sidenotes applied to a few different elements:

- Firstly, a sidenote inside a {% include sidenote.html id="1" label="list" content="I am a sidenote." %}

> Secondly, a sidenote inside a `<blockquote>` tag, but the label of this one is different. It is not superscript like the others. It's inline! {% include sidenote.html id="2" mode="inline" content="A sidenote with a different kind of label." %}

<details class="inline-expander">
<summary markdown="span">
Thirdly, sidenotes inside a `<details>` tag
</summary>
<div>
A sidenote {% include sidenote.html id="3" label="here." content="Sidenotes everywhere." %}

> And the {% include sidenote.html id="4" label="last one." content="Enough." %}
</div>
</details>

Finally, {% include sidenote.html label="let's try a sidenote with no numbering" content="Here it is! Simply include a sidenote with `label` set, but with no `id` whatsoever." %}. A word of caution though. This kind of "numberless" sidenotes won't be easily accessible (or visible) to readers using mobile devices.

Check out the [Markdown file behind this page](https://raw.githubusercontent.com/lucasrla/papicu/main/_posts/2022-01-01-sidenotes-caveats-testground.md) to learn how the sausage was made.

## Caveats

A couple of caveats when using sidenotes within Papicu:

- Footnotes and sidenotes are numbered independently. To avoid confusion, pick your preferred annotation method and stick to it

- Numbering of sidenotes must be done manually (via the `id` property)

- Several edge cases have not been properly handled. For instance, multiple sidenotes in a short paragraph may result in some ugly overlapping

- The look 'n' feel is suboptimal on Apple's [Safari Reader](https://support.apple.com/guide/safari/hide-ads-when-reading-sfri32632/mac) ([a](https://archive.is/zZK5G))