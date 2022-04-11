---
layout: page
# permalink: /jekyll-theme
# redirect_from: /theme
permalink: /theme
title: Papicu – Jekyll Theme for blogs and personal websites
description: "A minimalist Jekyll theme that features dark mode, sidenotes, KaTeX, Chart.js, Lightbox, TOC, etc"
lightbox: true
toc: true
code_blocks: true
---

Papicu is a minimalist [Jekyll](https://jekyllrb.com/) theme for blogs and personal websites.

// tirar isso aqui de basically a fork

It's been heavily inspired by [Clio](https://github.com/danromero/clio), another Jekyll theme. In fact, Papicu is basically a fork of Clio. I put it together to meet my own personal needs. But, if you like it, Papicu is free to use and modify. The source code is available at [github.com/lucasrla/papicu](https://github.com/lucasrla/papicu).

Try the live demo at [papicu.netlify.app](https://papicu.netlify.app).


## What's inside?

// TODO: MUDAR ESSE SCREENSHOT para algo que nao tenha problema com borda -- SAME AS about.md

{% include figure.html src="/assets/img/safari-shot-homepage-small.png" caption="Home Page (light / dark modes)" w="626" h="219" lightbox_img="https://papicu.netlify.app/assets/img/safari-shot-homepage.png" %}

<!-- <figure class="margin-top-100 margin-bottom-100">
  <a class="lightbox" href="https://papicu.netlify.app/assets/img/safari-shot-homepage.png" data-group="homepage">
    <img alt="Demo - Home Page (light / dark modes)" src="/assets/img/safari-shot-homepage-small.png" class="center-block" loading="lazy" width="626" height="219" style="aspect-ratio: 626/219; border: none;" />
  </a>  
  <figcaption>
    Home Page (light / dark modes)
  </figcaption>
</figure> -->

Main features:

- Dark / light mode
- Privacy-conscious analytics (not Google Analytics)
- Support to [KaTeX](https://katex.org)
- Support to [Chart.js](https://www.chartjs.org) interactive charts
- Support to sidenotes (a.k.a. margin notes)
- Support to table of contents (TOC)
- Support to deep anchor links
- Support to lightbox for image zooming
- Expandable & collapsible content
- Lazy-loaded, responsive YouTube embeds with 16:9 aspect ratio

Papicu also includes:

- A home page that displays a brief introduction, the most recent blog posts in reverse chronological order, and a list of pages
- Sample pages and blog posts
- An `RSS` feed

Performance-wise:

- [Lighthouse](https://developers.google.com/web/tools/lighthouse/) via [web.dev/measure](https://web.dev/measure/): [99 performance (see PageSpeed below), 95 accessibility, 100 best practices, 100 SEO](https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fpapicu.netlify.app%2F)
- PageSpeed: [Papicu theme home page scores 99](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fpapicu.netlify.app), [a heavy-loaded post with third-party scripts gets 93](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fpapicu.netlify.app%2Fexample-post-demo-advanced-features%2F)
- W3C: [valid HTML](https://validator.w3.org/nu/?showsource=yes&showoutline=yes&showimagereport=yes&doc=https%3A%2F%2Fpapicu.netlify.app)

// ATUALIZAR ESSAS COISAS AQUI!

// fazer uma tabelinha: demo home page, this page, a heavy-loaded post with several 3rd party scripts

## Setup

### Option A: use jekyll-remote-theme

First, have a Jekyll website/blog set up on your local machine. 

If you are new to Jekyll, get familiar with it first: [jekyllrb.com/docs](https://jekyllrb.com/docs/).

1. Add the following to your `Gemfile`

    ```ruby
    group :jekyll_plugins do
      gem "jekyll-remote-theme"
    end

    gem "katex", github: "lucasrla/katex-ruby"
    gem "kramdown-math-katex"
    ```

2. Install the gems by running on terminal

    ```sh
    bundle install
    ```

3. Add the following to your `_config.yml`

    ```yml
    markdown: kramdown
    kramdown:
      parse_block_html: true
      math_engine: katex

    remote_theme: lucasrla/papicu
    ```

4. By default `remote_theme: lucasrla/papicu` points to `HEAD`, the latest commit of Papicu. Optionally, you can refer `remote_theme` to a specific commit, tag or branch:

    ```yml
    remote_theme: lucasrla/papicu@1316b145a02c610347b9172da3d2feba32aaf595 # pointing to commit: https://github.com/lucasrla/papicu/commit/1316b145a02c610347b9172da3d2feba32aaf595
    ```

    ```yml
    remote_theme: lucasrla/papicu@v1.0.0 # pointing to (a theoretical) release tag v1.0.0 (please note that papicu has no releases yet)
    ```

5. Now, run jekyll on terminal

    ```sh
    bundle exec jekyll serve
    ```

6. Visit your website at [http://127.0.0.1:4000](http://127.0.0.1:4000)

### Option B: clone or fork this repository

If you are reasonably well-versed in Jekyll, clone or fork [this repository](https://github.com/lucasrla/papicu) and have fun.


## Deployment

### Issues with GitHub Pages

<mark>Unfortunately, Papicu is not compatible with the GitHub Pages standard workflow</mark>.

Why? Because, as of early March 2022, GitHub Pages ([gem version 225](https://rubygems.org/gems/github-pages/versions/225)) still uses Jekyll `=3.9.0`. Papicu needs Jekyll `~>4.1` to take advantage of `slugified_categories` and its [good-looking permalinks](https://jekyllrb.com/docs/permalinks/#placeholders)).

For those who are really interested, it is possible circumvent this limitation and run Papicu on GitHub Pages by using GitHub Actions. Read [Jekyll's official guide on GitHub Actions](https://jekyllrb.com/docs/continuous-integration/github-actions/) for the details.

### Netlify

Alternatively, sign up for an account with [Netlify](https://www.netlify.com/) and deploy your website with them for free. We did that for our demo page: [https://papicu.netlify.app](https://papicu.netlify.app).

// ADD BOTAOZINHO: https://app.netlify.com/start/deploy?repository=https://github.com/lucasrla/papicu
https://camo.githubusercontent.com/417d890ba67c98ad5856b715343a61cdbf07d72b9bd5b79dd45d43de634c29ea/68747470733a2f2f7777772e6e65746c6966792e636f6d2f696d672f6465706c6f792f627574746f6e2e737667

If you need help, read _[A Step-by-Step Guide: Jekyll 4.0 on Netlify](https://www.netlify.com/blog/2020/04/02/a-step-by-step-guide-jekyll-4.0-on-netlify/)_.

### More Alternatives

- https://vercel.com/guides/deploying-jekyll-with-vercel
// ADD BOTAOZINHO: https://vercel.com/import/project?template=https://github.com/lucasrla/papicu
https://camo.githubusercontent.com/5e471e99e8e022cf454693e38ec843036ec6301e27ee1e1fa10325b1cb720584/68747470733a2f2f76657263656c2e636f6d2f627574746f6e

- https://docs.microsoft.com/en-us/azure/static-web-apps/publish-jekyll

- https://surge.sh/help/deploying-a-jekyll-project



## Usage

### Running Jekyll on your local machine

First, you must install `ruby` and `bundler` locally. If you are on macOS, read the instructions at [lucasrla.github.io/macos-setup/ruby](https://lucasrla.github.io/macos-setup/ruby).

Next, make sure `bundler` is configured with isolated environments by project:

```sh
bundle config set bin bin/
bundle config set path vendor.noindex/
```

Now, install Jekyll:

```sh
bundle install

# and then check if it has been installed properly
bundle info jekyll
```

Finally, run:

```sh
# We are passing `local` as `jekyll.environment` and checking for that inside `default.html` 
# to avoid sending analytics events when running locally.
# For more info: https://jekyllrb.com/docs/configuration/environments/

JEKYLL_ENV=local bundle exec jekyll serve
```


### Post with examples

Each example post inside `_posts/` demonstrates a few of Papicu features.

Have a look, for example, at the post titled _[Post with feature demos and instructions](https://papicu.netlify.app/example-post-demo-advanced-features/)_, and make sure you review its source code `_posts/2021-02-01-example-post-demo-advanced-features.md` as well.


## Metadata

Papicu takes advantage of [jekyll-seo-tag](https://github.com/jekyll/jekyll-seo-tag/) to easily generate relevant metadata tags for search engines and social media.

[Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards), [Open Graph](https://ogp.me/) and [JSON-LD](https://en.wikipedia.org/wiki/JSON-LD) ([Google's guide](https://developers.google.com/search/docs/guides/intro-structured-data)) are supported out-of-the-box. 

Images can be referenced to post or pages either via `_config.yml` defaults or explicitly on front matter under the `image` key. Images referenced explicitly on front matter take precedence over `_config,yml_` defaults.

By default, we are referencing a square image, `papicu-blue-square-512.png`, to all our demo posts and pages:

```yml
defaults:
  - scope:
      path: ""
      type: "pages"
    values:
      image:
        path: "/assets/img/papicu-blue-square-512.png"
  - scope:
      path: ""
      type: "posts"
    values:
      image:
        path: "/assets/img/papicu-blue-square-512.png"
```

### Further info about Twitter Cards

There are two types of Twitter Cards that are relevant to us, `summary` and `summary_large_image`.

Here are Twitter's recommendations for images in `summary_large_image`:

> Images for this Card support an aspect ratio of `2:1` with minimum dimensions of `300x157` or maximum of `4096x4096` pixels. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported. ([#](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image))

The only difference to `summary` image guidelines is:

> Images for this Card support an aspect ratio of `1:1` with minimum dimensions of `144x144` or maximum of `4096x4096` pixels. ([#](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary))

By default, if a post or page a reference to an image, even if it is a square image, `jekyll-seo-tag` sets the Twitter Card value to `summary_large_image`.

Also, be careful with Twitter Cards unexpected behavior with images of Jekyll pages (_vs_ posts). Read our post, _[Working around issues with Twitter Cards]({% link _posts/2022-03-14-issues-with-twitter-cards/2022-03-14-issues-with-twitter-cards.md %})_, for more information.


### Favicon generator

Try [realfavicongenerator.net](https://realfavicongenerator.net).


## License

Papicu itself is distributed under the terms of the [MIT License](https://en.wikipedia.org/wiki/MIT_License). Plugins and third-party code have their own licenses. Check them out.


## Credits and Acknowledgments

- Code, examples, and inspiration from Jekyll themes [Clio](https://github.com/danromero/clio) and [Poole](https://github.com/poole/poole/)
- Dark mode via [Darken](https://github.com/ColinEspinas/darken)
- Privacy-conscious analytics via [Shynet](https://github.com/milesmcc/shynet/)
- Table of Contents via [jekyll-toc](https://github.com/allejo/jekyll-toc) and [Gumshoe](https://github.com/cferdinandi/gumshoe/)
- [KaTeX](https://katex.org) support via [kramdown](https://github.com/gettalong/kramdown), [math-katex](https://github.com/kramdown/math-katex), and [katex-ruby](https://github.com/glebm/katex-ruby/)
- Interactive charts via [Chart.js](https://www.chartjs.org)
- Sidenotes via [@kslstn/sidenotes](https://github.com/kslstn/sidenotes) ([blog post](https://www.kooslooijesteijn.net/blog/sidenotes-without-js))
- Redirects via [jekyll-redirect-from](https://github.com/jekyll/jekyll-redirect-from)
- YouTube embeds via [jekyll-youtube](https://github.com/pibby/jekyll-youtube)
- YouTube lazy loading via [dev.to/haggen](https://dev.to/haggen/lazy-load-embedded-youtube-videos-520g)
- Compressed HTML via [jekyll-minifier](https://github.com/Mendeo/jekyll-minifier)
- Anchor links via [AnchorJS](https://www.bryanbraun.com/anchorjs/)
- Image lightbox via [Tobii](https://github.com/midzer/tobii)
- Searchable, sortable, filterable tables and lists via [List.js](https://listjs.com/)
- [And other foundational Jekyll plugins](https://github.com/lucasrla/papicu/blob/main/Gemfile)


## What does papicu mean?

Papicu means "narrow, elongated pond" in an indigenous language from Brazil. It is also the name of a [neighborhood in Fortaleza](https://goo.gl/maps/qJeHn1RXG8vH7k3f9), [a city of northeastern Brazil](https://en.wikipedia.org/wiki/Fortaleza).