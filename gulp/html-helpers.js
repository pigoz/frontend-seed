import path from 'path';
import config from './config';
import H from 'handlebars';

function stylesheet_link_tag(asset, options) {
  let media = H.escapeExpression(options.hash['media']) || 'all';
  let r = `<link href="${asset}" media="${media}" rel="stylesheet">`;
  return new H.SafeString(r);
};

function javascript_include_tag(asset) {
  if (config.production) {
    let r = `<script src="${asset}"></script>`;
    return new H.SafeString(r);
  } else {
    let r = `
      <script src="/jspm/jspm_packages/system.js"></script>
      <script src="/jspm/config.js"></script>
      <script>
        System.import('${asset}');
      </script>`;
    return new H.SafeString(r);
  }
};

export default { stylesheet_link_tag, javascript_include_tag };
