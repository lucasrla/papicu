---
layout: post-with-nav
title: Sidenotes
description: Examples of Papicu sidenotes applied to different HTML elements
category: Features
date:	2022-03-01
code_blocks: true
---

Papicu supports footnotes out of the box thanks to Jekyll and kramdown. But some people {% include sidenote.html label="a" content="Like me." %}, if given the chance to choose between footnotes and sidenotes, would much prefer the latter. And that's why Papicu supports them.

Our sidenotes were heavily inspired by the [code](https://github.com/kslstn/sidenotes) published by Koos Looijesteijn {% include sidenote.html label="b" content="Check out his blog post _[Making semantic sidenotes without JavaScript](https://www.kooslooijesteijn.net/blog/sidenotes-without-js)_." %}.


## Usage

Insert a sidenote with the following line anywhere in your Markdown content {% include sidenote.html label="example" content="Example content." %}:

{% raw  %}
```markdown
... anywhere in your Markdown content {% include sidenote.html label="example" content="Example content." %}
```
{% endraw  %}


## Testing sidenotes in different contexts

Here are sidenotes applied to some "less conventional" elements:

- First, a sidenote inside a list {% include sidenote.html label="1" content="Hey!" %}

> Second, a sidenote inside a `<blockquote>` tag {% include sidenote.html label="2" content="Use either <a href='https://en.wikipedia.org/wiki/HTML'>raw HTML</a> or [Markdown syntax](https://kramdown.gettalong.org/syntax.html) inside sidenotes. Both work." %}.

<details class="content-details" open>
<!-- <summary markdown="span"> -->
<summary markdown="span">
Third, a few sidenotes inside a set of `<details>` and `<summary>` tags {% include sidenote.html label="x" content="Ahoy!" %}
</summary>
<div markdown="block">
A sidenote goes here {% include sidenote.html label="3" content="Sidenotes everywhere." %}.

> Another one here {% include sidenote.html label="4" content="Almost there." %}.
>
> - And now the very last one
> - A sidenote inside a list inside a `<blockquote>` inside a `<details>` {% include sidenote.html label="last" content="Almost there yet." %}

</div>

<div class="quote-container" markdown="block">
<p class="citation muted">Person, <cite markdown="span">[Work](#)</cite> {% include sidenote.html label="citation" content="<span markdown='span'>Now, the _gran finale_:<br/><br/>Some convoluted `sn-content`. <cite>[Cite link](#)</cite>. Another [link](#). And also some \"quotes.\"</span>" %}</p>
</div>
</details>


## Known issues

A couple of caveats when using sidenotes within Papicu:

- Footnotes and sidenotes are numbered independently. To avoid confusion, pick your preferred annotation method and stick to it

- Each sidenote must receive a different `label`. If any two sidenotes have the same `label`, only the first one will be togglable on narrow screens

- Several edge cases have not been properly handled. For instance, multiple sidenotes in a short paragraph may result in some ugly overlapping

- The look 'n' feel of our sidenotes is suboptimal on "browser readers", like [Firefox Reader View](https://support.mozilla.org/en-US/kb/firefox-reader-view-clutter-free-web-pages) and [Safari Reader](https://support.apple.com/guide/safari/hide-ads-when-reading-sfri32632/mac) {% include archive-link.html url="https://archive.is/zZK5G" %}. That's because they overwrite all CSS of a page. There isn't much we can do on this case because our sidenotes are _intentionally_ based on CSS only