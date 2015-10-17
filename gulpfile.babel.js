import gulp from 'gulp';
import connect from 'gulp-connect';
import minhtml from 'gulp-minify-html';

const src = {
  html: './src/**/*.html',
  css:  './src/**/*.scss',
  js:   './src/**/*.js',
};

const dst = {
  root: './build'
};

const config = { src, dst };

gulp.task('html', () => {
  return gulp.src(config.src.html)
    .pipe(minhtml())
    .pipe(gulp.dest(config.dst.root))
    .pipe(connect.reload());
});

gulp.task('js', () => {
  return gulp.src(config.src.js)
    .pipe(gulp.dest(config.dst.root))
    .pipe(connect.reload());
});

gulp.task('connect', () => {
  connect.server({
    root: config.dst.root,
    livereload: true
  });
});

gulp.task('watch', function(){
  gulp.watch([config.src.html], ['html']);
  gulp.watch([config.src.js],   ['js']);
});

gulp.task('start', ['html', 'js']);
gulp.task('default', ['start', 'connect','watch']);
