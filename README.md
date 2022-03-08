---
layout: page
permalink: /theme
title: Papicu
description: "A minimalist Jekyll theme with text-centric layout. Features dark mode, KaTeX, Sidenotes, Chart.js, Lightbox, TOC, etc."
# image: https://papicu.netlify.app/assets/img/screenshot-homepage-light.png og:type=website and JSON-LD's @type=WebPage, https://cards-dev.twitter.com/validator does not load this type of image
# EITHER change the type of this page to og|Article JSON|BlogPosting (an easy way is to change the layout from `page` to `post`)
# OR put a square image here (see below)
image: https://papicu.netlify.app/assets/icons/original-image.png
lightbox: true
toc: true
code_highlighter: true
---

<h1 class="hidden">Papicu</h1>

Papicu is a minimalist [Jekyll](https://jekyllrb.com/) theme.

It's been heavily inspired by [Clio](https://github.com/danromero/clio), another Jekyll theme. In fact, Papicu is basically a fork of Clio. I put it together to meet my own needs. But, if you like it, Papicu is free to use and modify. The source code is available at [github.com/lucasrla/papicu](https://github.com/lucasrla/papicu).

Try the live demo at [papicu.netlify.app](https://papicu.netlify.app).


## What's inside?

<a class="lightbox" href="https://user-images.githubusercontent.com/1920195/115069597-2bc75c00-9eca-11eb-87f2-f1c590d152e8.png" data-group="homepage">
  <img alt="Home Page (light mode)" src="https://user-images.githubusercontent.com/1920195/115069597-2bc75c00-9eca-11eb-87f2-f1c590d152e8.png" class="center-block responsive" />
</a>

<a class="lightbox" href="https://user-images.githubusercontent.com/1920195/115069542-15210500-9eca-11eb-8433-93c9dfd39de1.png" data-group="homepage">
  <img alt="Home Page (dark mode)" src="https://user-images.githubusercontent.com/1920195/115069542-15210500-9eca-11eb-8433-93c9dfd39de1.png" class="center-block responsive" />
</a>

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

- A homepage that displays a brief introduction and the most recent blog posts in reverse chronological order
- An about page located at `/about/`
- A few sample blog posts
- An `RSS` feed

Performance-wise:

- [Lighthouse](https://developers.google.com/web/tools/lighthouse/) via [web.dev/measure](https://web.dev/measure/): [99 performance (see PageSpeed below), 95 accessibility, 100 best practices, 100 SEO](https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fpapicu.netlify.app%2F)
- PageSpeed: [Papicu theme home page scores 99](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fpapicu.netlify.app), [a heavy-loaded post with third-party scripts gets 93](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fpapicu.netlify.app%2Fpost-with-bells-and-whistles%2F)
- W3C: [valid HTML](https://validator.w3.org/nu/?showsource=yes&showoutline=yes&showimagereport=yes&doc=https%3A%2F%2Fpapicu.netlify.app)


## Setup

### Option A: use jekyll-remote-theme

First, have a Jekyll website/blog set up on your local machine. 

If you are new to Jekyll, get familiar with it first: [jekyllrb.com/docs](https://jekyllrb.com/docs/).

1. Add the following to your `Gemfile`

    ```ruby
    gem "jekyll-remote-theme"
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

    plugins:
      - jekyll-remote-theme

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

If you are reasonably well-versed in Jekyll, clone or fork this repository and have fun. 


## Deployment

### Issues with GitHub Pages

<mark>Unfortunately, Papicu is not compatible with the GitHub Pages standard workflow</mark>.

Why? Because, as of early March 2022, GitHub Pages ([gem version 225](https://rubygems.org/gems/github-pages/versions/225)) still uses Jekyll `=3.9.0`. Papicu needs Jekyll `~>4.1` to take advantage of `slugified_categories` (which we rely on for [well-formed permalinks](https://jekyllrb.com/docs/permalinks/#placeholders)).

For those who are really interested, it is possible circumvent this limitation and run Papicu on GitHub Pages by using GitHub Actions. Read [Jekyll's official guide on GitHub Actions](https://jekyllrb.com/docs/continuous-integration/github-actions/) for the details.

### Netlify

Alternatively, sign up for an account with [Netlify](https://www.netlify.com/) and deploy your website with them for free. We did that for our demo page: [https://papicu.netlify.app](https://papicu.netlify.app).

If you need help, read [A Step-by-Step Guide: Jekyll 4.0 on Netlify](https://www.netlify.com/blog/2020/04/02/a-step-by-step-guide-jekyll-4.0-on-netlify/).


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

Have a look, for example, at the post titled [Post containing demos of several features](https://papicu.netlify.app/post-with-bells-and-whistles/), and make sure you review its source code `_posts/2021-02-01-post-with-bells-and-whistles.md` as well.


### Favicon generator

Try [realfavicongenerator.net](https://realfavicongenerator.net).


### Metadata – JSON-LD, Open Graph, and Twitter Cards

Papicu takes advantage of [jekyll-seo-tag](https://github.com/jekyll/jekyll-seo-tag/) to easily generate relevant metadata tags for search engines and social media.

[Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards), [Open Graph](https://ogp.me/) and [JSON-LD](https://en.wikipedia.org/wiki/JSON-LD) ([Google's guide](https://developers.google.com/search/docs/guides/intro-structured-data)) are supported out-of-the-box. 

Please note that jekyll-seo-tag, as of [v2.8.0](https://github.com/jekyll/jekyll-seo-tag/releases/tag/v2.8.0), sets the Twitter Cards to `summary_large_image` only if there is an actual image referenced (say, at your post's front-matter). If there is none, it will default to `summary`. See, for instance, their issue [#287](https://github.com/jekyll/jekyll-seo-tag/issues/287).


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
