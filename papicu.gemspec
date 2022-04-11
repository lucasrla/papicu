# frozen_string_literal: true

# NOTE: we are not publishing Papicu as a gem-based theme that will be
# uploaded to RubyGems.org; this .gemspec is mostly for private, ad-hoc usage

# ref: https://jekyllrb.com/docs/themes/#creating-a-gem-based-theme


# e.g. see:
# 
# https://github.com/benbalter/jekyll-remote-theme/issues/96
# > The more out of the box setup, would be to package your theme as a Gem, and in your Gemfile, point bundler to a local path. I actually do this frequently for local theme development of my remote theme.

Gem::Specification.new do |spec|
  spec.name     = "papicu"
  spec.version  = "0.1.0"
  spec.authors  = ["lucasrla"]
  spec.email    = ["lucasrla@users.noreply.github.com"]

  spec.summary  = "Papicu is a minimalist Jekyll theme for blogs and personal sites"
  spec.homepage = "https://github.com/lucasrla/papicu"
  spec.license  = "MIT"

  spec.metadata = {
    "bug_tracker_uri"   => "https://github.com/lucasrla/papicu/issues",
    "documentation_uri" => "https://github.com/lucasrla/papicu/#readme",
    "homepage_uri"      => "https://papicu.netlify.app",
    "source_code_uri"   => "https://github.com/lucasrla/papicu",
    "plugin_type"       => "theme"
  }

  # TIP: `git ls-files -z --others --exclude-standard`
  # to add files that are yet to be commited
  
  # spec.files = `git ls-files -z`.split("\x0").select do |f|
  spec.files = (`git ls-files -z` + `git ls-files -z --others --exclude-standard`).split("\x0").select do |f|
    f.match(%r!^((_(includes|layouts|sass|plugins|pages)|assets)\/|_config|README|LICENSE|index|gulpfile\.js|package\.json)!i)
  end

  # ORIGINAL:
  # 
  # spec.files = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }  

  spec.platform = Gem::Platform::RUBY

  ########################################### GEMS

  spec.add_runtime_dependency "jekyll", "~> 4.1"

  # https://jekyllrb.com/docs/themes/#theme-gem-dependencies350
  # > Jekyll will automatically require all whitelisted runtime_dependencies of your theme-gem even if they’re not explicitly included under the plugins array in the site’s config file. (Note: whitelisting is only required when building or serving with the --safe option.)

  # NOTE: we using the fork and branch specified in Gemfile
  spec.add_runtime_dependency "jekyll-feed"
  
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.8.0"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.4.0"
  spec.add_runtime_dependency "jekyll-optional-front-matter", "~> 0.3.2"
  spec.add_runtime_dependency "jekyll-redirect-from", "~> 0.16.0"
  spec.add_runtime_dependency "jekyll-archives", "~> 2.2.1"
  spec.add_runtime_dependency "jekyll-last-modified-at", "~> 1.3.0"
  spec.add_runtime_dependency "jekyll-postfiles", "~> 3.1.0"
  spec.add_runtime_dependency "jekyll-remote-theme", "~> 0.4.3"

  # NOTE: using the fork specified in Gemfile
  spec.add_runtime_dependency "katex"

  spec.add_runtime_dependency "kramdown-math-katex", "~> 1.0.1"

  ## SASS Embedded (uses dart-sass)
  #
  # By default, Jekyll Sass Converter uses sassc for Sass implementation
  # But sassc is based on LibSass, and LibSass has been deprecated
  #
  # Let's use the sass-embedded, which is a host for the Sass embedded protocol
  #
  # https://github.com/jekyll/jekyll-sass-converter#sass-embedded
  spec.add_runtime_dependency "sass-embedded", "~> 1.4.0"

  ## Latent semantic index (for "related posts")
  #
  # An explainer: https://christopherstoll.org/2018/04/22/finding-related-jekyll-posts-lsi-github-pages.html
  #
  # For Jekyll's related_posts (which needs `--lsi` flag / `lsi: true` config)
  # - https://github.com/jekyll/classifier-reborn/
  spec.add_runtime_dependency "classifier-reborn", "~> 2.2.0"

  # For generating Jekyll's related_posts faster:
  # - https://www.frankindev.com/2019/11/21/enable-related-posts-with-lsi/
  #
  # You must also install `gsl` on your local machine
  # Do it with `brew install gsl` on macOS
  # or `sudo apt-get -y install libgsl-dev` on Linux
  #
  # gsl can be installed with or without narray support. Please install
  # narray before and reinstall gsl if it is missing.
  #
  # gsl is also now compatible with NMatrix. Please install nmatrix before
  # installing gsl.
  #
  # Note: Netlify already has `gsl` on their building image!
  spec.add_runtime_dependency "gsl", "~> 2.1.0"

  # inspired by https://github.com/jekyll/minima/blob/master/minima.gemspec
  spec.add_development_dependency "bundler"

  # inspired by https://github.com/pages-themes/hacker/blob/master/jekyll-theme-hacker.gemspec
  spec.add_development_dependency "html-proofer", "~> 3.0"
  spec.add_development_dependency "w3c_validators", "~> 1.3"
end
