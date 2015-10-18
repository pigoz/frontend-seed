import gulp from 'gulp';
import rev from 'gulp-rev';
import revReplace from 'gulp-rev-replace';
import config from './config';

function write(stream) {
  return stream
    .pipe(rev())
    .pipe(gulp.dest(config.dst()))
    .pipe(rev.manifest({merge: true}))
    .pipe(gulp.dest(config.dst()));
};

function replace(stream) {
  let manifest = gulp.src(config.dst('rev-manifest.json'));
  return stream
    .pipe(revReplace({manifest}))
    .pipe(gulp.dest(config.dst()));
};

export default { write, replace };
