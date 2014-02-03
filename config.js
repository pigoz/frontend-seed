function shim(file, exp) {
  return {
    path: './bower_components/' + file,
    exports: exp
  };
}

exports.config = {
  browserify: {
    shim: {
      angular: shim('angular/angular.js', 'angular')
    }
  },
  server: {
    port: 8080
  },
  src: {
    coffee: ['./src/js/app.coffee'],
    html:   ['./src/html/*.html']
  },
  dest: {
    root:   './build',
    coffee: './build/js',
    html:   './build'
  },
  watch: {
    coffee: './src/js/**/*.coffee',
    html:   './src/html/**/*.html'
  }
};
