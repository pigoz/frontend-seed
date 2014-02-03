exports.config = {
  server: {
    port: 8080
  },
  src: {
    coffee: ['./src/js/app.coffee'],
    html:   ['./src/html/*.html']
  },
  dest: {
    coffee: './build/js',
    html:   './build'
  },
  watch: {
    coffee: './src/js/**/*.coffee',
    html:   './src/html/**/*.html'
  }
};
