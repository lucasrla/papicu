---
layout: post
title: A post with bells and whistles
date:	2021-02-01
description: Example post featuring interactive charts, expandable & collapsible content, and more
ogimg: opengraphimage.jpeg
katex: True
chartjs: True
toc: True
code_highlighter: True
---

## Dark mode via Darken

We rely on [Darken](https://github.com/ColinEspinas/darken) for our dark mode:

> A lightweight and cross-browser library that allows you to easely manage your dark mode for your websites and applications.
> 
> Written in plain vanilla javascript.

We use two beautiful SVG images (<img alt="moon" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxMDAwIDEwMDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEwMDAgMTAwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCw1MTIuMDAwMDAwKSBzY2FsZSgwLjEwMDAwMCwtMC4xMDAwMDApIj48cGF0aCBmaWxsPSJkYXJrZ3JheSIgZD0iTTQ2NDAuOCw1MDE4LjRDMjU3NCw0ODE4LjcsODUzLDM0MTQuNSwyODguMywxNDY2LjlDMTUzLjgsMTAwNS45LDk4LjEsNjA2LjMsMTAwLDEwMS4yYzAtNzUxLDE1OS40LTE0MjcuMSw0OTMuNi0yMTAzLjNjNDAzLjQtODE2LjMsOTU4LjUtMTQ1MC4yLDE3MTkuMS0xOTU3LjNjMjQ5LjctMTY3LjEsNzQzLjQtNDE2LjgsMTAyNS43LTUyMC41Yzg5OC45LTMzMC40LDE5MTctNDAxLjUsMjg0NC43LTIwMS43Yzk1Mi43LDIwNy40LDE4MjguNiw2ODMuOCwyNTA2LjYsMTM2My44YzM3NC42LDM3Ni41LDY2OC40LDc4NS42LDkwOC41LDEyNjUuOGMxMDkuNSwyMTksMzAxLjYsNjkxLjUsMzAxLjYsNzQzLjRjMCwzLjgtODIuNi01OS41LTE4NC40LTE0NC4xYy0zOTkuNS0zMzAuNC04MDguNy01NTUuMS0xMjk2LjUtNzEwLjdjLTEyOTguNS00MTEtMjc0Ni44LTc4LjgtMzc0NS42LDg1Ni43Yy0xNTE5LjQsMTQyOS4xLTE1MzYuNiwzODMyLTM0LjYsNTI3OC40Yzk5LjksOTYsMjMyLjQsMjEzLjIsMjk1LjgsMjYxLjJjMzI0LjYsMjQ3LjgsNzUxLDQ3Ni40LDExMTkuOCw2MDEuMmMxMjQuOCw0MC4zLDE4Ni4zLDY5LjIsMTYzLjMsNzQuOUM1ODg3LjQsNTAwNSw1MDgwLjcsNTA2MC43LDQ2NDAuOCw1MDE4LjR6Ii8+PC9nPjwvZz4NCjwvc3ZnPg==" width="14" height="14"> and <img alt="sun" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxMDAwIDEwMDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEwMDAgMTAwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz48cGF0aCBmaWxsPSJkYXJrZ3JheSIgZD0iTTE5Mi4xLDczMC42YzEwLjktMTAuMywyMy44LTE1LjUsMzguNy0xNS41YzE0LjksMCwyNy44LDUuMiwzOC42LDE1LjVjMTAuOSwxMC45LDE2LjMsMjMuOCwxNi4zLDM4LjdzLTUuNCwyNy44LTE2LjMsMzguN2wtMzguNiwzOC43Yy0xMC45LDEwLjktMjMuOCwxNi4zLTM4LjcsMTYuM2MtMTQuOSwwLTI3LjgtNS40LTM4LjctMTYuM2MtMTAuMy0xMC45LTE1LjUtMjMuOC0xNS41LTM4LjdzNS4yLTI3LjgsMTUuNS0zOC43TDE5Mi4xLDczMC42eiBNMTUzLjQsMjMwLjdDMTQzLjEsMjE5LjksMTM4LDIwNywxMzgsMTkyLjFzNS4yLTI3LjgsMTUuNS0zOC43YzEwLjktMTAuOSwyMy44LTE2LjMsMzguNy0xNi4zYzE0LjksMCwyNy44LDUuNCwzOC43LDE2LjNsMzguNiwzOC43YzEwLjksMTAuOSwxNi4zLDIzLjgsMTYuMywzOC43YzAsMTQuOS01LjQsMjcuNS0xNi4zLDM3LjhjLTEwLjksMTAuOS0yMy44LDE2LjMtMzguNiwxNi4zYy0xNC45LDAtMjcuOC01LjQtMzguNy0xNi4zTDE1My40LDIzMC43eiBNODA4LjgsMjY4LjVjLTEwLjksMTAuOS0yMy44LDE2LjMtMzguNywxNi4zYy0xNC45LDAtMjcuOC01LjQtMzguNy0xNi4zYy0xMC45LTEwLjMtMTYuMy0yMi45LTE2LjMtMzcuOGMwLTE0LjksNS40LTI3LjgsMTYuMy0zOC43bDM4LjctMzguN2MxMC4zLTEwLjksMjMtMTYuMywzOC4yLTE2LjNjMTUuMiwwLDI3LjksNS40LDM4LjIsMTYuM2MxMC45LDEwLjksMTYuMywyMy44LDE2LjMsMzguN3MtNS40LDI3LjgtMTYuMywzOC43TDgwOC44LDI2OC41eiBNNTAwLjQsMTczLjJjLTE0LjksMC0yNy44LTUuMy0zOC43LTE1LjljLTEwLjktMTAuNi0xNi4zLTIzLjMtMTYuMy0zOC4ydi01NWMwLTE0LjksNS40LTI3LjYsMTYuMy0zOC4yQzQ3Mi43LDE1LjMsNDg1LjUsMTAsNTAwLjQsMTBjMTQuOSwwLDI3LjYsNS4zLDM4LjIsMTUuOXMxNS45LDIzLjMsMTUuOSwzOC4ydjU1YzAsMTQuOS01LjMsMjcuNi0xNS45LDM4LjJTNTE1LjMsMTczLjIsNTAwLjQsMTczLjJ6IE0xNzMuMiw0OTkuNmMwLDE0LjktNS4zLDI3LjgtMTUuOSwzOC43Yy0xMC42LDEwLjktMjMuMywxNi4zLTM4LjIsMTYuM0g2NWMtMTQuOSwwLTI3LjgtNS40LTM4LjctMTYuM0MxNS40LDUyNy4zLDEwLDUxNC41LDEwLDQ5OS42czUuNC0yNy42LDE2LjMtMzguMmMxMC45LTEwLjYsMjMuOC0xNS45LDM4LjctMTUuOWg1NC4xYzE0LjksMCwyNy42LDUuMywzOC4yLDE1LjlTMTczLjIsNDg0LjcsMTczLjIsNDk5LjZ6IE04NDYuNiw3NjkuM2MxMC45LDEwLjksMTYuMywyMy44LDE2LjMsMzguN3MtNS40LDI3LjgtMTYuMywzOC43Yy0xMC4zLDEwLjktMjMsMTYuMy0zOC4yLDE2LjNjLTE1LjIsMC0yNy45LTUuNC0zOC4yLTE2LjNsLTM4LjctMzguN2MtMTAuOS0xMC45LTE2LjMtMjMuOC0xNi4zLTM4LjdzNS40LTI3LjgsMTYuMy0zOC43YzEwLjktMTAuMywyMy44LTE1LjUsMzguNy0xNS41YzE0LjksMCwyNy44LDUuMiwzOC43LDE1LjVMODQ2LjYsNzY5LjN6IE01MDAuNCwyMjljMzcuMiwwLDcyLjMsNy4yLDEwNS4yLDIxLjVjMzIuOSwxNC4zLDYxLjcsMzMuNiw4Ni4zLDU4YzI0LjYsMjQuMyw0NC4xLDUzLDU4LjQsODUuOWMxNC4zLDMyLjksMjEuNSw2OCwyMS41LDEwNS4yYzAsMzcuOC03LjIsNzMuMS0yMS41LDEwNi4xYy0xNC4zLDMyLjktMzMuOCw2MS42LTU4LjQsODUuOWMtMjQuNiwyNC4zLTUzLjQsNDMuNy04Ni4zLDU4Yy0zMi45LDE0LjMtNjgsMjEuNS0xMDUuMiwyMS41Yy0zNy44LDAtNzMuMS03LjItMTA2LjEtMjEuNWMtMzIuOS0xNC4zLTYxLjYtMzMuNi04NS45LTU4Yy0yNC4zLTI0LjMtNDMuNy01My01OC04NS45Yy0xNC4zLTMyLjktMjEuNS02OC4zLTIxLjUtMTA2LjFjMC0zNy4yLDcuMi03Mi4zLDIxLjUtMTA1LjJjMTQuMy0zMi45LDMzLjYtNjEuNiw1OC04NS45YzI0LjMtMjQuMyw1My00My43LDg1LjktNThDNDI3LjMsMjM2LjIsNDYyLjYsMjI5LDUwMC40LDIyOXogTTUwMC40LDY2Ni4yYzIyLjksMCw0NC41LTQuNCw2NC44LTEzLjNjMjAuMy04LjksMzcuOS0yMC44LDUyLjgtMzUuNmMxNC45LTE0LjksMjYuOC0zMi41LDM1LjYtNTIuOGM4LjktMjAuMywxMy4zLTQxLjksMTMuMy02NC44YzAtMjIuOS00LjQtNDQuNC0xMy4zLTY0LjRjLTguOS0yMC0yMC44LTM3LjYtMzUuNi01Mi44Yy0xNC45LTE1LjItMzIuNS0yNy4xLTUyLjgtMzUuNmMtMjAuMy04LjYtNDEuOS0xMi45LTY0LjgtMTIuOWMtMjIuOSwwLTQ0LjUsNC4zLTY0LjgsMTIuOWMtMjAuMyw4LjYtMzcuOSwyMC41LTUyLjgsMzUuNmMtMTQuOSwxNS4yLTI2LjgsMzIuOC0zNS42LDUyLjhjLTguOSwyMC0xMy4zLDQxLjUtMTMuMyw2NC40YzAsMjIuOSw0LjQsNDQuNSwxMy4zLDY0LjhjOC45LDIwLjMsMjAuOCwzNy45LDM1LjYsNTIuOGMxNC45LDE0LjksMzIuNSwyNi44LDUyLjgsMzUuNkM0NTUuOSw2NjEuOCw0NzcuNSw2NjYuMiw1MDAuNCw2NjYuMkw1MDAuNCw2NjYuMnogTTUwMC40LDgyNi44YzE0LjksMCwyNy42LDUuMywzOC4yLDE1LjlzMTUuOSwyMy4zLDE1LjksMzguMnY1NWMwLDE0LjktNS4zLDI3LjYtMTUuOSwzOC4yYy0xMC42LDEwLjYtMjMuMywxNS45LTM4LjIsMTUuOWMtMTQuOSwwLTI3LjgtNS4zLTM4LjctMTUuOWMtMTAuOS0xMC42LTE2LjMtMjMuMy0xNi4zLTM4LjJ2LTU1YzAtMTQuOSw1LjQtMjcuNiwxNi4zLTM4LjJDNDcyLjcsODMyLjEsNDg1LjUsODI2LjgsNTAwLjQsODI2Ljh6IE05MzUuOSw0NDUuNWMxNC45LDAsMjcuNiw1LjMsMzguMiwxNS45czE1LjksMjMuMywxNS45LDM4LjJzLTUuMywyNy44LTE1LjksMzguN2MtMTAuNiwxMC45LTIzLjMsMTYuMy0zOC4yLDE2LjNoLTU0LjFjLTE0LjksMC0yNy44LTUuNC0zOC43LTE2LjNjLTEwLjktMTAuOS0xNi4zLTIzLjgtMTYuMy0zOC43czUuNC0yNy42LDE2LjMtMzguMnMyMy44LTE1LjksMzguNy0xNS45SDkzNS45TDkzNS45LDQ0NS41eiIvPjwvZz4NCjwvc3ZnPg==" width="16" height="16">) as the dark mode toggle button. You might have noticed them on the top left corner of every page.

## Analytics via Shynet

[Stop using Google Analytics](https://news.ycombinator.com/item?id=26263149), self host [Shynet](https://github.com/milesmcc/shynet) instead.

Here is my own [how-to guide for self-hosting Shynet](https://github.com/lucasrla/shynet-docker-lightsail) using AWS Lightsail and Cloudflare.

Besides Shynet, there are several other privacy-friendly alternatives to Google Analytics. [umami](https://umami.is/), for instance, looks great, and it offers events tracking! (Shynet currently does not.)

Browse a good list of analytics alternatives at [github.com/0xnr/awesome-analytics](https://github.com/0xnr/awesome-analytics#privacy-focused-analytics) and [Privacy Focused Analytics](https://privacyfocusedanalytics.info/).

To enable Shynet, you must uncomment and modify the following line in `_config.yml`:

```conf
shynet: "https://shynet.john_doe_website.com/ingress/uuid-universally-unique-identifier/"
```


## Interactive charts via Chart.js

[Chart.js](https://www.chartjs.org/) provides "Simple HTML5 Charts using the `<canvas>` tag."

> As of Jan 2022, Papicu is still using [Chart.js 2.9.4](https://www.chartjs.org/docs/2.9.4/). At some point in the future we might make the effort to migrate to Chart.js 3+.

Here's an example of a nice interactive chart built with Chart.js.

Suppose you are a male living in the U.S., England & Wales, or Brazil. Given your age, what are your chances of dying this year? The chart below provides you a very good estimate[^1]:

{% include chartjs/warning-narrow-screen.html %}
<div class="charts">
  <canvas id="canvas-recent-mortality-males"></canvas>
</div>

[^1]: 
    In case you are curious, the data behind the chart came from the national bureaus of statistics:
    - [United States Life Tables, 2017](https://stacks.cdc.gov/view/cdc/79487) ([PDF](https://www.cdc.gov/nchs/data/nvsr/nvsr68/nvsr68_07-508.pdf)) by Elizabeth Arias and Jiaquan Xu ([CDC/NCHS Life Tables](https://www.cdc.gov/nchs/products/life_tables.htm)), published in 2019
    - [English Life Tables No. 17: 2010 to 2012](https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/lifeexpectancies/bulletins/englishlifetablesno17/2015-09-01) ([PDF](https://webarchive.nationalarchives.gov.uk/20160106044025/https://ons.gov.uk/ons/guide-method/method-quality/specific/population-and-migration/demography/english-life-tables--no--17---2010-2012.pdf)) by Jakub Bijak, Erengul Dodd, Jonathan J. Forster, and Peter W. F. Smith, published in 2015
    - [Tábua completa de mortalidade para o Brasil – 2018](https://biblioteca.ibge.gov.br/index.php/biblioteca-catalogo?view=detalhes&id=73097) ([PDF](https://biblioteca.ibge.gov.br/visualizacao/periodicos/3097/tcmb_2018.pdf)) by Instituto Brasileiro de Geografia e Estatística ([IBGE](https://www.ibge.gov.br/en/home-eng.html)), published in 2019
    
    In case you are _really_ curious, read [A guided tour to the Gompertz law of mortality](https://howshouldithinkabout.com/aging/gompertz-law-of-mortality-from-scratch/).

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

<details open>
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

<details>
<summary markdown="span">
Here are a few more examples (that start out closed)
</summary>
<div>
Hey!
</div>
</details>

<details>
<summary markdown="span">
Yet another closed one
</summary>
<div>
Howdy!
</div>
</details>

<details>
<summary markdown="span">
Third time's a charm
</summary>
<div>
Isn't it?
</div>
</details>

Their source code is pretty straightforward:

```html
<details>
<summary markdown="span">
Here are a few more examples (that start out as closed)
</summary>
<div>
Hey!
</div>
</details>

<details>
<summary markdown="span">
Yet another closed one
</summary>
<div>
Howdy!
</div>
</details>

<details>
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

## Responsive images

A nice picture of Fortaleza's coast:

<img alt="Fortaleza's coastline" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Fortaleza_-_Cear%C3%A1_-_Brasil.jpg/640px-Fortaleza_-_Cear%C3%A1_-_Brasil.jpg" class="center-block responsive" />

<p class="small center"><em>Photo by [deltafruit](https://www.flickr.com/photos/55953988@N00/), via [Wikipedia entry about Fortaleza](https://en.wikipedia.org/wiki/Fortaleza)</em></p>

Here is the source code behind what you see above:

```html
<img alt="Fortaleza's coastline" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Fortaleza_-_Cear%C3%A1_-_Brasil.jpg/640px-Fortaleza_-_Cear%C3%A1_-_Brasil.jpg" class="center-block responsive" />

<p class="small center"><em>Photo by [deltafruit](https://www.flickr.com/photos/55953988@N00/), via [Wikipedia entry about Fortaleza](https://en.wikipedia.org/wiki/Fortaleza)</em></p>
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

{% include separator.html %}

{% include chartjs/defaults.html %}
{% include interact/mortality-curves.html %}
{% include interact/mortality-data.html %}