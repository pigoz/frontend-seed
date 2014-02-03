var gulp       = require('gulp');
var coffeeify  = require('coffeeify');
var browserify = require('gulp-browserify');
var minhtml    = require('gulp-minify-html');
var rename     = require("gulp-rename");
var bower      = require("bower");

var http       = require('http');
var ecstatic   = require('ecstatic');

var config     = require('./config.js').config;

gulp.task('coffee', function() {
  gulp.src(config.src.coffee, { read: false })
    .pipe(browserify({
      transform:  ['coffeeify'],
      extensions: ['.coffee'],
      shim: config.browserify.shim
    }))
    .pipe(rename(function (dir, base, ext){
      return base + '.js';
    }))
    .pipe(gulp.dest(config.dest.coffee))
});

gulp.task('html', function() {
  gulp.src(config.src.html)
    .pipe(minhtml())
    .pipe(gulp.dest(config.dest.html))
});

gulp.task('watch', function() {
  gulp.watch(config.watch.coffee, ['coffee']);
  gulp.watch(config.watch.html,   ['html']);
});

gulp.task('server', function() {
  http.createServer(
    ecstatic({ root: config.dest.root })
  ).listen(config.server.port);

  console.log('ecstatic listening on :' + config.server.port);
});

gulp.task('build',   ['coffee', 'html'])
gulp.task('default', ['build', 'watch', 'server']);
