import gulp from 'gulp';
import connect from 'gulp-connect';
import iconfont from 'gulp-iconfont';
import consolidate from 'gulp-consolidate';
import config from '../config';
import manifest from '../manifest';

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
    .pipe(gulp.dest(config.dst('fonts')));
});

if (config.production) {
  gulp.task('icons', ['gen-icons'], () => {
    let base = process.cwd() + '/dist';
    return gulp.src(config.dst('css/icon.css'), { base })
      .pipe(manifest.write())
      .pipe(connect.reload());
  });
} else {
  gulp.task('icons', ['gen-icons']);
}
