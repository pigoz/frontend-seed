exports = module.exports =
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
