'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import swPrecache from 'sw-precache';
const $ = gulpLoadPlugins();

// Delete the _site directory.
gulp.task('cleanup-build', () => {
  return gulp.src('_site', {read: false})
      .pipe($.clean());
});

// Minify the HTML.
gulp.task('minify-html', () => {
  return gulp.src('_site/**/*.html')
    .pipe($.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true
    }))
    .pipe($.size({title: 'minify-html', showFiles: true}))
    .pipe(gulp.dest('_site'));
});

// Optimize images.
gulp.task('minify-images', () => {
  gulp.src('images/**/*')
    .pipe($.cached('minify-images'))
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe($.size({title: 'minify-images', showFiles: true}))
    .pipe(gulp.dest('_site/images'));
});

// Concatenate, transpiles ES2015 code to ES5 and minify JavaScript.
gulp.task('scripts', () => {
  gulp.src([
    // Note: You need to explicitly list your scripts here in the right order
    //       to be correctly concatenated
    './_scripts/main.js'
  ])
    .pipe($.plumber())
    .pipe($.plumberNotifier())
    .pipe($.concat('main.min.js'))
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write())
    .pipe($.uglify())
    .pipe($.size({title: 'scripts', showFiles: true}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('_site/scripts'));
});

// Minify and add prefix to css.
gulp.task('css', () => {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  return gulp.src('css/main.css')
    .pipe($.sourcemaps.init())
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.cssnano())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('_site/css'));
});

// Compile scss to css.
gulp.task('scss', () => {
    return gulp.src('scss/main.scss')
        .pipe($.plumber())
        .pipe($.plumberNotifier())
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe($.size({title: 'scss->css', showFiles: true}))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('_site/css'));
});

// Pug (Jade) to HTML.
// gulp.task('pug', () => {
//   return gulp.src([
//     '_includes-pug/**/*.pug'
//   ])
//   .pipe($.plumber())
//   .pipe($.plumberNotifier())
//   .pipe($.cached('pug'))
//   .pipe($.pug({pretty:true, doctype:'HTML'}))
//   .pipe($.size({title: 'html', showFiles: true}))
//   .pipe(gulp.dest('_includes'));
//   });


// Watch change in files.
gulp.task('serve', ['jekyll-build'], () => {
  browserSync.init({
    notify: false,
    logPrefix: 'Freelance-portfolio',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: '_site',
    port: 3000
  });

  // Warch html changes.
  gulp.watch([
    'css/**/*.css',
    'scripts/**/*.js',
    '_includes/**/*.html',
    '_layouts/**/*.html',
    'work/**/*.html',
    '_posts/**/*.md',
    'index.html'
  ], ['jekyll-build', browserSync.reload]);

  // Watch Pug (Jade) changes.
  // gulp.watch('_includes-pug/**/*.pug', ['pug']);

  // Watch scss changes.
  gulp.watch('scss/**/*.scss', ['scss', browserSync.reload]);
  gulp.watch('scss/**/*.sass', ['scss', browserSync.reload]);

  // Watch JavaScript changes.
  gulp.watch('_scripts/**/*.js', ['scripts', browserSync.reload]);

});

// =============================================================
// Serving _site without initiating Jekyll build at the beginning
gulp.task('serving', () => {
  browserSync.init({
    notify: false,
    logPrefix: 'Freelance-portfolio',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: '_site',
    port: 3000
  });

  // Warch html changes.
  gulp.watch([
    'css/**/*.css',
    'scripts/**/*.js',
    '_includes/**/*.html',
    '_layouts/**/*.html',
    'work/**/*.html',
    '_posts/**/*.md',
    'index.html'
  ], ['jekyll-build', browserSync.reload]);

  // Watch Pug (Jade) changes.
  // gulp.watch('_includes-pug/**/*.pug', ['pug']);

  // Watch scss changes.
  gulp.watch('scss/**/*.scss', ['scss', browserSync.reload]);
  gulp.watch('scss/**/*.sass', ['scss', browserSync.reload]);

  // Watch JavaScript changes.
  gulp.watch('_scripts/**/*.js', ['scripts', browserSync.reload]);

});

gulp.task('generate-service-worker', (callback) => {
  var path = require('path');
  var rootDir = '_site';

  swPrecache.write(path.join(rootDir, 'sw.js'), {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,json}'],
    stripPrefix: rootDir,
    replacePrefix: '/Freelance-portfolio'
  }, callback);
});

  gulp.task('fix-config', () => {
    gulp.src('_config.yml')
      .pipe($.replace('baseurl: ""', 'baseurl: "Freelance-portfolio"'))
      .pipe($.clean())
      .pipe(gulp.dest('.'));
  });

  gulp.task('revert-config', () => {
    gulp.src('_config.yml')
        .pipe($.replace('baseurl: "Freelance-portfolio"', 'baseurl: ""'))
        .pipe($.clean())
        .pipe(gulp.dest('.'));
  });
// deprecated because main.scss now use frontmatter to convert to css
// gulp.task('jekyll-build', ['scripts', 'scss'], $.shell.task(['bundle exec jekyll build']));

gulp.task('jekyll-build', ['scripts','scss'], $.shell.task(['bundle exec jekyll build -I']));

gulp.task('jekyll-deploy', $.shell.task(['bundle exec jekyll build']));

// Default task.
gulp.task('build', () =>
  runSequence(
    'fix-config',
    'cleanup-build',
    // 'pug',
    'scss',
    'scripts',
    'jekyll-deploy',
    'minify-html',
    'css',
    'generate-service-worker',
    'minify-images',
    'revert-config'
  )
);

// Depoly website to gh-pages.
gulp.task('gh-pages', () => {
  return gulp.src('./_site/**/*')
    .pipe($.ghPages());
});

gulp.task('deploy', () => {
  runSequence(
    'fix-config',
    'cleanup-build',
    'pug',
    'scss',
    'scripts',
    'jekyll-deploy',
    'minify-html',
    'css',
    'generate-service-worker',
    'minify-images',
    'gh-pages',
    'revert-config'
  );
});

gulp.task( 'default', [ 'serve' ] );