const path = require('path');
const webpack = require('webpack');

const loaders = require('./loaders/client.js');
const plugins = require('./plugins/client.js');

module.exports = env => ({
    target: 'web',
    entry: {
        app: path.resolve(__dirname, '../../src/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../../dist/assets'),
        chunkFilename: '[name].js'
    },
    module: {
        rules: loaders(env)
    },
    plugins: plugins(env),
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        minimizer: [
            env.NODE_ENV === 'production' &&
                new UglifyWebpackPlugin({
                    uglifyOptions: {
                        compress: {
                            collapse_vars: false
                        }
                    }
                })
        ].filter(plugin => plugin !== false)
    }
});
