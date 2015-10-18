import gulp from 'gulp';
import connect from 'gulp-connect';
import symlink from 'gulp-symlink';
import config from '../config';

gulp.task('js', () => {
  return gulp.src(config.paths.js)
    .pipe(gulp.dest(config.dst()))
    .pipe(connect.reload());
});

gulp.task('jspm', () => {
  return gulp.src(config.paths.jspm, {read: false})
    .pipe(connect.reload());
});

gulp.task('jspm-ln', () => {
  return gulp.src(config.paths.jspm_ln, {read: false})
    .pipe(symlink(config.paths.jspm_ln_dst, {force: true}));
});
