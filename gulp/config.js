import path from 'path';
import util from 'gulp-util';

function dst(file) {
  let base = './dist';
  if (file)
    return path.join(base, file);
  return base;
};

const paths = {
  icons: './src/**/*.svg',
  html:  './src/**/*.html',
  css:   './src/**/*.scss',
  js:    './src/**/*.js',
  jspm:  './jspm/**/.js',
  jspm_ln: ['./jspm/config.js', './jspm/jspm_packages'],
  jspm_ln_dst: [dst('jspm/config.js'), dst('jspm/jspm_packages')],
};

export default { paths, dst, production: !!util.env.production };
