---
layout: post
title: Post containing demos of several features
date:	2021-02-01
description: Example post with demos of interactive charts, expandable & collapsible content, and all the other features found in Papicu
description_visible: true
image: 
  path: assets/img/screenshot-post-with-bells-and-whistles-light.png
  # height: 256
  # width: 256
  alt: "Screenshot of this post"
katex: true
chartjs: true
toc: true
# toc_type: fixed
# toc_starts_closed: true
# toc_header_min: 1
# toc_header_max: 2
code_highlighter: true
anchorjs: true
lightbox: true
listjs: true
---

## Dark mode via Darken

We rely on [Darken](https://github.com/ColinEspinas/darken) for our dark mode:

> A lightweight and cross-browser library that allows you to easely manage your dark mode for your websites and applications.
> 
> Written in plain vanilla javascript.

You might have noticed the color-scheme switcher on the bottom right corner of every page.

## Analytics via Shynet

[Stop using Google Analytics](https://news.ycombinator.com/item?id=26263149), self host [Shynet](https://github.com/milesmcc/shynet) instead.

Here is my own [how-to guide for self-hosting Shynet](https://github.com/lucasrla/shynet-docker-lightsail) using AWS Lightsail and Cloudflare.

Besides Shynet, there are several other privacy-friendly alternatives to Google Analytics. [umami](https://umami.is/), for instance, looks great, and it offers events tracking! (Shynet currently does not.)

Browse a good list of analytics alternatives at [github.com/0xnr/awesome-analytics](https://github.com/0xnr/awesome-analytics#privacy-focused-analytics) and [Privacy Focused Analytics](https://privacyfocusedanalytics.info/).

Papicu has built-in support to Shynet. To enable it, uncomment and modify the following line in `_config.yml` to match your needs:

```conf
shynet: "https://shynet.john_doe_website.com/ingress/uuid-universally-unique-identifier/"
```


## Interactive charts via Chart.js

[Chart.js](https://www.chartjs.org/) provides "Simple HTML5 Charts using the `<canvas>` tag."

> As of Jan 2022, Papicu is still using [Chart.js 2.9.4](https://www.chartjs.org/docs/2.9.4/). At some point in the future we might make the effort to migrate to Chart.js 3+.

Here's an example of a nice interactive chart built with Chart.js.

Suppose you are a male living in the U.S., England & Wales, or Brazil. Given your age, what are your chances of dying this year? The chart below provides you a good estimate[^1]:

{% include chartjs/warning-narrow-screen.html %}
<div class="charts">
  <canvas id="canvas-recent-mortality-males"></canvas>
</div>

[^1]: Data from the national bureaus of statistics: [United States Life Tables, 2017](https://stacks.cdc.gov/view/cdc/79487) ([PDF](https://www.cdc.gov/nchs/data/nvsr/nvsr68/nvsr68_07-508.pdf)) by Elizabeth Arias and Jiaquan Xu ([CDC/NCHS Life Tables](https://www.cdc.gov/nchs/products/life_tables.htm)), published in 2019; [English Life Tables No. 17: 2010 to 2012](https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/lifeexpectancies/bulletins/englishlifetablesno17/2015-09-01) ([PDF](https://webarchive.nationalarchives.gov.uk/20160106044025/https://ons.gov.uk/ons/guide-method/method-quality/specific/population-and-migration/demography/english-life-tables--no--17---2010-2012.pdf)) by Jakub Bijak, Erengul Dodd, Jonathan J. Forster, and Peter W. F. Smith, published in 2015; [Tábua completa de mortalidade para o Brasil – 2018](https://biblioteca.ibge.gov.br/index.php/biblioteca-catalogo?view=detalhes&id=73097) ([PDF](https://biblioteca.ibge.gov.br/visualizacao/periodicos/3097/tcmb_2018.pdf)) by Instituto Brasileiro de Geografia e Estatística ([IBGE](https://www.ibge.gov.br/en/home-eng.html)), published in 2019.

To use Chart.js in Papicu you must add `chartjs: True` to a post/page [front matter](https://jekyllrb.com/docs/front-matter/). 

For the chart above, I used the following source code:

{% raw  %}
```liquid
{% include chartjs/warning-narrow-screen.html %}
```

```html
<div class="charts">
  <canvas id="canvas-recent-mortality-males"></canvas>
</div>
```

```liquid
{% include chartjs/defaults.html %}
{% include interact/mortality-curves.html %}
{% include interact/mortality-data.html %}
```
{% endraw %}

If you want to understand what is really going on, I recommend that you [inspect the source files yourself](https://github.com/lucasrla/papicu).


## Expandable & collapsible content via `<summary>` and `<details>`

Papicu takes `<summary>` and `<details>` to the next level and make collapsible content easier to build and more pleasant to read.

If you have ever used [Notion](https://notion.so) or [Workflowy](https://workflowy.com), you have already experienced the power of collapsible blocks.

<details open class="inline-expander">
<summary markdown="span">
Here is an example of a collapsible box that starts out open
</summary>
<div>
If you are reading this on a computer with a mouse, hover over above (where it reads "Here is an example of a collapsible box that starts out open"). Have you noticed a sign on the left? That is to indicate that it contains expandable content.

Incidentally, what you are reading here _is_ the expandable content.

You can also collapse it to hide it out. Simply tap (or click, if you are using a computer) on the sign to toggle it.
</div>
</details>

We started with vanilla `CSS` to create boxes like this. Then, we added a few tricks[^2] to make [kramdown](https://github.com/gettalong/kramdown/) behave properly.

[^2]: 
    For more information on the tricks, check out: [kramdown Syntax - HTML Blocks](https://kramdown.gettalong.org/syntax.html#html-blocks), [kramdown Options - parse_block_html](https://kramdown.gettalong.org/options.html), [issue #155](https://github.com/gettalong/kramdown/issues/155), [issue #213](https://github.com/gettalong/kramdown/issues/213). 
    
    But let me also put it here for our own future reference:
    - Add `parse_block_html: true` under `kramdown:` in `_config.yml`
    - Add `markdown="span"` to every `<summary>` tag

    Voilà!

Here are a few more examples of "expandable" boxes. The ones below start out closed by default. You will need to tap/click on them to expand and read what's inside.

<details class="inline-expander">
<summary markdown="span">
Here are a few more examples (that start out closed)
</summary>
<div>
Hey!
</div>
</details>

<details class="inline-expander">
<summary markdown="span">
Yet another closed one
</summary>
<div>
Howdy!
</div>
</details>

<details class="inline-expander">
<summary markdown="span">
Third time's a charm
</summary>
<div>
Isn't it?
</div>
</details>

Their source code is pretty straightforward:

```html
<details class="inline-expander">
<summary markdown="span">
Here are a few more examples (that start out as closed)
</summary>
<div>
Hey!
</div>
</details>

<details class="inline-expander">
<summary markdown="span">
Yet another closed one
</summary>
<div>
Howdy!
</div>
</details>

<details class="inline-expander">
<summary markdown="span">
Third time's a charm
</summary>
<div>
Isn't it?
</div>
</details>
```


## Table of contents via jekyll-toc

To enable a table of contents, you must add `toc: True` to the [front matter](https://jekyllrb.com/docs/front-matter/).

[jekyll-toc](https://github.com/allejo/jekyll-toc) infers the structure your Markdown content from its headings, and automatically generates a table of contents for you.

And thanks to [Gumshoe](https://github.com/cferdinandi/gumshoe/), as you scroll through a page's content, your current location will also be updated at the table of contents.


## Math equations via KaTeX

[$${\KaTeX}$$](https://katex.org/) is "the fastest math typesetting library for the web."

To enable KaTeX use, you must add `katex: True` to a post or page [front matter](https://jekyllrb.com/docs/front-matter/). Having done that, simply type your expression between `$$`.

Here's an example of a KaTeX expression displayed inline: $$h(x) = B e^{C x}$$.

(In case you are curious, this is  a definition of the [Gompertz hazard function](https://en.wikipedia.org/wiki/Gompertz_function).)

You can also give the formula more space to breath by leaving the expression alone on a paragraph. KaTeX will automatically center it:

$$h(x) = B e^{C x}$$

The source code for that is simply:

```tex
$$h(x) = B e^{C x}$$
```

Here is a more elaborate example, taking advantage of KaTeX's [environments](https://katex.org/docs/supported.html#environments):

$$
\begin{equation*}
\begin{split}
a &=b+c \\ &=e+f
\end{split}
\end{equation*}
$$

```tex
$$
\begin{equation*}
\begin{split}
a &=b+c \\ &=e+f
\end{split}
\end{equation*}
$$
```

## Sidenotes

Papicu supports footnotes[^3] out of the box thanks to Jekyll and kramdown. 

[^3]: This is a footnote.

But, if given the choice, some people (including myself) would rather use sidenotes instead. Fortunately, Papicu supports {% include sidenote.html id="4" label="sidenotes" content="This is a sidenote (also known as a margin note)." %} as well.

Our sidenotes draw heavily from the [sidenotes code](https://github.com/kslstn/sidenotes) published by {% include sidenote.html id="5" label="Koos Looijesteijn." content="Check out his blog post, <a href='https://www.kooslooijesteijn.net/blog/sidenotes-without-js' class='muted'>Making semantic sidenotes without JavaScript</a>." %}

The basic usage of sidenotes in Papicu is self-explanatory:

{% raw  %}
```html
Our sidenotes draw heavily from the [sidenotes code](https://github.com/kslstn/sidenotes) published by {% include sidenote.html id="5" label="Koos Looijesteijn." content="Check out his blog post, <a href='https://www.kooslooijesteijn.net/blog/sidenotes-without-js' class='muted'>Making semantic sidenotes without JavaScript</a>." %}
```
{% endraw  %}

For more, check out the post [Advanced usage of sidenotes](/sidenotes-caveats-testground/).

Incidentally, here's how to use footnotes as well. There's nothing specific to it. It's just basic Markdown:

```html
Papicu supports footnotes[^3] out-of-the-box thanks to Jekyll and kramdown. 

[^3]: This is a footnote.
```

## Responsive images

A picture of Fortaleza's coast that resizes automatically on different screen sizes:

<img alt="Fortaleza's coastline" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Fortaleza_-_Cear%C3%A1_-_Brasil.jpg/640px-Fortaleza_-_Cear%C3%A1_-_Brasil.jpg" class="center-block responsive" />

<p class="small center"><em>Photo by [deltafruit](https://www.flickr.com/photos/55953988@N00/), via [Wikipedia entry about Fortaleza](https://en.wikipedia.org/wiki/Fortaleza)</em></p>

Here is the source code behind what you see above:

```html
<img alt="Fortaleza’s coastline" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Fortaleza_-_Cear%C3%A1_-_Brasil.jpg/640px-Fortaleza_-_Cear%C3%A1_-_Brasil.jpg" class="center-block responsive" />

<p class="small center"><em>Photo by [deltafruit](https://www.flickr.com/photos/55953988@N00/), via [Wikipedia entry about Fortaleza](https://en.wikipedia.org/wiki/Fortaleza)</em></p>
```

## Lightbox

Thanks to [Tobii](https://github.com/midzer/tobii), Papicu has the ability to show images in a lightbox, where they can be bigger and easier to zoom in.

For instance, instead of having just the `640px`-wide image of Fortaleza's coastline (that we've seen above), we could give to users interested in a closer looking the chance to view a higher quality, `2560px`-wide image. 

To see it in action, simply tap or click on the image below:

<a class="lightbox" href="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Fortaleza_-_Cear%C3%A1_-_Brasil.jpg/2560px-Fortaleza_-_Cear%C3%A1_-_Brasil.jpg">
  <img alt="Fortaleza’s coastline" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Fortaleza_-_Cear%C3%A1_-_Brasil.jpg/640px-Fortaleza_-_Cear%C3%A1_-_Brasil.jpg" class="center-block responsive" />
</a>

To use it, add `lightbox: true` to your post's [front matter](https://jekyllrb.com/docs/front-matter/) and then:

```html
<a class="lightbox" href="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Fortaleza_-_Cear%C3%A1_-_Brasil.jpg/2560px-Fortaleza_-_Cear%C3%A1_-_Brasil.jpg">
  <img alt="Fortaleza’s coastline" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Fortaleza_-_Cear%C3%A1_-_Brasil.jpg/640px-Fortaleza_-_Cear%C3%A1_-_Brasil.jpg" class="center-block responsive" />
</a>
```

## Lazy-loaded, responsive, 16:9 YouTube embeds

Now, why not some drone aerial footage the city of Fortaleza?

{% include youtube.html id="8qNlZGtaclk" %}

Here is how to use it:

{% raw  %}
```liquid
{% include youtube.html id="8qNlZGtaclk" %}
```
{% endraw %}

Our implementation was based on [this snippet](https://github.com/pibby/jekyll-youtube) by [@pibby](https://pibby.com/) and [this codesandbox](https://codesandbox.io/s/youtube-iframe-lazy-load-qdzu6) by [@haggen](https://codesandbox.io/u/haggen).

## Anchor links via AnchorJS

Papicu can create anchor links throughout your page. This feature is brought to you by AnchorJS. 

In [their own words](https://www.bryanbraun.com/anchorjs/):

> AnchorJS lets you drop deep anchor links onto any webpage, and be on your way.
>
> You don't need to set up IDs or worry about urls. AnchorJS will respect your IDs if you have them, and generate them if you don't.
>
> AnchorJS is lightweight, accessible, and dependency-free.

What is an anchor link you might ask? 

If you are on a computer, just hover your mouse above the title of this section &mdash; Anchor links to headers via AnchorJS &mdash; and look at the blue <code style="font-family: 'anchorjs-icons'; font-size: 1em; -webkit-font-smoothing: antialiased;"></code> symbol on your left. That's an anchor link.

They're useful when someone needs to link to a specific part of a webpage. And that's why they are also known as "deep links."

If you are on a touch-based device (e.g. phone, tablet), to make things cleaner and simpler, we have anchor links hidden out by default. But you can turn it on by uncommenting the `visible: touch` line inside the `default.html` file.

To enable them, add `anchorjs: true` to your post's [front matter](https://jekyllrb.com/docs/front-matter/).

## Site search via DuckDuckGo

Inspired by [Derek Kedziora](https://derekkedziora.com)'s [implementation of site search](https://github.com/derekkedziora/derekkedziora.com/blob/8e95cea88813b47dd4a4c3390e2836389db6faa1/_includes/search.html), we've created ours:

{::nomarkdown}{% include duckduckgo-search.html %}{:/}

Use it with:

{% raw  %}
```liquid
{% include duckduckgo-search.html %}
```
{% endraw %}

If you are putting the search form inline in a Markdown file (instead of a HTML file), you will also need to enclose the include between `{::nomarkdown}` and `{:/}` to prevent kramdown from generating broken HTML:

{% raw  %}
```liquid
{::nomarkdown}
{% include duckduckgo-search.html %}
{:/}
```
{% endraw %}

{% comment %}
Refs:
- https://kramdown.gettalong.org/syntax.html#extensions
- https://stackoverflow.com/questions/13693827/markdown-prevent-paragraph-tag-being-wrapped-around-standard-html-span-tag
- https://stackoverflow.com/questions/27238542/form-tag-closing-automatically
{% endcomment %}

## Searchable, sortable, filterable tables

[List.js](https://listjs.com/) is a:

> Tiny, invisible and simple, yet powerful and incredibly fast vanilla JavaScript that adds search, sort, filters and flexibility to plain HTML lists, tables, or anything.

Check it out in action:

{::nomarkdown}
<div id="post-table">
  <p><input class="search wrapper-100" type="search" placeholder="Type here to filter entries by title, category, etc" /></p>

  {% assign posts = site.posts %}
  {% assign pages = site.html_pages %}
  <table class="small">
    <thead>
      <th class="sort" data-sort="title">Title</th>
      <th class="sort" data-sort="category">Category</th>
      <th class="sort" data-sort="type">Type</th>
    </thead>
    <tbody class="list">
      {% for p in posts %}
      <tr>
        <td class="title">
          {{ p.title | escape }}
        </td>
        <td class="category">
          {% if p.category %}{{ p.category | escape }}{% endif %}
        </td>
        <td class="type">
          <code>post</code>
        </td>
      </tr>
      {% endfor %}
      {% for p in pages %}
      {% unless p.url == "/" or p.url == "/404.html" %}
      <tr>
        <td class="title">
          {{ p.title | escape }}
        </td>
        <td class="category"></td>
        <td class="type">
          <code>page</code>
        </td>
      </tr>
      {% endunless %}
      {% endfor %}
    </tbody>
  </table>
  <br />
</div>

<script>
let listJSOptions = { valueNames: ["title", "type", "category"] };
let postsTable = new List("post-table", listJSOptions);
</script>
{:/}

To use it, first, add `listjs: true` to your post's [front matter](https://jekyllrb.com/docs/front-matter/). And then, sprinkle some magic:

{% raw  %}
```html
{::nomarkdown}
<div id="post-table">
  <p><input class="search" type="search" placeholder="Filter entries by title, type and/or category" /></p>
  
  <table>
    <thead>
      <th class="sort" data-sort="title">Title</th>
      <th class="sort" data-sort="category">Category</th>
      <th class="sort" data-sort="type">Type</th>
    </thead>
  <tbody class="list">
    <tr>
      <td class="title">Advanced usage of sidenotes</td>
      <td class="category"></td>
      <td class="type"><code>post</code></td>
    </tr>
    <tr>
      <td class="title">Post containing demos of several features</td>
      <td class="category"></td>
      <td class="type"><code>post</code></td>
    </tr>
    <tr>
      <td class="title">Post showcasing various HTML tags and code highlighting</td>
      <td class="category"></td>
      <td class="type"><code>post</code></td>
    </tr>
    <tr>
      <td class="title">A simple, text-based example post</td>
      <td class="category">Latin</td>
      <td class="type"><code>post</code></td>
    </tr>
    <tr>
      <td class="title">About</td>
      <td class="category"></td>
      <td class="type"><code>page</code></td>
    </tr>
    <tr>
      <td class="title">Thanks</td>
      <td class="category"></td>
      <td class="type"><code>page</code></td>
    </tr>
    <tr>
      <td class="title">Papicu</td>
      <td class="category"></td>
      <td class="type"><code>page</code></td>
    </tr>
    </tbody>
  </table>
  <br />
</div>

<script>
  var options = { valueNames: ["title", "type", "category"] };
  var postsTable = new List("post-table", options);
</script>
{:/}
```
{% endraw %}

For further information, make sure you read [List.js documentation](https://listjs.com/docs/).

{% include divider.html %}

{% include chartjs/defaults.html %}
{% include interact/mortality-curves.html %}
{% include interact/mortality-data.html %}