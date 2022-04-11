---
layout: post-with-nav
title: Code highlighting
description: How to use code highlighting in Papicu, including how to fix Rouge's linenos messy output
category: Features
date:	2021-12-01
code_blocks: true
---

## Inline code

Inline code is available with backticks. Write <code>`inline code`</code> and Papicu will it render as `inline code`.

Writing inline code explicitly with <code>&lt;code></code> tags in Markdown also works, but that requires you to do more work. I would stick to backticks <code>`</code>. They're much faster to type.

<details class="code-details">
<summary markdown="span" class="button smaller show-hide">
`code` snippet
</summary>
<div markdown="block">
```md
Papicu will it render as `inline code`.

Writing inline code explicitly with <code>&lt;code></code> in Markdown also works, but having to type that is more work.
```
</div>
</details>

## Code blocks highlighted by Rouge

Snippets of multiple lines of code are supported through [Rouge](https://github.com/rouge-ruby/rouge)'s `{% raw %}{% highlight lang %}{% endraw %}`, where `lang` is [one of the languages supported by Rouge](https://github.com/rouge-ruby/rouge/wiki/List-of-supported-languages-and-lexers).

Here's an example with `{% raw %}{% highlight js %}{% endraw %}`:

{% highlight js %}
/* Example can be run directly in your JavaScript console */

/* Create a function that takes two arguments and returns the sum of those arguments */
var adder = new Function("a", "b", "return a + b");

/* Call the function */
adder(2, 6);
/* > 8 */
{% endhighlight %}

<details class="code-details">
<summary markdown="span" class="button smaller show-hide">
`code` snippet
</summary>
<div markdown="block">
{% raw  %}
```liquid
{% highlight js %}
/* Example can be run directly in your JavaScript console */

/* Create a function that takes two arguments and returns the sum of those arguments */
var adder = new Function("a", "b", "return a + b");

/* Call the function */
adder(2, 6);
/* > 8 */
{% endhighlight %}
```
{% endraw  %}
</div>
</details>

Besides `{% raw %}{% highlight lang %}{% endraw %}`, you can also render multi-line code using code fencing with triple backticks: <code>```lang</code>. The look 'n' feel will be the same:

```js
/* Create a function that takes two arguments and returns the sum of those arguments */
var adder = new Function("a", "b", "return a + b");
```

<details class="code-details">
<summary markdown="span" class="button smaller show-hide">
`code` snippet
</summary>
<div markdown="block">
{% comment %}
https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks
To display triple backticks in a fenced code block, wrap them inside quadruple backticks.
{% endcomment %}
````md
```js
/* Create a function that takes two arguments and returns the sum of those arguments */
var adder = new Function("a", "b", "return a + b");
```
````
</div>
</details>

If long lines are present, code blocks will automatically get horizontal scrolling.


## `linenos` and how to fix it

There's an additional argument, `linenos`, that gives us a [code block with numbered lines](https://jekyllrb.com/docs/liquid/tags/#line-numbers): `{% raw %}{% highlight js linenos %}{% endraw %}`.

We haven't showed an example with `linenos` because it makes Jekyll generate nested `<pre>` elements, which is invalid HTML and messes with our minifier. We'd rather keep our HTML minifier happy and working properly, so we'd avoided `linenos` altogether.

There had been a pull request to Jekyll ([#8412](https://github.com/jekyll/jekyll/pull/8412)) creating a new tag, `rougify`, that would generate valid HTML and thus substitute `highlight`. But the PR hasn't been merged and it is now closed.

For now, if you need numbered lines in your code blocks, use [this workaround](https://github.com/penibelst/jekyll-compress-html/issues/71#issuecomment-188144901) proposed by [@DeXP](https://github.com/DeXP).

So let's suppose you have:

{% raw %}
```liquid
{% highlight lang linenos %} Some code {% endhighlight %}
```
{% endraw %}
   
Now you must change it to:

{% raw %}
```liquid
{% capture fixed_code %}
{% highlight lang linenos %} Some code {% endhighlight %}
{% endcapture %}

{% include fix-linenos.html %}
{{ fixed_code }}
```
{% endraw %}

Here's an actual, working example with numbered lines thanks to this fix:

{% capture _code %}
{% highlight js linenos %}
/* Create a function that takes two arguments and returns the sum of those arguments */
var adder = new Function("a", "b", "return a + b");
{% endhighlight %}
{% endcapture %}

{% include fix-linenos.html %}
{{ _code }}

<details class="code-details">
<summary markdown="span" class="button smaller show-hide">
`code` snippet
</summary>
<div markdown="block">
{% raw  %}
```liquid
{% capture fixed_code %}
{% highlight js linenos %}
/* Create a function that takes two arguments and returns the sum of those arguments */
var adder = new Function("a", "b", "return a + b");
{% endhighlight %}
{% endcapture %}

{% include fix-linenos.html %}
{{ fixed_code }}
```
{% endraw  %}
</div>
</details>

For another approach, check out [Byte Dude's implementation](https://www.bytedude.com/jekyll-syntax-highlighting-and-line-numbers/#the-final-code) {% include archive-link.html url="https://archive.is/W3Uw8" %}. It is based on his Jekyll plugin, [highlight-linedivs](https://github.com/m-cat/highlight-linedivs).