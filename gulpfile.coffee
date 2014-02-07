gulp       = require 'gulp'
coffeeify  = require 'coffeeify'
browserify = require 'gulp-browserify'
minhtml    = require 'gulp-minify-html'
rename     = require 'gulp-rename'
sass       = require 'gulp-ruby-sass'

gulpif     = require 'gulp-if'
uglify     = require 'gulp-uglify'
mincss     = require 'gulp-minify-css'

http       = require 'http'
ecstatic   = require 'ecstatic'

config     = require './config.coffee'
paths      = require './bower-paths.coffee'

isProd = ->
  process.env.BUILD_ENV == "production"

gulp.task 'bower', ->
  paths.load()

gulp.task 'sass', ['bower'], ->
  gulp
    .src(config.src.sass)
    .pipe(sass(sourcemap: true, bundleExec: true))
    .pipe(gulpif(isProd(), mincss()))
    .pipe(gulp.dest(config.dest.sass))

gulp.task 'coffee', ['bower'], ->
  browserifyConfig =
    transform:  ['coffeeify'],
    extensions: ['.coffee'],
    shim:       paths.browserify.shim

  gulp
    .src(config.src.coffee, read: false)
    .pipe(browserify(browserifyConfig))
    .pipe(rename((dir, base, ext) ->
      base + '.js'
    ))
    .pipe(gulpif(isProd(), uglify()))
    .pipe(gulp.dest(config.dest.coffee))

gulp.task 'html', ->
  gulp
    .src(config.src.html)
    .pipe(gulpif(isProd(), minhtml()))
    .pipe(gulp.dest(config.dest.html))

gulp.task 'watch', ->
  gulp.watch config.watch.sass,   ['sass']
  gulp.watch config.watch.coffee, ['coffee']
  gulp.watch config.watch.html,   ['html']

gulp.task 'server', ->
  http.createServer(
    ecstatic(root: config.dest.root)
  ).listen(config.server.port)

  console.log "ecstatic listening on : #{config.server.port}"

gulp.task 'build',   ['sass', 'coffee', 'html']
gulp.task 'default', ['build', 'watch', 'server']
