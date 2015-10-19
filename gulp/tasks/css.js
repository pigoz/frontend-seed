import gulp from 'gulp';
import connect from 'gulp-connect';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import manifest from '../manifest';
import config from '../config';

gulp.task('css', () => {
  const sassOpts = {
    errLogToConsole: true,
    outputStyle: 'expanded'
  };
  const autoprefixerOpts = {
    browsers: ['last 2 version'],
    cascade: false
  };
  return gulp.src(config.paths.css)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOpts).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOpts))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dst()))
    .pipe(manifest.write())
    .pipe(connect.reload());
});

