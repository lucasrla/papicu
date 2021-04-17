# Papicu

[Papicu](https://lucasamaro.com/papicu) is a minimalist [Jekyll](https://jekyllrb.com/) template and theme. 

It's been heavily inspired by [Clio](https://github.com/danromero/clio), another Jekyll theme. In fact, Papicu is basically a fork of Clio. I did make it to meet my own needs but, if you like it, Papicu is free to use and modify.

Try the live demo at [papicu.netlify.app](https://papicu.netlify.app).


# What's inside?

<img width="400" alt="home-light" src="https://user-images.githubusercontent.com/1920195/115069597-2bc75c00-9eca-11eb-87f2-f1c590d152e8.png" /> <img width="400" alt="home-dark" src="https://user-images.githubusercontent.com/1920195/115069542-15210500-9eca-11eb-8433-93c9dfd39de1.png" />

Main features:

- Dark / light mode
- Privacy-conscious analytics (not Google Analytics)
- Support to [KaTeX](https://katex.org)
- Support to [Chart.js](https://www.chartjs.org) interactive charts
- Support to table of contents (TOC)
- Expandable & collapsible content
- Responsive YouTube embeds with 16:9 aspect ratio

Papicu also includes:

- A homepage that displays a brief introduction and the most recent blog posts in reverse chronological order
- An about page located at `/about/`
- Three sample blog posts
- An `RSS` feed
- Support to [Open Graph](https://ogp.me/) images as [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started)


# Setup

## Option 1: use jekyll-remote-theme

If you are new to Jekyll, get familiar with it first: [jekyllrb.com/docs](https://jekyllrb.com/docs/).

```sh
# 0. Have a Jekyll website set up on your local machine

# 1. Add the following to your `Gemfile`
gem "jekyll-remote-theme"

# 2. Install the plugin by running
bundle install

# 3. Add the following to your `_config.yml` to enable the plugin
plugins:
  - jekyll-remote-theme

# 4. Add the following to your `_config.yml` to choose Papicu as your theme
remote_theme: lucasrla/papicu

# 5. Run jekyll
bundle exec jekyll serve

# 6. Visit your website at http://127.0.0.1:4000
```

## Option 2: clone or fork this repository

If you are reasonably well-versed in Jekyll, clone or fork this repository and have fun. 


## ⚠️ GitHub Pages **not** supported out-of-the-box

Unfortunately, Papicu **is not compatible** with GitHub Pages standard workflow.

Why? Because, as of April 2021, GitHub Pages ([gem version 214](https://rubygems.org/gems/github-pages)) still uses Jekyll `=3.9`. Papicu needs Jekyll `>=4.1` for `slugified_categories` (i.e., [well-formed permalinks](https://jekyllrb.com/docs/permalinks/#placeholders)).

For those who are really interested, it is possible circumvent this limitation and run Papicu on GitHub Pages by using GitHub Actions. Read [Jekyll's official guide on GitHub Actions](https://jekyllrb.com/docs/continuous-integration/github-actions/) for the details.


# Usage

## Examples

Each example post inside `_posts/` demonstrates a few of Papicu features. 

Have a look, for example, at the post titled [A post with bells and whistles](https://papicu.netlify.app/post-with-bells-and-whistles/), and make sure you review its source code `_posts/2021-02-01-post-with-bells-and-whistles.md` as well.


## Favicon generator

Try [realfavicongenerator.net](https://realfavicongenerator.net).


## Open Graph and Twitter Cards

1. Put the image file inside `/assets/img/og/`
2. Add the image filename to `ogimg:` in the post or page's [front matter](https://jekyllrb.com/docs/front-matter/)

For an actual example, see `_posts/2021-01-01-textual-post.md`.


## Tips for a Jekyll setup on your local machine

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


# License

Papicu itself is distributed under the terms of the [MIT License](https://en.wikipedia.org/wiki/MIT_License). Plugins and third-party code have their own licenses. Check them out.


# Credits and Acknowledgments

- Code, examples, and inspiration from Jekyll themes [Clio](https://github.com/danromero/clio) and [Poole](https://github.com/poole/poole/)
- Dark mode via [Darken](https://github.com/ColinEspinas/darken)
- Privacy-conscious analytics via [Shynet](https://github.com/milesmcc/shynet/)
- Table of Contents via [jekyll-toc](https://github.com/allejo/jekyll-toc) and [Gumshoe](https://github.com/cferdinandi/gumshoe/)
- [KaTeX](https://katex.org) support via [kramdown](https://github.com/gettalong/kramdown), [math-katex](https://github.com/kramdown/math-katex), and [katex-ruby](https://github.com/glebm/katex-ruby/)
- Interactive charts via [Chart.js](https://www.chartjs.org)
- Redirects via [jekyll-redirect-from](https://github.com/jekyll/jekyll-redirect-from)
- YouTube embeds via [jekyll-youtube](https://github.com/pibby/jekyll-youtube)


# What does papicu mean?

Papicu means "narrow, elongated pond" in an indigenous language from Brazil. It is also the name of a [neighborhood in Fortaleza](https://goo.gl/maps/qJeHn1RXG8vH7k3f9), [a city of northeastern Brazil](https://en.wikipedia.org/wiki/Fortaleza).
