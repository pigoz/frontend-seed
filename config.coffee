shim = (file, exp) ->
  path: './bower_components/' + file
  exports: exp

exports = module.exports =
  browserify:
    shim:
      angular: shim('angular/angular.js', 'angular')
  server:
    port: 8080
  src:
    coffee: ['./src/js/app.coffee']
    html:   ['./src/html/*.html']
    sass:   ['./src/css/app.sass']
  dest:
    root:   './build'
    coffee: './build/js'
    html:   './build'
    sass:   './build/css'
  watch:
    sass:   './src/css/**/*.sass'
    coffee: './src/js/**/*.coffee'
    html:   './src/html/**/*.html'
