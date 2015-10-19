import gulp from 'gulp';
import rev from 'gulp-rev';
import chain from 'gulp-chain';
import revReplace from 'gulp-rev-replace';
import config from './config';

const manifest = config.dst('rev-manifest.json');

const write = chain(function(stream) {
  if (!config.production)
    return stream;
  // The 'right' solution mentioned in the issue does not work
  // https://github.com/sindresorhus/gulp-rev/pull/77#issuecomment-68076646
  return stream
    .pipe(rev())
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifest(manifest, {merge: true}))
    .pipe(gulp.dest(''));
});

const replace = chain(function(stream) {
  if (!config.production)
    return stream;
  return stream
    .pipe(revReplace({manifest: gulp.src(manifest)}))
    .pipe(gulp.dest(config.dst()));
});

export default { write, replace };
