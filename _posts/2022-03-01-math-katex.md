---
layout: post-with-nav
title: Math equations with KaTeX
description: Write beautiful math expressions directly from Markdown; easy to use and high performance (no client-side JavaScript, just CSS)
category: Features
date:	2022-03-01
code_blocks: true
katex: true
---

[$${\KaTeX}$$](https://katex.org/) is "the fastest math typesetting library for the web."

## Usage

To enable KaTeX in Papicu, add `katex:` `true` to a post or page's [front matter](https://jekyllrb.com/docs/front-matter/). Then, inside your Markdown content, add the desired expression between `$$`, like: `$$ expression $$`.

## Examples

Here's an example of a KaTeX expression displayed inline: $$h(x) = B e^{C x}$$.

You can also give the formula more space to breath by leaving the expression {% include sidenote.html label="sn-gompertz" content="In case you are curious, $$h(x) = B e^{C x}$$ is a definition of the [Gompertz hazard function](https://en.wikipedia.org/wiki/Gompertz_function)." %} alone on a paragraph. KaTeX will automatically center it:

$$h(x) = B e^{C x}$$

<details class="code-details">
<summary markdown="span" class="button smaller show-hide">
`code` snippet
</summary>
<div markdown="block">
```md
Here's an example of a KaTeX expression displayed inline: $$h(x) = B e^{C x}$$.

[...] KaTeX will automatically center it:

$$h(x) = B e^{C x}$$
```
</div>
</details>

Here's a more elaborate example, taking advantage of KaTeX's [environments](https://katex.org/docs/supported.html#environments):

$$
\begin{equation*}
\begin{split}
a &=b+c \\ &=e+f
\end{split}
\end{equation*}
$$

<details class="code-details">
<summary markdown="span" class="button smaller show-hide">
`code` snippet
</summary>
<div markdown="block">
```tex
$$
\begin{equation*}
\begin{split}
a &=b+c \\ 
  &=e+f
\end{split}
\end{equation*}
$$
```
</div>
</details>

## Overflow shouldn't be an issue

What happens with our layout in case of a long KaTeX expression?

Let's test it out:

$$
\text{a very very very very very very very very very very very very very very very long expression}
$$

<details class="code-details">
<summary markdown="span" class="button smaller show-hide">
`code` snippet
</summary>
<div markdown="block">
```tex
$$ \text{a very very very very very very very very very very very very very very very long expression} $$
```
</div>
</details>

As you can see, Papicu limits the visible width of any KaTeX expression. And, if necessary, it automatically adds horizontal scrolling and a nice little tip.

## Supported TeX functions

Check out KaTeX docs for the [TeX](https://en.wikipedia.org/wiki/TeX) functions they support. The list is available either [sorted alphabetically](https://katex.org/docs/support_table.html) or [grouped by topic](https://katex.org/docs/supported.html).