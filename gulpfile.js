// thanks to
// - https://stackoverflow.com/questions/60123313/run-a-gulp-plugin-that-requires-the-current-file-path-and-name
// - https://gist.github.com/hildissent/f3e32fc30dcf114386214da4745535de
// - https://stackoverflow.com/questions/23820703/how-to-inject-content-of-css-file-into-html-in-gulp
// - https://stackoverflow.com/questions/35042545/deleting-files-in-a-gulp-task
// - https://stackoverflow.com/questions/6851921/negative-lookahead-regular-expression

// TODO: add image optimization, resizing, etc
// - https://github.com/khalyomede/gulp-sharp-responsive
// - https://github.com/mahnunchik/gulp-responsive
// - https://github.com/sindresorhus/gulp-imagemin
// - https://github.com/ben-eb/gulp-svgmin

const fs = require('fs');
const path = require('path');

const gulp = require('gulp');

const debug = require('gulp-debug');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const filter = require('gulp-filter');
const replace = require('gulp-replace');
const rev = require('gulp-rev');

const through = require('through2');

// css
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const url = require("postcss-url");
const purgecss = require('gulp-purgecss');
const critical = require('critical');
const autoprefixer = require("autoprefixer");

// html
const posthtml = require('gulp-posthtml');
const minifyClassnames = require('posthtml-minify-classnames');
const htmlmin = require("gulp-htmlmin");

const fileAssets = require('gulp-file-assets');

// js
const uglify = require("gulp-uglify");





// https://regex101.com/r/TNwuUC/3
// substitute papicu link tag (not preloaded, render blocking) 
// with our own purged, bundle, inline css
const substituteWithInlineCss = /<link rel="stylesheet" href="[\S]+(?:papicu.*\.css)">/g;

// https://regex101.com/r/jGzr0i/1
// keep tobii (preloaded) as is
const cssToKeepAsIs = /<link rel="preload" href="([\S]+tobii[\S]+\.css)" as="style" onload="this.onload=null;this.rel='stylesheet'">[\s]*<noscript>[\s]*<link rel="stylesheet" href="(\1)">[\s]*<\/noscript>/gm;

// https://regex101.com/r/FNEFkG/1
// remove what is not papicu (will be inlined) nor tobii (preloaded)
// because these link tags have been already purged, bundled and inlined
const cssToBeRemoved = /<link rel="preload" href="((?![\S]+tobii[\S]+\.css)[\S]+\.css)" as="style" onload="this.onload=null;this.rel='stylesheet'">[\s]*<noscript>[\s]*<link rel="stylesheet" href="(\1)">[\s]*<\/noscript>|<link rel="stylesheet" href="(?![\S]+papicu[\S]+\.css|[\S]+tobii[\S]+\.css)[\S]+\.css">/gm;


