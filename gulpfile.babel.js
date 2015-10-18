import gulp from 'gulp';
import connect from 'gulp-connect';
import clean from 'gulp-clean';
import requireDir from 'require-dir';
import config from './gulp/config';

gulp.task('clean', () => {
  return gulp.src(config.dst(), {read: false})
    .pipe(clean({force: true}));
});

gulp.task('server', () => {
  connect.server({
    root: config.dst(),
    livereload: true
  });
});

gulp.task('watch', () => {
  gulp.watch([config.paths.js],   ['js']);
  gulp.watch([config.paths.css],  ['css']);
  gulp.watch([config.paths.html], ['html']);
});

// require all tasks in the 'gulp' folder
requireDir('./gulp/tasks', { recurse: false });

// use gulp.start to make sure clean runs before everything, YUCK!
gulp.task('build', ['clean'], () => {
  gulp.start(['jspm-ln', 'jspm', 'js', 'css', 'html']);
});

gulp.task('bundle', ['clean'], () => {
  gulp.start('js', ['jspm-bundle', 'css'], 'html');
});

if (config.production) {
  gulp.task('default', ['bundle']);
} else {
  gulp.task('default', ['build', 'server', 'watch']);
}
