---
layout: post-with-nav
title: Images and videos
description: How to easily add captions, lazy loading, aspect-ratio, and lightbox to images and YouTube videos within Papicu
category: Features
# NOTE: jekyll-postfiles do not rewrite the path for images in front matter, if we don't write it out explicitly, the following path you will be considered ./640px-Fortaleza_-_Cear%C3%A1_-_Brasil.jpg
# image: 
#   path: 640px-Fortaleza_-_Cear%C3%A1_-_Brasil.jpg
#   width: 640
#   height: 428
date:	2021-12-01
code_blocks: true
lightbox: true
toc: true
anchorjs: true
# toc_type: fixed
# toc_header_min: 1
# toc_header_max: 2
---

## Enhanced image presentation

A picture of Fortaleza's coast that is center-aligned, has an elegant caption, and fits to a `100%`-width automatically on smaller screens:

{% include figure.html src="640px-Fortaleza_-_Cear%C3%A1_-_Brasil.jpg" alt="Fortaleza’s coastline – Photo by deltafruit" caption="Fortaleza’s coastline – Photo by [deltafruit](https://www.flickr.com/photos/55953988@N00/) via [Wikipedia](https://en.wikipedia.org/wiki/Fortaleza)" w="640" h="428" %}

Here is the source code behind what you see above:

<details class="code-details">
<summary markdown="span" class="button smaller show-hide">
`code` snippet
</summary>
<div markdown="block">
{% raw %}
```liquid
{% include figure.html src="640px-Fortaleza_-_Cear%C3%A1_-_Brasil.jpg" alt="Fortaleza’s coastline – Photo by deltafruit" caption="Fortaleza’s coastline – Photo by [deltafruit](https://www.flickr.com/photos/55953988@N00/) via [Wikipedia](https://en.wikipedia.org/wiki/Fortaleza)" w="640" h="428" %}
```
{% endraw %}
</div>
</details>

For those interested in the nitty gritty details, inside `includes/figure.html` we are:

1. Using the lazy-loading attribute <code>loading="lazy"</code> inside our <code>&lt;img&gt;</code> element {% include sidenote.html label="sn-lazy" content="Chrome supports it [since mid 2019](https://web.dev/browser-level-image-lazy-loading/). Track the rollout of Firefox and Safari with [caniuse.com](https://caniuse.com/loading-lazy-attr)." %}.

2. Not only setting the `width` and `height` attributes, we are also inserting the image's <code>aspect-ratio</code> with inline CSS {% include sidenote.html label="sn-aspect-ratio" content="Soon this `aspect-ratio` workaround won't be needed anymore. Both Firefox 71+ and Chrome 79+ already calculate the `aspect-ratio` automatically since Dec 2019. And [Safari is on their way](https://bugs.webkit.org/show_bug.cgi?id=224197).<br/><br/>A good intro read to this topic is <cite>[Setting Height And Width On Images Is Important Again](https://www.smashingmagazine.com/2020/03/setting-height-width-images-important-again/)</cite>." %}. This is to prevent [layout shifts](https://web.dev/cls/) in smaller screens. On mobile, for example, the image might be scaled down on the fly and that could cause an undesirable layout shift.


## Image lightbox via Tobii

{% comment %}
As of version 2.3.3 Tobii doesn't seem to support pinch zoom on mobile (on iOS at least)
{% endcomment %}

Thanks to [Tobii](https://github.com/midzer/tobii), Papicu has the ability to show images in a lightbox, where they can be bigger and easier to zoom in.

For instance, instead of having just the `640px`-wide image of Fortaleza's coastline (that we've just seen in the previous section), we could give to users interested in a closer looking the chance to view a higher quality, `2560px`-wide image. 

To see it in action, simply tap or click on the image below:

{% include figure.html src="640px-Fortaleza_-_Cear%C3%A1_-_Brasil.jpg" alt="Fortaleza’s coastline – Photo by deltafruit" caption="Fortaleza’s coastline – Photo by [deltafruit](https://www.flickr.com/photos/55953988@N00/) via [Wikipedia](https://en.wikipedia.org/wiki/Fortaleza)" w="640" h="428" lightbox_img="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Fortaleza_-_Cear%C3%A1_-_Brasil.jpg/2560px-Fortaleza_-_Cear%C3%A1_-_Brasil.jpg" %}

To use it, add `lightbox:` `true` in your post's [front matter](https://jekyllrb.com/docs/front-matter/) and customize the following code to your image:

<details class="code-details">
<summary markdown="span" class="button smaller show-hide">
`code` snippet
</summary>
<div markdown="block">
{% raw %}
```liquid
{% include figure.html src="640px-Fortaleza_-_Cear%C3%A1_-_Brasil.jpg" alt="Fortaleza’s coastline – Photo by deltafruit" caption="Fortaleza’s coastline – Photo by [deltafruit](https://www.flickr.com/photos/55953988@N00/) via [Wikipedia](https://en.wikipedia.org/wiki/Fortaleza)" w="640" h="428" lightbox_img="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Fortaleza_-_Cear%C3%A1_-_Brasil.jpg/2560px-Fortaleza_-_Cear%C3%A1_-_Brasil.jpg" %}
```
{% endraw %}
</div>
</details>


## Lazy-loaded, responsive, 16:9 YouTube embeds

Papicu supports embedding YouTube videos with cinematic aspect-ratio (16:9) and lazy-loading. All it takes is one line of `liquid`.

Here's a demo:

{% include youtube.html id="8qNlZGtaclk" %}

The original URL of this drone footage is [youtube.com/watch?v=8qNlZGtaclk](https://www.youtube.com/watch?v=8qNlZGtaclk).

<details class="code-details">
<summary markdown="span" class="button smaller show-hide">
`code` snippet
</summary>
<div markdown="block">
{% raw  %}
```liquid
{% include youtube.html id="8qNlZGtaclk" %}
```
{% endraw  %}
</div>
</details>

Our implementation was based on [this snippet](https://github.com/pibby/jekyll-youtube) by [@pibby](https://pibby.com/), and [this codesandbox](https://codesandbox.io/s/youtube-iframe-lazy-load-qdzu6) by [@haggen](https://codesandbox.io/u/haggen).