const optimizeCssForEachHTMLFile = () =>
  gulp.src('_site/**/*.html', { base: '_site/' })
    .pipe(debug())
    .pipe(through.obj(function(file, encoding, callback) {
      try {
        const filePath = file.path;
        const fileBasename = path.basename(file.path, path.extname(file.path));
        const fileRelDirname = path.relative('_site', path.dirname(file.path));
        
        const fileCssPath = path.join("_gulp/css/" + fileRelDirname, fileBasename + ".css");

        gulp.src(filePath, { base: '_site/' })
          .pipe(fileAssets({
            exts: ['css'],
            includeSrc: false,
            // for now, we won't purge, inline nor optimize tobii CSS
            // we will keep it apart (simply preloaded)
            ignores: [/tobii/] 
          }))
          .pipe(concat('temp.bundle.min.css', {newLine: ''}))
          // rebase KaTeX fonts URLs from fonts/ to /assets/vendors/fonts/
          // TODO: use CDN urls instead?
          .pipe(replace(/url\(fonts/gm, function(s) {
            return 'url(/assets/vendors/fonts';
          }))
          .pipe(purgecss({
            // Content that should be analyzed by PurgeCSS
            content: [filePath],
            // Remove any unused @font-face rules
            fontFace: true,              
            // Remove unused CSS variables
            variables: true,
            // Selectors that are safe to leave in the final CSS
            safelist: {
              // An array that can take a string or a regex
              standard: [],
              // Safelist selectors and their children based on a regex
              deep: [/(tobii[\s]*|active)/],
            },
            // Selectors to be removed even if seen as used by PurgeCSS
            blocklist: []
          }))
          .pipe(postcss([
            // TODO: migrate from `require` to functions
            // `package.json`: "browserslist": ["last 1 version or > 0.5%"]
            require('autoprefixer'),
            require('cssnano'),
            // keep CSS vars hardcoded in `_chart-customizations.js` and `script-details.html`
            require('postcss-variable-compress')(['--muted', '--txt', '--ui-border', '--display-pseudo-el', '--bg'])
          ]))
          .pipe(rename({
            dirname: fileRelDirname,
            basename: fileBasename
          }))
          .pipe(gulp.dest('_gulp/css'))
          .pipe(gulp.src(filePath, { base: '_site/' }))
          .pipe(replace(substituteWithInlineCss, function(s) {
            const styleContents = fs.readFileSync(fileCssPath, 'utf8');
            return '<style>' + styleContents + '</style>';
          }))
          .pipe(replace(cssToBeRemoved, function(s) {
            return '';
          }))
          .pipe(posthtml([
            minifyClassnames({
              // do not minify any id
              // we need our ids intact for table of contents
              genNameId: false,
              // do not minify the following classes:
              // .charts
              // .small, inline-icon
              // .katex-display, katex-html, base
              // .lightbox, tobii[\s]*
              // .hidden, active
              // .list, search, sort, title, type, category, tags
              // .signed-text, signed-heading, content-details, section-details
              // .link-color, button, small
              filter: /^\.(?:charts|katex-display|katex-html|base|small|inline-icon|muted|smaller|lightbox|tobii[\s]*|hidden|active|list|search|sort|title|type|category|tags|signed-text|content-details|section-details|link-color|button)/
            })
          ]))
          // include html files, filter out css ones
          .pipe(filter(['**/*.html','!**/*.css']))
          .pipe(htmlmin({
            // https://github.com/kangax/html-minifier#options-quick-reference
            collapseWhitespace: true,
            removeComments: true,
            minifyURLs: true,
            processScripts: ["application/ld+json"],
            sortAttributes: true,
            sortClassName: true
          }))
          .pipe(gulp.dest('_gulp/html'))
          .pipe(gulp.dest('_site'));
          
          // TODO: migrate to https://github.com/csstools/postcss-normalize

          // TODO: formalize what browsers are being supported via browserlist
          // https://browserl.ist/
          // https://github.com/browserslist/browserslist
          // https://github.com/ismay/stylelint-no-unsupported-browser-features

          // test the list of browsers set in our `package.json`:
          // `npx browserslist 'last 1 version or > 0.5%'`

          // https://github.com/browserslist/browserslist#browsers-data-updating
          // run `npx browserslist@latest --update-db` regularly
          // it updates `caniuse-lite` version in our npm/yarn lock files

        callback();

      } catch (e) {
        console.log("ERROR:" + e.message);
        callback();
      }
    }));

exports.optimize_css_each_html_file = gulp.series(optimizeCssForEachHTMLFile);



// https://stackoverflow.com/questions/36897877/gulp-error-the-following-tasks-did-not-complete-did-you-forget-to-signal-async
const bundleAndMinifyJs = async () => {
  const destDir = 'assets/js';

  gulp.src([
    'assets/vendors/anchor-js@4.3.1.min.js',
    'assets/js/_partials/_anchors.js'
  ])
    .pipe(debug())
    .pipe(concat('anchors.bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(destDir));

  gulp.src('assets/js/_partials/_chartjs.js')
    .pipe(debug())
    .pipe(uglify())
    .pipe(rename('chartjs.setup.min.js'))
    .pipe(gulp.dest(destDir));
  
  gulp.src('assets/js/_partials/_katex.js')
    .pipe(debug())
    .pipe(uglify())
    .pipe(rename('katex.tweaks.min.js'))
    .pipe(gulp.dest(destDir));

  gulp.src([
    'assets/vendors/tobii@2.3.3.min.js',
    'assets/js/_partials/_tobii.js'
  ])
    .pipe(debug())
    .pipe(concat('tobii.bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(destDir));

  gulp.src([
    'assets/vendors/gumshoejs@5.1.2.js',
    'assets/js/_partials/_toc.js'
  ])
    .pipe(debug())
    .pipe(concat('toc.bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(destDir));

    gulp.src('assets/js/_partials/_papaparse.js')
    .pipe(debug())
    .pipe(uglify())
    .pipe(rename('papaparse.setup.min.js'))
    .pipe(gulp.dest(destDir));

  const destDirVendors = 'assets/vendors';

  gulp.src([
    'assets/vendors/chartjs-plugin-colorschemes@0.4.0-tableau.ColorBlind10.js',
    'assets/vendors/chartjs-plugin-crosshair@1.1.6.min.js'
  ])
    .pipe(debug())
    .pipe(concat('chartjs-plugins.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(destDirVendors));


  gulp.src('_includes/_copyright-year.js')
    .pipe(debug())
    .pipe(concat('copyright-year.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(function(file) {
      return path.dirname(file.path);
    }));

    gulp.src('_includes/_enhanced-details.js')
    .pipe(debug())
    .pipe(concat('enhanced-details.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(function(file) {
      return path.dirname(file.path);
    }));

  
  gulp.src('_posts/2022-02-01-searchable-sortable-filterable-elements/entries-table.js')
    .pipe(debug())
    .pipe(concat('entries-table.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(function(file) {
      return path.dirname(file.path);
    }));

  gulp.src('_posts/2022-03-01-interactive-charts/mortality-charts.js')
    .pipe(debug())
    .pipe(concat('mortality-charts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(function(file) {
      return path.dirname(file.path);
    }));
}

exports.bundle_and_minify_js = gulp.series(bundleAndMinifyJs);






const purgeSingleCssAcrossManyHtml = () =>
  gulp.src('_site/assets/css/papicu.min.css')
    .pipe(debug())
    .pipe(rename({
      suffix: '.purged'
    }))
    .pipe(purgecss({
      // Content that should be analyzed by PurgeCSS
      content: ['_site/**/*.html'],
      // Remove any unused @font-face rules
      fontFace: true,
      // Remove unused CSS variables
      variables: true,
      // Selectors that are safe to leave in the final CSS
      safelist: {
        // An array that can take a string or a regex
        standard: [],
        // Safelist selectors and their children based on a regular expression
        deep: [],
      },
      // Selectors to be removed even when they are seen as used by PurgeCSS
      blocklist: []
    }))
    // .pipe(rev())
    .pipe(gulp.dest('assets/css'));

exports.purge_css_across_site = gulp.series(purgeSingleCssAcrossManyHtml);



// https://github.com/addyosmani/critical#options

const generateCriticalCss = () =>
  // via https://stackoverflow.com/a/44337370
  gulp.src('_site/**/*.html', { base: "_site/" }) 
    .pipe(debug())
    .pipe(critical.stream({
      // Inline the generated critical-path CSS
      // true generates HTML, false generates CSS
      inline: false,
      // Extract inlined styles from referenced stylesheets
      extract: false,
      // Deliver critical CSS for multiple screen resolutions
      // Here, we inspired by GitHub Primer width breakpoints: 
      // - https://primer.style/css/support/breakpoints#breakpoint-and-up-
      dimensions: [
        // We are being more agressive in height than just the "above the fold"
        {
          width: 544,
          height: 999,
        },
        {
          width: 768,
          height: 999,
        },
        {
          width: 1012,
          height: 1999,
        },      
        {
          width: 1280,
          height: 1999,
        },
      ],
    }))
    .pipe(rename({
      extname: '.scss',
      prefix: '_'
    }))
    .pipe(gulp.dest('_sass/critical'));

// debug with:
  //  env DEBUG="penthouse,penthouse:*" DEBUG="puppeteer:*" node_modules/.bin/gulp generate_critical_css

// or for even more detailed logs:
//    env DEBUG="penthouse,penthouse:*,puppeteer:*" node_modules/.bin/gulp generate_critical_css

exports.generate_critical_css = gulp.parallel(generateCriticalCss);