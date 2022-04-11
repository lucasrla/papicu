# frozen_string_literal: true

source "https://rubygems.org"

# NOTE: gems under `group :jekyll_plugins do` should be loaded irrespectively of
# `_config.yml`, but for some unknown reason I couldn't make it work!
# https://jekyllrb.com/docs/plugins/installation/
# 
# I am doing the following:
# - alternative / forked versions of gems are specified below
# - all other gems are specified in `.gemspec`
# - jekyll plugins are loaded explicitly in `_config.yml`


# alternative / forked versions of gems

gem "jekyll-feed", github: "drscream/jekyll-feed", branch: "feature/template-feed-xml"
# also works:
# gem "jekyll-feed", github: "drscream/jekyll-feed", ref: "refs/pull/362/head"

# TODO: track if / when this PR will be merged into the main repo
# - https://github.com/jekyll/jekyll-feed/pull/362  

gem "katex", github: "lucasrla/katex-ruby"

gemspec