import gulp from 'gulp';
import util from 'gulp-util';
import connect from 'gulp-connect';
import minhtml from 'gulp-minify-html';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import symlink from 'gulp-symlink';
import clean from 'gulp-clean';
import manifest from './gulp/manifest';
import config from './gulp/config';

gulp.task('html', () => {
  let stream = gulp.src(config.paths.html)
    .pipe(minhtml())
    .pipe(gulp.dest(config.dst()));

  if (config.production)
    stream = manifest.replace(stream);

  return stream.pipe(connect.reload());
});

gulp.task('jspm', () => {
  return gulp.src(config.paths.jspm, {read: false})
    .pipe(connect.reload());
});

gulp.task('jspm-ln', () => {
  return gulp.src(config.paths.jspm_ln, {read: false})
    .pipe(symlink(config.paths.jspm_ln_dst, {force: true}));
});

gulp.task('js', () => {
  return gulp.src(config.paths.js)
    .pipe(gulp.dest(config.dst()))
    .pipe(connect.reload());
});

gulp.task('clean', () => {
  return gulp.src(config.dst(), {read: false})
    .pipe(clean({force: true}));
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
  let stream = gulp.src(config.paths.css)
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
  gulp.watch([config.paths.js],   ['js']);
  gulp.watch([config.paths.css],  ['css']);
  gulp.watch([config.paths.html], ['html']);
});

// use gulp.start to make sure clean runs before everything, YUCK!
gulp.task('start', ['clean'], () => {
  gulp.start(['jspm-ln', 'jspm', 'js', 'css', 'html']);
});

gulp.task('bundle', ['clean'], () => {
  gulp.start(['jspm-bundle', 'css', 'html']);
});

if (config.production) {
  gulp.task('default', ['bundle']);
} else {
  gulp.task('default', ['start', 'connect', 'watch']);
}
