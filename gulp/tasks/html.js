import gulp from 'gulp';
import minhtml from 'gulp-minify-html';
import connect from 'gulp-connect';
import handlebars from 'gulp-hb';
import manifest from '../manifest';
import config from '../config';
import helpers from '../html-helpers';

gulp.task('html', () => {
  let stream = gulp.src(config.paths.html)
    .pipe(minhtml())
    .pipe(handlebars({helpers}))
    .pipe(gulp.dest(config.dst()));

  if (config.production)
    stream = manifest.replace(stream);

  return stream.pipe(connect.reload());
});
