import { Configuration, ProvidePlugin, WebpackPluginInstance } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

const extraPlugins = [
  new ProvidePlugin({process: require.resolve('process/browser') }),
  new ProvidePlugin({Buffer: ['buffer', 'Buffer'] })
];
const plugs = plugins as WebpackPluginInstance[];
plugs.push(...extraPlugins);

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins: plugs,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    fallback: {
      https: require.resolve('https-browserify'),
      util: require.resolve('util/'),
      assert: require.resolve('assert/'),
      path: require.resolve('path-browserify'),
      url: require.resolve('url/'),
      http: require.resolve('stream-http'),
      fs: false
    },
  },
};
