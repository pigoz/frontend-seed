import path from 'path';
import util from 'gulp-util';

const src = {
  html: './src/**/*.html',
  css:  './src/**/*.scss',
  js:   './src/**/*.js',
};

function dst(file) {
  let base = !!util.env.production ? './dist' : './build';
  if (file)
    return path.join(base, file);
  return base;
};

export default { src, dst, production: !!util.env.production };
