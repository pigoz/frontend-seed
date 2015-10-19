import gulp from 'gulp';
import shell from 'gulp-shell';
import connect from 'gulp-connect';
import symlink from 'gulp-symlink';
import manifest from '../manifest';
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

gulp.task('jspm-bundle', shell.task(
  `jspm bundle-sfx --minify src/js/app.js ${config.dst('js/app.js')}`
));

gulp.task('js-bundle', ['jspm-bundle'], () => {
  let base = process.cwd() + '/dist';
  return gulp.src(config.dst('js/app.js'), { base })
    .pipe(manifest.write())
    .pipe(connect.reload());
});
