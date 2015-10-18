import gulp from 'gulp';
import util from 'gulp-util';
import connect from 'gulp-connect';
import minhtml from 'gulp-minify-html';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import manifest from './gulp/manifest';
import config from './gulp/config';

gulp.task('html', () => {
  let stream = gulp.src(config.src.html)
    .pipe(minhtml())
    .pipe(gulp.dest(config.dst()));

  if (config.production)
    stream = manifest.replace(stream);

  return stream.pipe(connect.reload());
});

gulp.task('js', () => {
  return gulp.src(config.src.js)
    .pipe(gulp.dest(config.dst()))
    .pipe(connect.reload());
});

gulp.task('css', () => {
  const sassOpts = {
    errLogToConsole: true,
    outputStyle: 'expanded'
  };
  const autoprefixerOpts = {
    browsers: ['last 2 version'],
    cascade: false
  };
  let stream = gulp.src(config.src.css)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOpts).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOpts))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dst()));

  if (config.production)
    stream = manifest.write(stream);

  return stream.pipe(connect.reload());
});

gulp.task('connect', () => {
  connect.server({
    root: config.dst(),
    livereload: true
  });
});

gulp.task('watch', function(){
  gulp.watch([config.src.js],   ['js']);
  gulp.watch([config.src.css],  ['css']);
  gulp.watch([config.src.html], ['html']);
});

gulp.task('start', ['js', 'css', 'html']);

if (config.production) {
  gulp.task('default', ['start']);
} else {
  gulp.task('default', ['start', 'connect','watch']);
}
