const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = env => [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
        __ENV__: env.NODE_ENV.toString()
    }),
    new CleanWebpackPlugin(['dist/assets'], {
        root: path.join(__dirname, '../../../')
    })
];
