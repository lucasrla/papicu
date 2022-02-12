---
layout: post
title: Advanced usage of sidenotes
date:	2022-01-01
code_highlighter: True
---

## Caveats

A couple of caveats when using sidenotes within Papicu:

- Footnotes and sidenotes are numbered independently. To avoid confusion, pick your preferred annotation method and stick to it

- Numbering of sidenotes must be done manually (via the `id` property)

- Several edge cases have not been properly handled. For instance, multiple sidenotes in a short paragraph may result in some ugly overlapping

- The look 'n' feel is suboptimal on Apple's [Safari Reader](https://support.apple.com/guide/safari/hide-ads-when-reading-sfri32632/mac) ([a](https://archive.is/zZK5G))

## Testground

Here are sidenotes applied to a few different elements:

- Firstly, a sidenote inside a {% include sidenote.html id="1" label="list" content="I am a sidenote." %}

> Secondly, a sidenote inside a `<blockquote>` tag, but the label of this one is different. It is not superscript like the others. It's inline! {% include sidenote.html id="2" mode="inline" content="A sidenote with a different kind of label." %}

<details>
<summary markdown="span">
Thirdly, sidenotes inside a `<details>` tag
</summary>
<div>
A sidenote {% include sidenote.html id="3" label="here." content="Sidenotes everywhere." %}

> And the {% include sidenote.html id="4" label="last one." content="Enough." %}
</div>
</details>

Explore the source code of this page to learn how the sausage has been made.