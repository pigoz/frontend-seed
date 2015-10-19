import gulp from 'gulp';
import connect from 'gulp-connect';
import iconfont from 'gulp-iconfont';
import consolidate from 'gulp-consolidate';
import runSequence from 'run-sequence'; // remove with gulp4
import config from '../config';
import manifest from '../manifest';

const base = process.cwd() + '/dist';

gulp.task('gen-icons', () => {
  let timestamp = Math.round(Date.now()/1000);
  let fontName  = 'my-icon';

  return gulp.src(config.paths.icons)
    .pipe(iconfont({ fontName }))
    .on('glyphs', function(glyphs, options) {
      gulp.src('src/icons/icon.css')
        .pipe(consolidate('lodash', {
          fontName,
          glyphs,
          fontPath: '/fonts/',
          className: 'icon'
        }))
        .pipe(gulp.dest(config.dst('css')));
    })
    .pipe(gulp.dest(config.dst('fonts')))
});

gulp.task('gen-fonts-rev', () => {
  return gulp.src(config.dst('fonts/*'), { base })
    .pipe(manifest.write())
});

gulp.task('gen-icons-css-rev', () => {
  return gulp.src(config.dst('css/icon.css'), { base })
    .pipe(manifest.replace())
    .pipe(manifest.write())
    .pipe(connect.reload());
});

if (config.production) {
  gulp.task('icons', () => {
    runSequence('gen-icons', 'gen-fonts-rev', 'gen-icons-css-rev');
  });
} else {
  gulp.task('icons', 'gen-icons');
}
